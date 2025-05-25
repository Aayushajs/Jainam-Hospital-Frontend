import React, { useState, useEffect } from "react";
import { FaDownload, FaUserMd, FaPhone, FaEnvelope, FaPills, FaNotesMedical, FaVideo, FaSearch, FaComments, FaCalendarAlt } from "react-icons/fa";
import Lottie from "lottie-react";
import noRecordsAnimation from "../../public/Animaition/no-records-animation.json";
import downloadAnimation from "../../public/Animaition/doctor-animation1.json";
import noSearchResultsAnimation from "../../public/Animaition/no-records-animation.json";
import ChatPopup from "../components/chatComponent";
import VideoCallPopup from "../components/videoCall.jsx";

const storedUser = localStorage.getItem("user");

const MedicalReportsSection = ({ descriptions, appointments, downloadingId, handleDownload }) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDescriptions, setFilteredDescriptions] = useState(descriptions);
  const [showChat, setShowChat] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [currentAppointmentId, setCurrentAppointmentId] = useState(null);
  const [videoCallAppointmentId, setVideoCallAppointmentId] = useState(null);

  const userData = JSON.parse(storedUser);
  const patientName = userData?.firstName ? `${userData.firstName} ${userData.lastName}` : "Patient";

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredDescriptions(descriptions);
    } else {
      const filtered = descriptions.filter(desc => 
        desc.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
        desc.doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        desc.doctor.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        new Date(desc.date).toLocaleDateString().includes(searchTerm)
      );
      setFilteredDescriptions(filtered);
    }
  }, [searchTerm, descriptions]);

  const handleCall = (phoneNumber) => window.open(`tel:${phoneNumber}`);
  
  const handleVideoCall = (appointmentId) => {
    setVideoCallAppointmentId(appointmentId);
    setShowVideoCall(true);
  };
  
  const handleJoinMeeting = () => alert("Joining virtual meeting with doctor...");
  
  const handleStartChat = (appointmentId) => {
    setCurrentAppointmentId(appointmentId);
    setShowChat(true);
  };

  if (initialLoading) return <SkeletonLoader />;

  return (
    <div className="mrc">
      <div className="hs">
        <h2 className="st"><FaNotesMedical className="ic" /> Medical Records</h2>
        <div className="sc">
          <FaSearch className="si" />
          <input type="text" placeholder="Search records..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>

      {filteredDescriptions.length === 0 ? (searchTerm ? <NoSearchResults /> : <EmptyState hasAppointments={appointments.length > 0} />) : (
        <div className="rg">
          {filteredDescriptions.map(desc => (
            <MedicalRecordCard 
              key={desc._id} 
              record={desc} 
              downloadingId={downloadingId}
              handleDownload={handleDownload} 
              handleCall={handleCall} 
              handleVideoCall={handleVideoCall}
              handleJoinMeeting={handleJoinMeeting} 
              handleStartChat={handleStartChat} 
            />
          ))}
        </div>
      )}

      {showVideoCall && (
        <VideoCallPopup
          appointmentId={videoCallAppointmentId}
          onClose={() => setShowVideoCall(false)}
          userType={userData.role}
          userData={userData}
        />
      )}

      {showChat && (
        <ChatPopup 
          appointmentId={currentAppointmentId} 
          onClose={() => setShowChat(false)}
          senderName={patientName}
        />
      )}

      <style jsx>{`
        .mrc { padding: 2rem 1rem; max-width: 1400px; margin: 0 auto; background: #f8fafc; min-height: calc(100vh - 4rem); }
        .hs { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2.5rem; flex-wrap: wrap; gap: 1.5rem; padding: 0 1rem; }
        .st { display: flex; align-items: center; gap: 0.75rem; color: #1e293b; font-size: 2rem; font-weight: 600; margin: 0; 
          background: linear-gradient(90deg, #3b82f6, #6366f1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .ic { color: #3b82f6; font-size: 1.8rem; }
        .sc { display: flex; align-items: center; background: white; border-radius: 12px; padding: 0.75rem 1.25rem; 
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0; min-width: 320px; transition: all 0.3s ease; }
        .sc:focus-within { box-shadow: 0 2px 12px rgba(59, 130, 246, 0.2); border-color: #93c5fd; }
        .sc input { border: none; outline: none; padding: 0.5rem; width: 100%; font-size: 1rem; color: #334155; background: transparent; }
        .si { color: #94a3b8; margin-right: 0.75rem; font-size: 1.1rem; }
        .rg { display: grid; gap: 2rem; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); padding: 0 1rem; }
        @media (max-width: 768px) {
          .mrc { padding: 1.5rem 0.5rem; border-radius: 0; }
          .hs { flex-direction: column; align-items: stretch; gap: 1.5rem; margin-bottom: 1.5rem; }
          .st { font-size: 1.7rem; justify-content: center; }
          .sc { width: 100%; min-width: auto; }
          .rg { grid-template-columns: 1fr; gap: 1.5rem; }
        }
      `}</style>
    </div>
  );
};

const SkeletonLoader = () => (
  <div className="skc">
    <div className="skh"><div className="skt"></div><div className="sks"></div></div>
    <div className="skg">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="skcd">
          <div className="skcdh"><div className="skcdt"></div><div className="skb"></div></div>
          <div className="skdi"><div className="ska"></div><div className="skdd">
            <div className="skdn"></div><div className="skdp"></div><div className="skci"><div className="skc"></div><div className="skc"></div></div>
          </div></div>
          <div className="skp"><div className="sksk"></div><div className="skds"><div className="skd"></div><div className="skd"></div></div>
            <div className="skm"><div className="skmt"></div><div className="sktb"><div className="skth"></div><div className="sktr"></div><div className="sktr"></div></div></div>
          </div>
        </div>
      ))}
    </div>
    <style jsx>{`
      .skc { padding: 2rem 1rem; max-width: 1400px; margin: 0 auto; background: #f8fafc; min-height: calc(100vh - 4rem); }
      .skh { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2.5rem; flex-wrap: wrap; gap: 1.5rem; padding: 0 1rem; }
      .skt { width: 250px; height: 40px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%;
        border-radius: 8px; animation: shimmer 1.5s infinite linear; }
      .sks { width: 320px; height: 48px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%;
        border-radius: 12px; animation: shimmer 1.5s infinite linear; }
      .skg { display: grid; gap: 2rem; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); padding: 0 1rem; }
      .skcd { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); }
      .skcdh { display: flex; justify-content: space-between; margin-bottom: 1.5rem; }
      .skcdt { width: 60%; height: 28px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%;
        border-radius: 6px; animation: shimmer 1.5s infinite linear; }
      .skb { width: 120px; height: 40px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%;
        border-radius: 6px; animation: shimmer 1.5s infinite linear; }
      .skdi { display: flex; gap: 1rem; margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid #f0f0f0; }
      .ska { width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%; animation: shimmer 1.5s infinite linear; }
      .skdd { flex: 1; display: flex; flex-direction: column; gap: 0.75rem; }
      .skdn { width: 60%; height: 20px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%;
        border-radius: 4px; animation: shimmer 1.5s infinite linear; }
      .skdp { width: 40%; height: 16px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%;
        border-radius: 4px; animation: shimmer 1.5s infinite linear; }
      .skci { display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.5rem; }
      .skc { width: 80%; height: 16px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%;
        border-radius: 4px; animation: shimmer 1.5s infinite linear; }
      .skp { margin-top: 1rem; }
      .sksk { width: 40%; height: 20px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%;
        border-radius: 4px; margin-bottom: 1rem; animation: shimmer 1.5s infinite linear; }
      .skds { display: flex; gap: 1.5rem; margin-bottom: 1.5rem; }
      .skd { width: 120px; height: 16px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%;
        border-radius: 4px; animation: shimmer 1.5s infinite linear; }
      .skm { margin-top: 1.5rem; }
      .skmt { width: 30%; height: 18px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%;
        border-radius: 4px; margin-bottom: 1rem; animation: shimmer 1.5s infinite linear; }
      .sktb { width: 100%; }
      .skth { width: 100%; height: 20px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%;
        border-radius: 4px; margin-bottom: 0.75rem; animation: shimmer 1.5s infinite linear; }
      .sktr { width: 100%; height: 16px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%;
        border-radius: 4px; margin-bottom: 0.5rem; animation: shimmer 1.5s infinite linear; }
      @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
      @media (max-width: 768px) {
        .skc { padding: 1.5rem 0.5rem; }
        .skh { flex-direction: column; align-items: stretch; gap: 1.5rem; margin-bottom: 1.5rem; }
        .skt { width: 100%; max-width: 250px; margin: 0 auto; }
        .sks { width: 100%; }
        .skg { grid-template-columns: 1fr; gap: 1.5rem; }
      }
    `}</style>
  </div>
);

const EmptyState = ({ hasAppointments }) => (
  <div className="es">
    <Lottie animationData={noRecordsAnimation} loop={true} style={{ width: 250, height: 250 }} />
    <p className="et">No medical records available.</p>
    {hasAppointments && <p className="est">Complete an appointment to see your medical records here.</p>}
    <style jsx>{`
      .es { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 3rem 0; text-align: center; }
      .et { font-size: 1.2rem; color: #4a5568; margin-top: 1rem; }
      .est { font-size: 1rem; color: #718096; margin-top: 0.5rem; }
    `}</style>
  </div>
);

const NoSearchResults = () => (
  <div className="nsr">
    <Lottie animationData={noSearchResultsAnimation} loop={true} style={{ width: 300, height: 300 }} />
    <p className="nsrt">No records found matching your search</p>
    <p className="nsrst">Try different search terms</p>
    <style jsx>{`
      .nsr { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 3rem 0; text-align: center; }
      .nsrt { font-size: 1.2rem; color: #4a5568; margin-top: 1rem; }
      .nsrst { font-size: 1rem; color: #718096; margin-top: 0.5rem; }
    `}</style>
  </div>
);


const MedicalRecordCard = ({ record, downloadingId, handleDownload, handleCall, handleVideoCall, handleJoinMeeting, handleStartChat }) => (
  <div className="rc">
    <div className="rch">
      <div>
        <h3 className="diag">{record.diagnosis}</h3>
        <p className="ad"><FaCalendarAlt /> {new Date(record.appointment.date).toLocaleDateString()}</p>
      </div>
      <button onClick={() => handleDownload(record._id)} className="dlb" disabled={downloadingId === record._id}>
        {downloadingId === record._id ? <Lottie animationData={downloadAnimation} loop={true} style={{ width: 24, height: 24 }} /> : <><FaDownload /> Download</>}
      </button>
    </div>

    <div className="di">
      <div className="da"><FaUserMd size={32} /></div>
      <div className="dd">
        <h4>{record.doctor.name}</h4>
        <p className="dept">{record.doctor.department}</p>
        <div className="ca">
          <div className="ci">
            <span><FaPhone /> {record.doctor.contact.phone}</span>
            <span><FaEnvelope /> {record.doctor.contact.email}</span>
          </div>
          <div className="ab-container">
            <button onClick={() => handleCall(record.doctor.contact.phone)} className="ab call" title="Call">
              <FaPhone />
              <span className="ab-text">Call</span>
            </button>
            <button onClick={() => handleVideoCall(record.appointment._id)} className="ab video" title="Video Call">
              <FaCalendarAlt />
              <span className="ab-text">Video</span>
            </button>
            {/* <button onClick={handleJoinMeeting} className="ab meet" title="Meeting">
              <FaVideo />
              <span className="ab-text">Meet</span>
            </button> */}
            <button onClick={() => handleStartChat(record.appointment._id)} className="ab chat" title="Chat">
              <FaComments /> <FaCalendarAlt />
              <span className="ab-text">Chat</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div className="ps">
      <h4 className="st"><FaPills /> Prescription Details</h4>
      <div className="pd">
        <div className="di">
          <span className="dl">Diagnosis Date</span>
          <span className="dv">{new Date(record.date).toLocaleDateString()}</span>
        </div>
        {record.nextVisit && (
          <div className="di">
            <span className="dl">Next Visit</span>
            <span className="dv">{new Date(record.nextVisit).toLocaleDateString()}</span>
          </div>
        )}
      </div>
      <div className="ms">
        <h5 className="mt">Prescribed Medicines</h5>
        <div className="mtb">
          <table>
            <thead>
              <tr>
                <th>Name</th><th>Type</th><th>Dosage</th><th>Frequency</th><th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {record.medicines.map(med => (
                <tr key={med._id}>
                  <td>{med.name}</td><td>{med.type}</td><td>{med.dosage}</td><td>{med.frequency}</td><td>{med.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <style jsx>{`
      .rc { background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); overflow: hidden; transition: transform 0.2s ease, box-shadow 0.2s ease; }
      .rc:hover { transform: translateY(-2px); box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1); }
      .rch { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem; background: #f8fafc; border-bottom: 1px solid #e2e8f0; }
      .diag { margin: 0; color: #2d3748; font-size: 1.25rem; }
      .ad { display: flex; align-items: center; gap: 0.25rem; margin: 0.25rem 0 0; font-size: 0.875rem; color: #718096; }
      .dlb { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: #4299e1; color: white; border: none; border-radius: 6px;
        font-size: 0.875rem; cursor: pointer; transition: background 0.2s ease; }
      .dlb:hover { background: #3182ce; }
      .dlb:disabled { background: #bee3f8; cursor: not-allowed; }
      .di { display: flex; gap: 1rem; padding: 1.25rem; border-bottom: 1px solid #e2e8f0; }
      .da { width: 3.5rem; height: 3.5rem; border-radius: 50%; background: #ebf8ff; display: flex; align-items: center; justify-content: center; color: #3182ce; flex-shrink: 0; }
      .dd { flex: 1; }
      .dd h4 { margin: 0; color: #2d3748; font-size: 1.125rem; }
      .dept { margin: 0.25rem 0 0; font-size: 0.875rem; color: #718096; }
      .ca { display: flex; justify-content: space-between; margin-top: 0.75rem; }
      .ci { display: flex; flex-direction: column; gap: 0.25rem; }
      .ci span { display: flex; align-items: center; gap: 0.25rem; font-size: 0.875rem; color: #4a5568; }
      .ab-container { display: flex; gap: 0.5rem; }
      .ab { width: 2.5rem; height: 2.5rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: none; cursor: pointer;
        transition: all 0.2s ease; position: relative; }
      .ab.call { background: #4299e1; color: white; }
      .ab.video { background: #48bb78; color: white; }
      .ab.meet { background: #9f7aea; color: white; }
      .ab.chat { background: #ed8936; color: white; }
      .ab:hover { transform: scale(1.1); box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
      .ab-text { display: none; }
      .ps { padding: 1.25rem; }
      .st { display: flex; align-items: center; gap: 0.5rem; margin: 0 0 1rem; color: #2d3748; font-size: 1.125rem; }
      .pd { display: flex; gap: 1.5rem; margin-bottom: 1rem; }
      .di { display: flex; flex-direction: column; }
      .dl { font-size: 0.75rem; color: #718096; text-transform: uppercase; letter-spacing: 0.05em; }
      .dv { font-size: 0.875rem; color: #4a5568; margin-top: 0.25rem; }
      .ms { margin-top: 1rem; }
      .mt { margin: 1.5rem 0 0.75rem; color: #2d3748; font-size: 1rem; }
      .mtb { overflow-x: auto; }
      table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
      th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e2e8f0; }
      th { background: #f8fafc; color: #4a5568; font-weight: 600; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.05em; }
      td { color: #4a5568; }
      tr:hover td { background: #f8fafc; }

      @media (max-width: 768px) {
        .ca { flex-direction: column; gap: 1rem; }
        .ab-container { justify-content: flex-start; }
        .ab { width: auto; height: auto; border-radius: 6px; padding: 0.5rem 0.75rem; gap: 0.5rem; }
        .ab-text { display: inline; font-size: 0.875rem; }
        .pd { flex-direction: column; gap: 0.75rem; }
        table { font-size: 0.75rem; }
        th, td { padding: 0.5rem; }
      }

      @media (max-width: 480px) {
        .di { flex-direction: column; }
        .dd h4 { font-size: 1rem; }
        .ci span { font-size: 0.8125rem; }
        .ab { padding: 0.5rem; }
        .ab-text { font-size: 0.8125rem; }
      }
    `}</style>
  </div>
);

export default MedicalReportsSection;