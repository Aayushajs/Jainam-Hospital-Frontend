import React, { useEffect, useState } from "react";
import { FaDownload, FaCalendarAlt, FaUserMd, FaPhone, FaEnvelope, FaPills, FaNotesMedical, FaRupeeSign, FaPlus, FaSearch, FaVideo } from "react-icons/fa";
import Lottie from "lottie-react";
import celebrationAnimation from "../../public/Animaition/clibretionn-animation.json";
import downloadAnimation from "../../public/Animaition/doctor-animation1.json";
import doctorAnimation from "../../public/Animaition/doctor-animation1.json";
import loginAnimation from "../../public/Animaition/login-animation.json";
import noRecordsAnimation from "../../public/Animaition/no-records-animation.json";
import noAppointmentsAnimation from "../../public/Animaition/no-appointments-animation.json";

const PatientDashboard = () => {
  const storedUser = localStorage.getItem("user");
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("appointments");
  const [showCelebration, setShowCelebration] = useState(false);
  const [downloadingId, setDownloadingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  if (!storedUser) {
    return (
      <div className="error-container">
        <div className="animation-container">
          <Lottie 
            animationData={loginAnimation}
            loop={true}
            style={{ width: 300, height: 300 }}
          />
        </div>
        <div className="error-message">
          Please login to access this page
        </div>
        <button 
          className="login-redirect-btn"
          onClick={() => window.location.href = "/login"}
        >
          Go to Login Page
        </button>
        <style jsx>{`
          .error-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            text-align: center;
            padding: 2rem;
          }
          .animation-container {
            margin-bottom: 2rem;
          }
          .error-message {
            font-size: 1.5rem;
            color: #dc2626;
            margin-bottom: 2rem;
            font-family: 'Montserrat', sans-serif;
            font-weight: 500;
          }
          .login-redirect-btn {
            padding: 0.8rem 1.5rem;
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 1rem;
            cursor: pointer;
            transition: background 0.3s ease;
            font-family: 'Montserrat', sans-serif;
          }
          .login-redirect-btn:hover {
            background: #2563eb;
          }
        `}</style>
      </div>
    );
  }

  const userData = JSON.parse(storedUser);
  const patientId = userData?._id;
  
  if (!patientId) {
    return <div className="error">Invalid user data</div>;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch appointments
        const res1 = await fetch(
          `https://jainam-hospital-backend.onrender.com/api/v1/appointment/getpatientappointments/${patientId}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data1 = await res1.json();
        setAppointments(data1.appointments || []);
        setFilteredAppointments(data1.appointments || []);

        // Fetch descriptions
        const res2 = await fetch(
          `https://jainam-hospital-backend.onrender.com/api/v1/descriptions/patient/${patientId}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data2 = await res2.json();
        setDescriptions(data2.descriptions || []);
      } catch (err) {
        console.error("Error fetching:", err);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [patientId]);

  // Search functionality
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredAppointments(appointments);
    } else {
      const filtered = appointments.filter(app => 
        app.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (app.doctor?.firstName + " " + app.doctor?.lastName).toLowerCase().includes(searchTerm.toLowerCase()) ||
        new Date(app.appointment_date).toLocaleDateString().includes(searchTerm)
      );
      setFilteredAppointments(filtered);
    }
  }, [searchTerm, appointments]);

  // Calculate total fees
  const totalFees = appointments.reduce((sum, appointment) => {
    return sum + (appointment.fees || 0);
  }, 0);

  const handleDownload = async (id, isAppointment = false) => {
    try {
      setDownloadingId(id);
      
      const endpoint = isAppointment 
        ? `https://jainam-hospital-backend.onrender.com/api/v1/appointment/${id}/pdf`
        : `https://jainam-hospital-backend.onrender.com/api/v1/descriptions/${id}/pdf`;
      
      const response = await fetch(endpoint, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/pdf')) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Response was not a PDF');
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', isAppointment 
        ? `appointment-report-${id}.pdf` 
        : `medical-report-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }, 100);

    } catch (error) {
      console.error('Download failed:', error);
      setError(`Download failed: ${error.message}`);
    } finally {
      setDownloadingId(null);
    }
  };

  const handleCall = (phoneNumber) => {
    console.log(`Initiating call to ${phoneNumber}`);
    window.open(`tel:${phoneNumber}`);
  };

  const handleVideoCall = (phoneNumber) => {
    console.log(`Initiating video call to ${phoneNumber}`);
    alert(`Video call would be initiated with doctor at ${phoneNumber}. This would integrate with your video call service in production.`);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Accepted':
        return <span className="badge accepted">Accepted</span>;
      case 'Pending':
        return <span className="badge pending">Pending</span>;
      case 'Completed':
        return <span className="badge completed">Completed</span>;
      case 'Cancelled':
        return <span className="badge cancelled">Cancelled</span>;
      default:
        return <span className="badge">Unknown</span>;
    }
  };

  // Shimmer Loading Components
  const AppointmentCardShimmer = () => (
    <div className="appointment-card shimmer">
      <div className="shimmer-header"></div>
      <div className="shimmer-line"></div>
      <div className="shimmer-line"></div>
      <div className="shimmer-line"></div>
      <div className="shimmer-button"></div>
    </div>
  );

  const DescriptionCardShimmer = () => (
    <div className="description-card shimmer">
      <div className="shimmer-header"></div>
      <div className="shimmer-doctor">
        <div className="shimmer-avatar"></div>
        <div className="shimmer-details">
          <div className="shimmer-line"></div>
          <div className="shimmer-line"></div>
        </div>
      </div>
      <div className="shimmer-prescription">
        <div className="shimmer-line"></div>
        <div className="shimmer-line"></div>
      </div>
      <div className="shimmer-medicine">
        <div className="shimmer-line"></div>
        <div className="shimmer-line"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-header shimmer">
          <div className="header-content">
            <div className="total-fees shimmer"></div>
          </div>
          <div className="tabs shimmer">
            <div className="tab shimmer"></div>
            <div className="tab shimmer"></div>
          </div>
        </div>

        {activeTab === "appointments" && (
          <div className="appointments-section">
            <div className="appointments-header shimmer">
              <h2 className="shimmer">
                <div className="shimmer-icon"></div>
                <div className="shimmer-text"></div>
              </h2>
              <div className="search-container shimmer">
                <div className="search-bar shimmer"></div>
                <div className="new-appointment-btn shimmer"></div>
              </div>
            </div>
            <div className="appointments-grid">
              {[1, 2, 3, 4].map((i) => (
                <AppointmentCardShimmer key={i} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "descriptions" && (
          <div className="descriptions-section">
            <h2 className="shimmer">
              <div className="shimmer-icon"></div>
              <div className="shimmer-text"></div>
            </h2>
            <div className="descriptions-list">
              {[1, 2].map((i) => (
                <DescriptionCardShimmer key={i} />
              ))}
            </div>
          </div>
        )}

        <style jsx>{`
          .shimmer {
            position: relative;
            overflow: hidden;
            background: #f0f0f0;
            border-radius: 8px;
            margin: 16px 0;
          }

          .shimmer::after {
            content: '';
            position: absolute;
            top: 0;
            left: -150px;
            width: 100px;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.6),
              transparent
            );
            animation: shimmer 1.5s infinite ease-in-out;
          }

          @keyframes shimmer {
            0% { transform: translateX(0); }
            100% { transform: translateX(250%); }
          }

          .shimmer-header {
            height: 24px;
            width: 50%;
            margin: 20px auto;
            background: #e0e0e0;
            border-radius: 4px;
          }

          .shimmer-line {
            height: 12px;
            width: 90%;
            margin: 10px auto;
            background: #e0e0e0;
            border-radius: 4px;
          }

          .shimmer-button {
            height: 36px;
            width: 120px;
            margin: 20px auto;
            background: #e0e0e0;
            border-radius: 20px;
          }

          .shimmer-avatar {
            width: 60px;
            height: 60px;
            margin: 10px auto;
            border-radius: 50%;
            background: #e0e0e0;
          }

          .shimmer-text {
            height: 18px;
            width: 40%;
            margin: 10px auto;
            background: #e0e0e0;
            border-radius: 4px;
          }

          .shimmer-icon {
            width: 24px;
            height: 24px;
            background: #e0e0e0;
            border-radius: 4px;
            margin: 0 auto 10px;
          }

          .appointment-card.shimmer,
          .description-card.shimmer {
            padding: 20px;
            background: #f8f8f8;
            border-radius: 12px;
            margin: 20px 0;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.03);
          }

          .shimmer-doctor {
            display: flex;
            align-items: center;
            gap: 12px;
            margin: 15px 0;
          }

          .shimmer-details {
            flex: 1;
          }

          .shimmer-prescription,
          .shimmer-medicine {
            margin: 10px 0;
          }

          .appointments-grid,
          .descriptions-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            margin: 20px 0;
          }

          .dashboard-header.shimmer {
            padding: 20px;
            margin: 30px 0;
            background: #f8f8f8;
            border-radius: 10px;
          }

          .tabs.shimmer {
            display: flex;
            gap: 10px;
            margin: 20px 0;
            justify-content: center;
          }

          .tab.shimmer {
            height: 32px;
            width: 150px;
            background: #e0e0e0;
            border-radius: 20px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {showCelebration && (
        <div className="celebration-overlay">
          <Lottie 
            animationData={celebrationAnimation}
            loop={false}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}

      <div className="dashboard-header">
        <div className="header-content">
          <div className="total-fees">
            <FaRupeeSign className="rupee-icon" />
            <span>Total Fees: ₹{totalFees}</span>
          </div>
        </div>
        <div className="tabs">
          <button 
            className={`tab ${activeTab === "appointments" ? "active" : ""}`}
            onClick={() => setActiveTab("appointments")}
          >
            My Appointments
          </button>
          <button 
            className={`tab ${activeTab === "descriptions" ? "active" : ""}`}
            onClick={() => setActiveTab("descriptions")}
          >
            Medical Records
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError("")} className="close-error">
            ×
          </button>
        </div>
      )}

      {activeTab === "appointments" && (
        <div className="appointments-section">
          <div className="appointments-header">
            <h2>
              <FaCalendarAlt className="icon" /> Appointment History
            </h2>
            <div className="search-container">
              <div className="search-bar">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search appointments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button 
                className="new-appointment-btn"
                onClick={() => (window.location.href = "/appointment")}
              >
                <FaPlus /> New Appointment
              </button>
            </div>
          </div>
          
          {filteredAppointments.length === 0 ? (
            <div className="empty-state">
              <div className="animation-container">
                <Lottie 
                  animationData={noAppointmentsAnimation}
                  loop={true}
                  style={{ width: 250, height: 250 }}
                />
              </div>
              <p>{searchTerm ? "No matching appointments found" : "No appointments found"}</p>
              <button 
                className="new-appointment-btn"
                onClick={() => (window.location.href = "/appointment")}
              >
                <FaPlus /> Book New Appointment
              </button>
            </div>
          ) : (
            <div className="appointments-grid">
              {filteredAppointments.map((app) => {
                const relatedDescription = descriptions.find(d => d.appointment?._id === app._id);
                const descriptionId = relatedDescription?._id;

                return (
                  <div key={app._id} className="appointment-card">
                    <div className="card-header">
                      <h3>{app.department}</h3>
                      {getStatusBadge(app.status)}
                    </div>
                    
                    <div className="card-body">
                      <div className="info-row">
                        <span className="label">Date:</span>
                        <span>{new Date(app.appointment_date).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="info-row">
                        <span className="label">Doctor:</span>
                        <span>{app.doctor?.firstName} {app.doctor?.lastName}</span>
                      </div>
                      
                      <div className="info-row">
                        <span className="label">Fees:</span>
                        <span>₹{app.fees}</span>
                      </div>
                      
                      {app.status === "Completed" && descriptionId && (
                        <button 
                          onClick={() => handleDownload(descriptionId, false)}
                          className="download-btn"
                          disabled={downloadingId === descriptionId}
                        >
                          {downloadingId === descriptionId ? (
                            <div className="download-animation">
                              <Lottie 
                                animationData={downloadAnimation}
                                loop={true}
                                style={{ width: 24, height: 24 }}
                              />
                            </div>
                          ) : (
                            <>
                              <FaDownload /> Download Report
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === "descriptions" && (
        <div className="descriptions-section">
          <h2>
            <FaNotesMedical className="icon" /> Medical Records
          </h2>
          
          {descriptions.length === 0 ? (
            <div className="empty-state">
              <div className="animation-container">
                <Lottie 
                  animationData={noRecordsAnimation}
                  loop={true}
                  style={{ width: 250, height: 250 }}
                />
              </div>
              <p>No medical records available.</p>
              {appointments.length > 0 && (
                <p>Complete an appointment to see your medical records here.</p>
              )}
            </div>
          ) : (
            <div className="descriptions-list">
              {descriptions.map((desc) => (
                <div key={desc._id} className="description-card">
                  <div className="card-header">
                    <div className="diagnosis-header">
                      <h3>{desc.diagnosis}</h3>
                      <span className="appointment-date">
                        {new Date(desc.appointment.date).toLocaleDateString()}
                      </span>
                    </div>
                    <button 
                      onClick={() => handleDownload(desc._id)}
                      className="download-btn"
                      disabled={downloadingId === desc._id}
                    >
                      {downloadingId === desc._id ? (
                        <div className="download-animation">
                          <Lottie 
                            animationData={downloadAnimation}
                            loop={true}
                            style={{ width: 24, height: 24 }}
                          />
                        </div>
                      ) : (
                        <>
                          <FaDownload /> Download PDF
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className="card-body">
                    <div className="doctor-info">
                      <div className="doctor-avatar">
                        <FaUserMd size={40} />
                      </div>
                      <div className="doctor-details">
                        <h4>{desc.doctor.name}</h4>
                        <p className="department">{desc.doctor.department}</p>
                        <div className="contact-info">
                          <span><FaPhone /> {desc.doctor.contact.phone}</span>
                          <span><FaEnvelope /> {desc.doctor.contact.email}</span>
                          <div className="call-buttons">
                            <button className="call-btn" onClick={() => handleCall(desc.doctor.contact.phone)}>
                              <FaPhone /> Call
                            </button>
                            <button className="video-call-btn" onClick={() => handleVideoCall(desc.doctor.contact.phone)}>
                              <FaVideo /> Video Call
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="prescription-section">
                      <h4><FaPills /> Prescription Details</h4>
                      
                      <div className="prescription-grid">
                        <div className="prescription-item">
                          <span className="label">Diagnosis Date</span>
                          <span>{new Date(desc.date).toLocaleDateString()}</span>
                        </div>
                        
                        {desc.nextVisit && (
                          <div className="prescription-item">
                            <span className="label">Next Visit</span>
                            <span>{new Date(desc.nextVisit).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="medicines-section">
                        <h5>Prescribed Medicines</h5>
                        <div className="medicines-grid">
                          {desc.medicines.map((med) => (
                            <div key={med._id} className="medicine-card">
                              <div className="medicine-header">
                                <span className="medicine-name">{med.name}</span>
                                <span className="medicine-type">{med.type}</span>
                              </div>
                              <div className="medicine-details">
                                <div className="detail-item">
                                  <span>Dosage:</span>
                                  <span>{med.dosage}</span>
                                </div>
                                <div className="detail-item">
                                  <span>Frequency:</span>
                                  <span>{med.frequency}</span>
                                </div>
                                <div className="detail-item">
                                  <span>Duration:</span>
                                  <span>{med.duration}</span>
                                </div>
                                {med.instructions && (
                                  <div className="detail-item">
                                    <span>Instructions:</span>
                                    <span>{med.instructions}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap');
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        body {
          font-family: 'Poppins', sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f9fafb;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
        }
      `}</style>

      <style jsx>{`
        .dashboard-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
          position: relative;
        }
        
        .celebration-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.8);
          z-index: 1000;
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: none;
        }
        
        .dashboard-header {
          margin-top: 5rem;
          margin-bottom: 2rem;
        }
        
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .error-message {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: #fee2e2;
          color: #b91c1c;
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 1rem;
          z-index: 100;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .close-error {
          background: none;
          border: none;
          color: #b91c1c;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 0 0.5rem;
        }
        
        .total-fees {
          display: flex;
          align-items: center;
          margin-left: auto;
          gap: 0.5rem;
          background: #f0fdf4;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          color: #166534;
          font-weight: 600;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .rupee-icon {
          color: #166534;
        }
        
        .tabs {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .tab {
          padding: 0.8rem 1.5rem;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          color: #64748b;
          position: relative;
          transition: all 0.3s ease;
          font-family: 'Montserrat', sans-serif;
        }
        
        .tab.active {
          color: #3b82f6;
          font-weight: 600;
        }
        
        .tab.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 3px;
          background: #3b82f6;
          border-radius: 3px 3px 0 0;
        }
        
        .tab:hover {
          color: #3b82f6;
        }
        
        .appointments-section, .descriptions-section {
          margin-top: 1rem;
        }
        
        .appointments-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .search-container {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .search-bar {
          display: flex;
          align-items: center;
          background: white;
          border-radius: 30px;
          padding: 0.5rem 1rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }
        
        .search-bar input {
          border: none;
          outline: none;
          padding: 0.5rem;
          font-family: 'Poppins', sans-serif;
          width: 200px;
        }
        
        .search-icon {
          color: #64748b;
          margin-right: 0.5rem;
        }
        
        .new-appointment-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1.2rem;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.3s ease;
          font-family: 'Montserrat', sans-serif;
        }
        
        .new-appointment-btn:hover {
          background: #2563eb;
        }
        
        h2 {
          color: #374151;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          font-size: 1.8rem;
        }
        
        .icon {
          color: #3b82f6;
        }
        
        .empty-state {
          text-align: center;
          padding: 3rem;
          background: #f8fafc;
          border-radius: 8px;
          color: #64748b;
          margin: 2rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .animation-container {
          margin-bottom: 1.5rem;
        }
        
        .empty-state p {
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }
        
        .appointments-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        
        .appointment-card, .description-card {
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .appointment-card:hover, .description-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        }
        
        .card-header {
          padding: 1rem 1.5rem;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .diagnosis-header {
          display: flex;
          flex-direction: column;
        }
        
        .appointment-date {
          font-size: 0.8rem;
          color: #64748b;
          margin-top: 0.2rem;
        }
        
        .card-header h3 {
          margin: 0;
          color: #1e293b;
          font-size: 1.2rem;
        }
        
        .badge {
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }
        
        .badge.accepted {
          background: #d1fae5;
          color: #065f46;
        }
        
        .badge.pending {
          background: #fef3c7;
          color: #92400e;
        }
        
        .badge.completed {
          background: #dbeafe;
          color: #1e40af;
        }
        
        .badge.cancelled {
          background: #fee2e2;
          color: #991b1b;
        }
        
        .card-body {
          padding: 1.5rem;
        }
        
        .info-row, .info-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.8rem;
        }
        
        .label {
          font-weight: 500;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .download-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background 0.3s ease;
          font-family: 'Montserrat', sans-serif;
        }
        
        .download-btn:hover {
          background: #2563eb;
        }
        
        .download-btn:disabled {
          background: #93c5fd;
          cursor: wait;
        }
        
        .download-animation {
          width: 24px;
          height: 24px;
        }
        
        .descriptions-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .doctor-info {
          display: flex;
          gap: 1.5rem;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .doctor-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #e0f2fe;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0369a1;
        }
        
        .doctor-details {
          flex: 1;
        }
        
        .doctor-details h4 {
          margin-bottom: 0.2rem;
          color: #1e293b;
        }
        
        .department {
          color: #64748b;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }
        
        .contact-info {
          display: flex;
          gap: 1rem;
          font-size: 0.9rem;
          align-items: center;
          flex-wrap: wrap;
        }
        
        .contact-info span {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          color: #475569;
        }
        
        .call-buttons {
          display: flex;
          gap: 0.5rem;
          margin-left: 1rem;
        }
        
        .call-btn, .video-call-btn {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.3rem 0.7rem;
          border: none;
          border-radius: 4px;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .call-btn {
          background: #3b82f6;
          color: white;
        }
        
        .call-btn:hover {
          background: #2563eb;
        }
        
        .video-call-btn {
          background: #10b981;
          color: white;
        }
        
        .video-call-btn:hover {
          background: #059669;
        }
        
        .prescription-section {
          margin-top: 1rem;
        }
        
        .prescription-section h4 {
          margin-bottom: 1rem;
          color: #1e293b;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .prescription-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .prescription-item {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        
        .prescription-item .label {
          font-size: 0.85rem;
          color: #64748b;
        }
        
        .medicines-section {
          margin-top: 1.5rem;
        }
          
        .medicines-section h5 {
          margin-bottom: 1rem;
          color: #1e293b;
          font-size: 1.1rem;
        }
        
        .medicines-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
        }
        
        .medicine-card {
          background: #f8fafc;
          border-radius: 8px;
          padding: 1rem;
          border-left: 4px solid #3b82f6;
        }
        
        .medicine-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }
        
        .medicine-name {
          font-weight: 600;
          color: #1e40af;
        }
        
        .medicine-type {
          font-size: 0.8rem;
          background: #e0f2fe;
          color: #0369a1;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
        }
        
        .medicine-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .detail-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
        }
        
        .detail-item span:first-child {
          color: #64748b;
        }
        
        .loading-container {
          height: 60vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 1rem;
        }
        
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 5px solid #e0e0e0;
          border-top: 5px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .error {
          text-align: center;
          padding: 2rem;
          color: #dc2626;
          font-weight: 500;
          font-family: 'Montserrat', sans-serif;
        }
        
        @media (max-width: 768px) {
          .dashboard-header h1 {
            font-size: 2rem;
          }
          
          .header-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .appointments-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .search-container {
            width: 100%;
            flex-direction: column;
            align-items: flex-start;
          }
          
          .search-bar {
            width: 100%;
          }
          
          .new-appointment-btn {
            width: 100%;
            justify-content: center;
          }
          
          .appointments-grid {
            grid-template-columns: 1fr;
          }
          
          .doctor-info {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .prescription-grid {
            grid-template-columns: 1fr;
          }
          
          .medicines-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default PatientDashboard;