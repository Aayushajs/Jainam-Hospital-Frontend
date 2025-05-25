import React, { useState, useEffect, useRef } from "react";
import { FaTimes, FaPaperPlane, FaTrash, FaSync } from "react-icons/fa";
import axios from "axios";
import { io } from "socket.io-client";
import Lottie from "lottie-react";
import noRecordsAnimation from "../../public/Animaition/no-records-animation.json";
import Animation from "../../public/Animaition/login-animation.json";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChatPopup = ({ appointmentId, onClose, senderName }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const API_BASE_URL = "https://jainam-hospital-backend.onrender.com";
  const WS_BASE_URL = "wss://jainam-hospital-backend.onrender.com";

  // Filter out unwanted messages
  const filterUnwantedMessages = (messages) => {
    return messages.filter(message => {
      return !(
        message.sender === "Patient Name" && 
        message.message.trim().toLowerCase() === "hii"
      );
    });
  };

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem(`chatMessages_${appointmentId}`);
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        if (Array.isArray(parsedMessages)) {
          setMessages(filterUnwantedMessages(parsedMessages));
        }
      } catch (e) {
        console.error("Error parsing saved messages:", e);
        localStorage.removeItem(`chatMessages_${appointmentId}`);
      }
    }
    fetchMessages();
    setupSocketConnection();

    return () => {
      if (socketRef.current) {
        socketRef.current.off("receive_message");
        socketRef.current.off("message_deleted");
        socketRef.current.disconnect();
      }
    };
  }, [appointmentId]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(
        `chatMessages_${appointmentId}`,
        JSON.stringify(messages)
      );
    }
    scrollToBottom();
  }, [messages, appointmentId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/chat/messages/${appointmentId}`,
        { timeout: 10000 }
      );
      
      if (response.data?.messages && Array.isArray(response.data.messages)) {
        const filteredMessages = filterUnwantedMessages(response.data.messages);
        
        setMessages(prev => {
          const messageMap = new Map();
          
          // Add existing messages
          prev.forEach(msg => messageMap.set(msg._id, msg));
          
          // Add filtered new messages
          filteredMessages.forEach(msg => messageMap.set(msg._id, msg));
          
          return Array.from(messageMap.values()).sort((a, b) => {
            const dateA = new Date(a.timestamp || a.createdAt || 0);
            const dateB = new Date(b.timestamp || b.createdAt || 0);
            return dateA - dateB;
          });
        });
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError("Failed to load messages. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const setupSocketConnection = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    try {
      socketRef.current = io(WS_BASE_URL, {
        path: "/socket.io",
        transports: ["websocket"],
        query: { roomId: appointmentId },
        reconnectionAttempts: 5,
        reconnectionDelay: 3000,
        timeout: 10000,
      });

      socketRef.current.on("connect", () => {
        console.log("Socket connected");
        setIsConnected(true);
        setError(null);
        socketRef.current.emit("join_room", appointmentId);
      });

      socketRef.current.on("receive_message", (message) => {
        if (
          message && 
          message._id && 
          message.sender && 
          message.message &&
          !(message.sender === "Patient Name" && message.message.toLowerCase() === "hii")
        ) {
          setMessages(prev => {
            const exists = prev.some(msg => msg._id === message._id);
            return exists ? prev : [...prev, message];
          });
        }
      });

      socketRef.current.on("message_deleted", ({ messageId }) => {
        if (messageId) {
          setMessages(prev => prev.filter((msg) => msg._id !== messageId));
        }
      });

      socketRef.current.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
        setIsConnected(false);
        if (reason === "io server disconnect") {
          setTimeout(setupSocketConnection, 1000);
        }
      });

      socketRef.current.on("connect_error", (err) => {
        console.error("Connection error:", err);
        setError("Connection error. Trying to reconnect...");
        setIsConnected(false);
      });
    } catch (err) {
      console.error("Error setting up socket:", err);
      setIsConnected(false);
      setError("Failed to establish connection");
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isSending) return;

    try {
      setIsSending(true);
      setError(null);

      const messageData = {
        roomId: appointmentId,
        sender: senderName,
        message: newMessage,
        timestamp: new Date().toISOString()
      };

      // Optimistically add the message
      const tempId = Date.now().toString();
      setMessages(prev => [...prev, {
        ...messageData,
        _id: tempId,
        isOptimistic: true
      }]);

      if (isConnected && socketRef.current?.connected) {
        socketRef.current.emit("send_message", {
          room: appointmentId,
          sender: senderName,
          message: newMessage,
        });
      } else {
        const response = await axios.post(
          `${API_BASE_URL}/api/v1/chat/send`,
          messageData,
          {
            headers: {
              "Content-Type": "application/json",
            },
            timeout: 10000,
          }
        );
        
        if (response.data?.success && response.data?.message) {
          setMessages(prev => prev.map(msg => 
            msg._id === tempId ? response.data.message : msg
          ));
        } else {
          setMessages(prev => prev.filter(msg => msg._id !== tempId));
          fetchMessages();
        }
      }

      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message. Please try again.");
      setMessages(prev => prev.filter(msg => !msg.isOptimistic));
      fetchMessages();
    } finally {
      setIsSending(false);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (!messageId) return;

    try {
      setMessages(prev => prev.filter((msg) => msg._id !== messageId));

      if (isConnected && socketRef.current?.connected) {
        socketRef.current.emit("delete_message", {
          roomId: appointmentId,
          messageId: messageId,
        });
      } else {
        await axios.delete(
          `${API_BASE_URL}/api/v1/chat/delete/${appointmentId}/${messageId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            timeout: 10000,
          }
        );
      }
    } catch (err) {
      console.error("Error deleting message:", err);
      setError("Failed to delete message. Please try again.");
      fetchMessages();
    }
  };

  const confirmDelete = (messageId) => {
    toast(
      <div>
        <p>Are you sure you want to delete this message?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
          <button 
            onClick={() => {
              handleDeleteMessage(messageId);
              toast.dismiss();
            }}
            style={{ padding: '5px 15px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Delete
          </button>
          <button 
            onClick={() => toast.dismiss()}
            style={{ padding: '5px 15px', background: '#e2e8f0', border: 'none', borderRadius: '4px' }}
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: 'top-center',
        autoClose: false,
        closeButton: false,
        closeOnClick: false,
        draggable: false,
        style: { minWidth: '300px' }
      }
    );
  };

  const handleRetryConnection = () => {
    setError(null);
    fetchMessages();
    setupSocketConnection();
  };

  const formatMessageTime = (timestamp) => {
    if (!timestamp) return "Just now";

    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) return "Just now";

      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return "Just now";
    }
  };

  return (
    <div className="chat-popup">
      <div className="chat-header">
        <h3>Chat with Doctor</h3>
        <div className="connection-status">
          <span
            className={`status-indicator ${
              isConnected ? "connected" : "disconnected"
            }`}
          ></span>
          {isConnected ? "Live" : "Offline"}
          {!isConnected && (
            <button onClick={handleRetryConnection} className="retry-btn">
              <FaSync size={12} />
            </button>
          )}
        </div>
        <button onClick={onClose} className="close-btn">
          <FaTimes />
        </button>
      </div>

      {error && (
        <div className="error-message">
          <span>{error}</span>
          <button onClick={handleRetryConnection} className="retry-btn">
            Retry
          </button>
        </div>
      )}

      <div className="chat-messages">
        {isLoading ? (
          <Lottie
              animationData={Animation}
              loop={true}
              style={{textAlign:"center",justifyItems:"center", alignSelf:"center", width: 200, height: 200 }}
            />
        ) : messages.length === 0 ? (
          <div className="no-messages">
            <Lottie
              animationData={noRecordsAnimation}
              loop={true}
              style={{ width: 200, height: 200 }}
            />
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`message ${
                msg.sender === senderName ? "sent" : "received"
              }`}
            >
              <div className="message-content">
                <div className="message-sender">{msg.sender}</div>
                <div className="message-text">{msg.message}</div>
                <div className="message-time">
                  {formatMessageTime(msg.timestamp || msg.createdAt)}
                </div>
              </div>
              {msg.sender === senderName && (
                <button
                  onClick={() => confirmDelete(msg._id)}
                  className="delete-btn"
                  aria-label="Delete message"
                >
                  <FaTrash size={12} />
                </button>
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          aria-label="Type your message"
          disabled={isSending}
        />
        <button
          onClick={handleSendMessage}
          className="send-btn"
          aria-label="Send message"
          disabled={!newMessage.trim() || isSending}
        >
          {isSending ? <div className="spinner"></div> : <FaPaperPlane />}
        </button>
      </div>

      <style jsx>{`
        .chat-popup {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 380px;
          max-height: 70vh;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          z-index: 1000;
          overflow: hidden;
          font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          border: 1px solid #e2e8f0;
        }

        .chat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          background: #3b82f6;
          color: white;
          border-radius: 16px 16px 0 0;
        }

        .chat-header h3 {
          margin: 0;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .connection-status {
          display: flex;
          align-items: center;
          font-size: 0.8rem;
          gap: 6px;
          background: rgba(255, 255, 255, 0.2);
          padding: 4px 10px;
          border-radius: 20px;
          font-weight: 500;
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

        .retry-btn {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 2px;
          transition: transform 0.2s;
        }

        .retry-btn:hover {
          transform: rotate(180deg);
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
          justify-content: space-between;
          background: #fee2e2;
          color: #b91c1c;
          padding: 12px 16px;
          font-size: 0.85rem;
          border-bottom: 1px solid #fecaca;
        }

        .chat-messages {
          flex: 1;
          padding: 16px;
          overflow-y: auto;
          background: #f8fafc;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .no-messages {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: 1;
          padding: 20px;
          text-align: center;
        }

        .no-messages p {
          margin-top: 16px;
          color: #64748b;
          font-size: 0.95rem;
        }

        .message {
          display: flex;
          margin-bottom: 8px;
          align-items: flex-start;
          animation: fadeIn 0.25s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .message-content {
          max-width: 80%;
          padding: 12px 16px;
          border-radius: 18px;
          position: relative;
          word-break: break-word;
          line-height: 1.4;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        }

        .message.sent .message-content {
          background: #3b82f6;
          color: white;
          border-bottom-right-radius: 4px;
        }

        .message.received .message-content {
          background: white;
          color: #1e293b;
          border: 1px solid #e2e8f0;
          border-bottom-left-radius: 4px;
        }

        .message-sender {
          font-weight: 600;
          font-size: 0.75rem;
          margin-bottom: 4px;
          color: #64748b;
        }

        .message.sent .message-sender {
          color: rgba(255,255,255,0.85);
        }

        .message-text {
          font-size: 0.95rem;
        }

        .message-time {
          font-size: 0.7rem;
          text-align: right;
          margin-top: 6px;
          opacity: 0.8;
        }

        .message.sent .message-time {
          color: rgba(255,255,255,0.7);
        }

        .delete-btn {
          background: none;
          border: none;
          color: #ef4444;
          cursor: pointer;
          margin-left: 8px;
          align-self: center;
          opacity: 0;
          transition: all 0.2s;
          padding: 6px;
          border-radius: 50%;
          display: flex;
        }

        .message:hover .delete-btn {
          opacity: 0.7;
        }

        .delete-btn:hover {
          opacity: 1 !important;
          background: rgba(239,68,68,0.1);
        }

        .chat-input {
          display: flex;
          padding: 16px;
          border-top: 1px solid #e2e8f0;
          background: white;
          align-items: center;
        }

        .chat-input input {
          flex: 1;
          padding: 12px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          outline: none;
          font-size: 0.95rem;
          transition: all 0.2s;
          background: #f8fafc;
        }

        .chat-input input:focus {
          border-color: #3b82f6;
          background: white;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .send-btn {
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 12px;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .send-btn:disabled {
          background: #cbd5e1;
          cursor: not-allowed;
          transform: none !important;
          box-shadow: none;
        }

        .send-btn:not(:disabled):hover {
          background: #2563eb;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .loading {
          text-align: center;
          padding: 24px;
          color: #64748b;
          font-size: 0.9rem;
        }

        @media (max-width: 480px) {
          .chat-popup {
            width: 100%;
            max-height: 80vh;
            bottom: 0;
            right: 0;
            border-radius: 16px 16px 0 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ChatPopup;