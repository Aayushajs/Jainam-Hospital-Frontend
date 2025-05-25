import React, { useState, useEffect, useRef } from "react";
import { FaTimes, FaPhone, FaVideo, FaMicrophone, FaMicrophoneSlash, FaVideoSlash, FaUserMd, FaUser, FaInfoCircle } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { MdScreenShare, MdStopScreenShare } from "react-icons/md";
import axios from "axios";
import { io } from "socket.io-client";
import Lottie from "lottie-react";
import callAnimation from "../../public/Animaition/clibretionn-animation.json";
import invalidRoomAnimation from "../../public/Animaition/login-animation.json";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VideoCallPopup = ({ onClose, userType, userData }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [callStatus, setCallStatus] = useState('idle');
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callDetails, setCallDetails] = useState(null);
  const [callDuration, setCallDuration] = useState(0);
  const [error, setError] = useState(null);
  const [roomId, setRoomId] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const socketRef = useRef(null);
  const callTimerRef = useRef(null);
  const screenStreamRef = useRef(null);
  
  const API_BASE_URL = "https://jainam-hospital-backend.onrender.com";
  const WS_BASE_URL = "https://jainam-hospital-backend.onrender.com";

  useEffect(() => {
    return () => {
      cleanupCall();
    };
  }, []);

  const joinCall = async () => {
    if (!roomId.trim()) {
      toast.error("Please enter a Room ID");
      return;
    }

    try {
      setCallStatus('connecting');
      
      // First fetch call details
      const detailsResponse = await axios.get(`${API_BASE_URL}/api/v1/videocall/${roomId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!detailsResponse.data.success) {
        throw new Error(detailsResponse.data.message || 'Invalid Room ID');
      }
      
      setCallDetails(detailsResponse.data.call);
      
      // Then join the call
      const joinResponse = await axios.post(
        `${API_BASE_URL}/api/v1/videocall/join`,
        {
          roomId,
          userId: userType === 'patient' ? userData._id : null
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      if (!joinResponse.data.success) {
        throw new Error(joinResponse.data.message || 'Failed to join call');
      }
      
      setupSocketConnection(roomId);
      await setupMediaAndWebRTC(roomId);
      
      setCallStatus('ringing');
      
    } catch (err) {
      console.error("Error joining call:", err);
      setError(err.response?.data?.message || err.message || 'Failed to join call');
      setCallStatus('invalid-room');
      cleanupCall();
    }
  };

  const cleanupCall = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
    
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach(track => track.stop());
      screenStreamRef.current = null;
    }
    
    if (callTimerRef.current) {
      clearInterval(callTimerRef.current);
      callTimerRef.current = null;
    }
  };

  const setupSocketConnection = (roomId) => {
    socketRef.current = io(WS_BASE_URL, {
      path: "/socket.io",
      transports: ["websocket"],
      query: { roomId },
      reconnectionAttempts: 5,
      reconnectionDelay: 3000,
      timeout: 20000,
    });

    socketRef.current.on("connect", () => {
      console.log("Socket connected for video call");
      setIsConnected(true);
      setError(null);
      socketRef.current.emit("join_video_call", { 
        roomId, 
        userId: userData._id, 
        userType 
      });
    });

    socketRef.current.on("user_joined", ({ userId, userType }) => {
      console.log(`${userType} ${userId} joined the call`);
      if (callStatus === 'ringing') {
        setCallStatus('ongoing');
        startCallTimer();
      }
    });

    socketRef.current.on("offer", async (data) => {
      if (!peerConnectionRef.current) return;
      
      try {
        await peerConnectionRef.current.setRemoteDescription(
          new RTCSessionDescription(data.offer)
        );
        
        const answer = await peerConnectionRef.current.createAnswer();
        await peerConnectionRef.current.setLocalDescription(answer);
        
        socketRef.current.emit("answer", {
          roomId: data.roomId,
          answer: answer
        });
      } catch (err) {
        console.error("Error handling offer:", err);
      }
    });

    socketRef.current.on("answer", (data) => {
      if (!peerConnectionRef.current) return;
      peerConnectionRef.current.setRemoteDescription(
        new RTCSessionDescription(data.answer)
      );
    });

    socketRef.current.on("ice-candidate", (data) => {
      if (!peerConnectionRef.current) return;
      peerConnectionRef.current.addIceCandidate(
        new RTCIceCandidate(data.candidate)
      );
    });

    socketRef.current.on("call_ended", ({ roomId, endedAt, duration }) => {
      console.log(`Call ended in room ${roomId}`);
      setCallStatus('ended');
      cleanupCall();
    });

    socketRef.current.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      setIsConnected(false);
      if (callStatus !== 'ended') {
        setError("Connection lost. Trying to reconnect...");
      }
    });

    socketRef.current.on("connect_error", (err) => {
      console.error("Connection error:", err);
      setError("Connection error. Trying to reconnect...");
      setIsConnected(false);
    });
  };

  const setupMediaAndWebRTC = async (roomId) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      
      const configuration = {
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" }
        ]
      };
      
      const peerConnection = new RTCPeerConnection(configuration);
      peerConnectionRef.current = peerConnection;
      
      stream.getTracks().forEach(track => {
        peerConnection.addTrack(track, stream);
      });
      
      peerConnection.ontrack = (event) => {
        const remoteStream = new MediaStream();
        event.streams[0].getTracks().forEach(track => {
          remoteStream.addTrack(track);
        });
        
        setRemoteStream(remoteStream);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
      };
      
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socketRef.current.emit("ice-candidate", {
            roomId,
            candidate: event.candidate
          });
        }
      };
      
      if (userType === 'doctor') {
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        
        socketRef.current.emit("offer", {
          roomId,
          offer: offer
        });
      }
      
    } catch (err) {
      console.error("Error setting up media:", err);
      throw err;
    }
  };

  const startCallTimer = () => {
    const startTime = new Date();
    callTimerRef.current = setInterval(() => {
      const now = new Date();
      setCallDuration(Math.floor((now - startTime) / 1000));
    }, 1000);
  };

  const toggleMute = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        });
        
        screenStreamRef.current = screenStream;
        
        const sender = peerConnectionRef.current.getSenders().find(
          s => s.track && s.track.kind === 'video'
        );
        
        if (sender) {
          sender.replaceTrack(screenStream.getVideoTracks()[0]);
        }
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = screenStream;
        }
        
        setIsScreenSharing(true);
        
        screenStream.getVideoTracks()[0].onended = () => {
          toggleScreenShare();
        };
      } else {
        const cameraStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });
        
        const sender = peerConnectionRef.current.getSenders().find(
          s => s.track && s.track.kind === 'video'
        );
        
        if (sender) {
          sender.replaceTrack(cameraStream.getVideoTracks()[0]);
        }
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStream;
        }
        
        screenStreamRef.current.getTracks().forEach(track => track.stop());
        screenStreamRef.current = null;
        
        setIsScreenSharing(false);
      }
    } catch (err) {
      console.error("Error toggling screen share:", err);
    }
  };

  const endCallHandler = async () => {
    try {
      setCallStatus('ended');
      
      await axios.post(`${API_BASE_URL}/api/v1/videocall/end`, {
        roomId: callDetails?.roomId
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      cleanupCall();
      onClose();
    } catch (err) {
      console.error("Error ending call:", err);
      setError("Failed to properly end call");
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const renderCallDetails = () => {
    if (!callDetails) return <p className="no-details">Enter a valid Room ID to see call details</p>;
    
    return (
      <div className="call-details-container">
        <h4>Call Information</h4>
        <div className="detail-item">
          <span className="detail-label">Room ID:</span>
          <span className="detail-value">{callDetails.roomId}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Scheduled Time:</span>
          <span className="detail-value">
            {new Date(callDetails.scheduledAt).toLocaleString()}
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Duration:</span>
          <span className="detail-value">{callDetails.duration} minutes</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Status:</span>
          <span className="detail-value">{callDetails.status}</span>
        </div>
        
        <h4 className="participants-heading">Participants</h4>
        <div className="participant-card">
          <div className="participant-avatar">
            {callDetails.doctor.profilePicture?.url ? (
              <img src={callDetails.doctor.profilePicture.url} alt="Doctor" />
            ) : (
              <FaUserMd size={24} />
            )}
          </div>
          <div className="participant-info">
            <span className="participant-name">
              Dr. {callDetails.doctor.firstname} {callDetails.doctor.lastName}
            </span>
            <span className="participant-specialization">
              {callDetails.doctor.specialization}
            </span>
          </div>
        </div>
        
        {callDetails.patient && (
          <div className="participant-card">
            <div className="participant-avatar">
              <FaUser size={24} />
            </div>
            <div className="participant-info">
              <span className="participant-name">
                {callDetails.patient.firstname} {callDetails.patient.lastName}
              </span>
              <span className="participant-phone">
                {callDetails.patient.contact.phone}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="video-call-popup">
      <div className="video-call-header">
        <div className="call-info">
          <h3>
            {callStatus === 'idle' ? 'Enter Room ID' :
             callStatus === 'connecting' ? 'Connecting...' :
             callStatus === 'ringing' ? 'Calling...' : 
             callStatus === 'ongoing' ? 'Video Consultation' : 
             callStatus === 'ended' ? 'Call Ended' : 
             callStatus === 'invalid-room' ? 'Invalid Room' : 'Connecting...'}
          </h3>
          {callStatus === 'ongoing' && (
            <div className="call-duration">{formatDuration(callDuration)}</div>
          )}
        </div>
        
        {callStatus !== 'idle' && callStatus !== 'invalid-room' && (
          <div className="connection-status">
            <span className={`status-indicator ${isConnected ? "connected" : "disconnected"}`}></span>
            {isConnected ? "Connected" : "Connecting..."}
          </div>
        )}
        
        <button onClick={onClose} className="close-btn">
          <FaTimes />
        </button>
      </div>

      {error && (
        <div className="error-message">
          <span>{error}</span>
        </div>
      )}

      {callStatus === 'idle' ? (
        <div className="room-id-input-container">
          <div className="input-wrapper">
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter Room ID"
              className="room-id-input"
            />
            <button onClick={joinCall} className="join-btn">
              Join Call
            </button>
          </div>
          <p className="instruction">
            Ask your doctor for the Room ID to join the consultation
          </p>
          
          {renderCallDetails()}
        </div>
      ) : callStatus === 'invalid-room' ? (
        <div className="invalid-room-container">
          <Lottie
            animationData={invalidRoomAnimation}
            loop={true}
            style={{ width: 300, height: 300 }}
          />
          <p className="invalid-room-message">Invalid Room ID. Please check and try again.</p>
          <button onClick={() => setCallStatus('idle')} className="try-again-btn">
            Try Again
          </button>
        </div>
      ) : (
        <>
          <div className="video-container">
            <div className="remote-video-container">
              {remoteStream ? (
                <video 
                  ref={remoteVideoRef} 
                  autoPlay 
                  playsInline 
                  className="remote-video"
                />
              ) : (
                <div className="remote-video-placeholder">
                  <div className="placeholder-content">
                    {callStatus === 'ringing' ? (
                      <>
                        <Lottie
                          animationData={callAnimation}
                          loop={true}
                          style={{ width: 150, height: 150 }}
                        />
                        <p>Waiting for participant to join...</p>
                      </>
                    ) : (
                      <>
                        <div className="user-avatar">
                          {userType === 'doctor' ? <FaUser size={60} /> : <FaUserMd size={60} />}
                        </div>
                        <p>{userType === 'doctor' ? 'Patient' : 'Doctor'} video will appear here</p>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="local-video-container">
              {localStream ? (
                <video 
                  ref={localVideoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className={`local-video ${isVideoOff ? 'video-off' : ''}`}
                />
              ) : (
                <div className="local-video-placeholder">
                  <div className="placeholder-content">
                    <div className="user-avatar">
                      {userType === 'doctor' ? <FaUserMd size={40} /> : <FaUser size={40} />}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {showDetails && callDetails && (
              <div className="call-details-overlay">
                {renderCallDetails()}
              </div>
            )}
          </div>

          <div className="call-controls">
            <button 
              onClick={toggleMute} 
              className={`control-btn ${isMuted ? 'active' : ''}`}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
            </button>
            
            <button 
              onClick={toggleVideo} 
              className={`control-btn ${isVideoOff ? 'active' : ''}`}
              aria-label={isVideoOff ? "Turn on video" : "Turn off video"}
            >
              {isVideoOff ? <FaVideoSlash /> : <FaVideo />}
            </button>
            
            <button 
              onClick={toggleScreenShare} 
              className={`control-btn ${isScreenSharing ? 'active' : ''}`}
              aria-label={isScreenSharing ? "Stop screen share" : "Start screen share"}
            >
              {isScreenSharing ? <MdStopScreenShare /> : <MdScreenShare />}
            </button>
            
            <button 
              onClick={toggleDetails} 
              className={`control-btn ${showDetails ? 'active' : ''}`}
              aria-label={showDetails ? "Hide details" : "Show details"}
            >
              <FaInfoCircle />
            </button>
            
            <button 
              onClick={endCallHandler} 
              className="end-call-btn"
              aria-label="End call"
            >
              <IoMdCall />
            </button>
          </div>
        </>
      )}

      <style jsx>{`
        .video-call-popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90%;
          max-width: 900px;
          height: 80vh;
          background: #1a1a1a;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          z-index: 1000;
          overflow: hidden;
          font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .video-call-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          background: #2d2d2d;
          color: white;
          z-index: 10;
        }

        .call-info {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .call-info h3 {
          margin: 0;
          font-size: 1.2rem;
          font-weight: 500;
        }

        .call-duration {
          font-size: 0.9rem;
          color: #ccc;
        }

        .connection-status {
          display: flex;
          align-items: center;
          font-size: 0.8rem;
          gap: 6px;
          color: #ccc;
        }

        .status-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .status-indicator.connected {
          background: #10b981;
          box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
          }
        }

        .status-indicator.disconnected {
          background: #ef4444;
        }

        .close-btn {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          transition: transform 0.2s;
        }

        .close-btn:hover {
          transform: scale(1.1);
        }

        .error-message {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fee2e2;
          color: #b91c1c;
          padding: 8px 16px;
          font-size: 0.85rem;
          border-bottom: 1px solid #fecaca;
        }

        .video-container {
          flex: 1;
          position: relative;
          background: #000;
          overflow: hidden;
        }

        .remote-video-container {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .remote-video {
          width: 100%;
          height: 100%;
          object-fit: contain;
          background: #000;
        }

        .remote-video-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #1a1a1a;
          color: #ccc;
        }

        .placeholder-content {
          text-align: center;
          padding: 20px;
        }

        .user-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: #3b82f6;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto 15px;
          color: white;
        }

        .local-video-container {
          position: absolute;
          bottom: 20px;
          right: 20px;
          width: 25%;
          max-width: 200px;
          aspect-ratio: 16/9;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          border: 2px solid rgba(255,255,255,0.2);
          background: #333;
        }

        .local-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .local-video.video-off {
          opacity: 0.3;
        }

        .local-video-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #333;
        }

        .call-details-overlay {
          position: absolute;
          top: 20px;
          left: 20px;
          background: rgba(45, 45, 45, 0.9);
          padding: 15px;
          border-radius: 8px;
          max-width: 300px;
          color: white;
          z-index: 20;
          max-height: 80%;
          overflow-y: auto;
        }

        .call-controls {
          display: flex;
          justify-content: center;
          gap: 20px;
          padding: 20px;
          background: #2d2d2d;
          z-index: 10;
        }

        .control-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #3b3b3b;
          border: none;
          color: white;
          font-size: 1.2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .control-btn:hover {
          background: #4b4b4b;
          transform: scale(1.05);
        }

        .control-btn.active {
          background: #3b82f6;
        }

        .end-call-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #ef4444;
          border: none;
          color: white;
          font-size: 1.2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .end-call-btn:hover {
          background: #dc2626;
          transform: scale(1.05);
        }

        .room-id-input-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px;
          background: #1a1a1a;
        }

        .input-wrapper {
          display: flex;
          width: 100%;
          max-width: 500px;
          margin-bottom: 20px;
        }

        .room-id-input {
          flex: 1;
          padding: 12px 16px;
          border: 2px solid #3b82f6;
          border-radius: 8px 0 0 8px;
          font-size: 1rem;
          background: #2d2d2d;
          color: white;
          outline: none;
        }

        .join-btn {
          padding: 12px 24px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 0 8px 8px 0;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }

        .join-btn:hover {
          background: #2563eb;
        }

        .instruction {
          color: #ccc;
          font-size: 0.9rem;
          text-align: center;
          max-width: 500px;
          margin-top: 10px;
        }

        .invalid-room-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px;
          background: #1a1a1a;
          text-align: center;
        }

        .invalid-room-message {
          color: #ef4444;
          font-size: 1.1rem;
          margin-top: 20px;
          margin-bottom: 30px;
        }

        .try-again-btn {
          padding: 12px 24px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }

        .try-again-btn:hover {
          background: #2563eb;
        }

        .call-details-container {
          margin-top: 20px;
          background: #2d2d2d;
          padding: 15px;
          border-radius: 8px;
          width: 100%;
          max-width: 500px;
        }
        
        .call-details-container h4 {
          color: #fff;
          margin: 0 0 15px 0;
          font-size: 1.1rem;
        }
        
        .participants-heading {
          margin: 20px 0 10px 0;
          color: #fff;
          font-size: 1rem;
        }
        
        .detail-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        
        .detail-label {
          color: #ccc;
          font-size: 0.9rem;
        }
        
        .detail-value {
          color: #fff;
          font-size: 0.9rem;
        }
        
        .participant-card {
          display: flex;
          align-items: center;
          background: #3b3b3b;
          padding: 10px;
          border-radius: 6px;
          margin-bottom: 10px;
        }
        
        .participant-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #4b5563;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          overflow: hidden;
        }
        
        .participant-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .participant-info {
          display: flex;
          flex-direction: column;
        }
        
        .participant-name {
          color: #fff;
          font-size: 0.9rem;
          font-weight: 500;
        }
        
        .participant-specialization,
        .participant-phone {
          color: #ccc;
          font-size: 0.8rem;
        }

        .no-details {
          color: #ccc;
          font-size: 0.9rem;
          text-align: center;
          margin-top: 20px;
        }

        @media (max-width: 768px) {
          .video-call-popup {
            width: 100%;
            height: 100vh;
            border-radius: 0;
          }
          
          .local-video-container {
            width: 30%;
            max-width: 150px;
            bottom: 80px;
            right: 10px;
          }
          
          .call-controls {
            gap: 15px;
            padding: 15px;
          }
          
          .control-btn, .end-call-btn {
            width: 45px;
            height: 45px;
            font-size: 1.1rem;
          }

          .input-wrapper {
            flex-direction: column;
          }

          .room-id-input {
            border-radius: 8px;
            margin-bottom: 10px;
          }

          .join-btn {
            border-radius: 8px;
            width: 100%;
          }

          .call-details-overlay {
            max-width: 250px;
            padding: 10px;
          }
        }

        @media (max-width: 480px) {
          .video-call-header {
            padding: 12px 15px;
          }
          
          .call-info h3 {
            font-size: 1rem;
          }
          
          .local-video-container {
            width: 35%;
            bottom: 70px;
          }
          
          .call-controls {
            gap: 10px;
          }
          
          .control-btn, .end-call-btn {
            width: 40px;
            height: 40px;
            font-size: 1rem;
          }

          .call-details-overlay {
            max-width: 200px;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default VideoCallPopup;