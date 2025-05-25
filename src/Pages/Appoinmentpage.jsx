import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaRupeeSign,
  FaPlus,
  FaSearch,
  FaDownload,
} from "react-icons/fa";
import FloatingButton from "../components/FloatingButton.jsx";
import FloatingButton2 from "../components/FloatingButton2.jsx";
import Lottie from "lottie-react";
import celebrationAnimation from "../../public/Animaition/clibretionn-animation.json";
import noAppointmentsAnimation from "../../public/Animaition/no-appointments-animation.json";
import downloadAnimation from "../../public/Animaition/doctor-animation1.json";
import MedicalReportsSection from "./MedicalReportsSection.jsx";

const PatientDashboard = () => {
  const storedUser = localStorage.getItem("user");
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true); // New state for initial loading
  const [activeTab, setActiveTab] = useState("appointments");
  const [showCelebration, setShowCelebration] = useState(false);
  const [downloadingId, setDownloadingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  if (!storedUser)
    return (
      <div className="error-container">
        <Lottie
          animationData={loginAnimation}
          loop={true}
          style={{ width: 300, height: 300 }}
        />
        <div className="error-message">Please login to access this page</div>
        <button
          className="login-redirect-btn"
          onClick={() => (window.location.href = "/login")}
        >
          Go to Login Page
        </button>
      </div>
    );

  const userData = JSON.parse(storedUser);
  const patientId = userData?._id;
  if (!patientId) return <div className="error">Invalid user data</div>;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const startTime = Date.now();

        const [res1, res2] = await Promise.all([
          fetch(
            `https://jainam-hospital-backend.onrender.com/api/v1/appointment/getpatientappointments/${patientId}`,
            {
              method: "GET",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
            }
          ),
          fetch(
            `https://jainam-hospital-backend.onrender.com/api/v1/descriptions/patient/${patientId}`,
            {
              method: "GET",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
            }
          ),
        ]);

        const [data1, data2] = await Promise.all([res1.json(), res2.json()]);

        // Calculate remaining time to ensure 2 second minimum loading
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(2000 - elapsed, 0);

        await new Promise((resolve) => setTimeout(resolve, remaining));

        setAppointments(data1.appointments || []);
        setFilteredAppointments(data1.appointments || []);
        setDescriptions(data2.descriptions || []);
      } catch (err) {
        console.error("Error fetching:", err);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
        setInitialLoading(false); // Turn off initial loading after data is loaded
      }
    };

    if (patientId) {
      // Show skeleton for minimum 2 seconds
      const timer = setTimeout(() => {
        fetchData();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [patientId]);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredAppointments(appointments);
    } else {
      const filtered = appointments.filter(
        (app) =>
          app.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (app.doctor?.firstName + " " + app.doctor?.lastName)
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          new Date(app.appointment_date)
            .toLocaleDateString()
            .includes(searchTerm)
      );
      setFilteredAppointments(filtered);
    }
  }, [searchTerm, appointments]);

  const totalFees = appointments.reduce((sum, app) => sum + (app.fees || 0), 0);

  const handleDownload = async (id, isAppointment = false) => {
    try {
      setDownloadingId(id);
      const endpoint = isAppointment
        ? `https://jainam-hospital-backend.onrender.com/api/v1/appointment/${id}/pdf`
        : `https://jainam-hospital-backend.onrender.com/api/v1/descriptions/${id}/pdf`;

      const response = await fetch(endpoint, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok)
        throw new Error(`Server responded with status ${response.status}`);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute(
        "download",
        isAppointment
          ? `appointment-report-${id}.pdf`
          : `medical-report-${id}.pdf`
      );
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }, 100);
    } catch (error) {
      console.error("Download failed:", error);
      setError(`Download failed: ${error.message}`);
    } finally {
      setDownloadingId(null);
    }
  };

  const getStatusBadge = (status) => {
    const badgeClasses = {
      Accepted: "accepted",
      Pending: "pending",
      Completed: "completed",
      Cancelled: "cancelled",
    };
    return (
      <span className={`badge ${badgeClasses[status] || ""}`}>{status}</span>
    );
  };

  if (initialLoading) {
    return (
      <div className="dashboard-container">
        {/* Skeleton Loading for Header */}
        <div className="dashboard-header shimmer">
          <div className="header-content">
            <div
              className="total-fees shimmer"
              style={{ width: "150px", height: "40px" }}
            ></div>
          </div>
          <div className="tabs shimmer">
            <div className="tab shimmer" style={{ width: "160px" }}></div>
            <div className="tab shimmer" style={{ width: "160px" }}></div>
          </div>
        </div>

        {/* Skeleton Loading for Search and Button */}
        <div className="appointments-header shimmer">
          <div className="search-container">
            <div
              className="search-bar shimmer"
              style={{ width: "100%", height: "40px" }}
            ></div>
            <div
              className="new-appointment-btn shimmer"
              style={{ width: "180px", height: "40px" }}
            ></div>
          </div>
        </div>

        {/* Skeleton Loading for Appointment Cards */}
        <div className="appointments-grid">
          {[...Array(28)].map((_, index) => (
            <div key={index} className="appointment-card shimmer">
              <div className="card-header">
                <div
                  className="shimmer-line"
                  style={{ width: "60%", height: "24px" }}
                ></div>
                <div
                  className="badge shimmer"
                  style={{ width: "80px", height: "24px" }}
                ></div>
              </div>
              <div className="card-body">
                <div className="info-row">
                  <div
                    className="label shimmer"
                    style={{ width: "40px", height: "16px" }}
                  ></div>
                  <div
                    className="shimmer"
                    style={{ width: "100px", height: "16px" }}
                  ></div>
                </div>
                <div className="info-row">
                  <div
                    className="label shimmer"
                    style={{ width: "60px", height: "16px" }}
                  ></div>
                  <div
                    className="shimmer"
                    style={{ width: "120px", height: "16px" }}
                  ></div>
                </div>
                <div className="info-row">
                  <div
                    className="label shimmer"
                    style={{ width: "40px", height: "16px" }}
                  ></div>
                  <div
                    className="shimmer"
                    style={{ width: "60px", height: "16px" }}
                  ></div>
                </div>
                <div
                  className="download-btn shimmer"
                  style={{ width: "160px", height: "36px" }}
                ></div>
              </div>
         
            </div>
            
          ))}
               <FloatingButton/>
              <FloatingButton2/>
        </div>

        <style jsx>{`
          .shimmer {
            background: linear-gradient(
              90deg,
              #f0f0f0 25%,
              #e0e0e0 50%,
              #f0f0f0 75%
            );
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite linear;
            border-radius: 4px;
          }

          @keyframes shimmer {
            0% {
              background-position: 200% 0;
            }
            100% {
              background-position: -200% 0;
            }
          }

          .dashboard-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 1rem;
          }

          .dashboard-header {
            margin-top: 5rem;
            margin-bottom: 2rem;
          }

          .header-content {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 1.5rem;
          }

          .tabs {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 2rem;
          }

          .appointments-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1.5rem;
          }

          .search-container {
            display: flex;
            gap: 1rem;
            width: 100%;
          }

          .appointments-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.5rem;
          }

          .appointment-card {
            background: white;
            border-radius: 10px;
            padding: 1.5rem;
          }

          .card-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1rem;
          }

          .card-body {
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
          }

          .info-row {
            display: flex;
            justify-content: space-between;
          }
        `}</style>
      </div>
    );
  }

  if (loading)
    return (
      <div className="loading-container">
        <Lottie
          animationData={downloadAnimation}
          loop={true}
          style={{
            width: "100%",
            height: 700,
            marginTop: "60px",
            marginBottom: "-40px",
          }}
        />
      </div>
    );

  return (
    <div className="dashboard-container">
      {showCelebration && (
        <div className="celebration-overlay">
          <Lottie
            animationData={celebrationAnimation}
            loop={false}
            style={{ width: "100%", height: "100%" }}
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
              <Lottie
                animationData={noAppointmentsAnimation}
                loop={true}
                style={{ width: 250, height: 250 }}
              />
              <p>
                {searchTerm
                  ? "No matching appointments found"
                  : "No appointments found"}
              </p>
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
                const relatedDescription = descriptions.find(
                  (d) => d.appointment?._id === app._id
                );
                return (
                  <div key={app._id} className="appointment-card">
                    <div className="card-header">
                      <h3>{app.department}</h3>
                      {getStatusBadge(app.status)}
                    </div>
                    <div className="card-body">
                      <div className="info-row">
                        <span className="label">Date:</span>
                        <span>
                          {new Date(app.appointment_date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="info-row">
                        <span className="label">Doctor:</span>
                        <span>
                          {app.doctor?.firstName} {app.doctor?.lastName}
                        </span>
                      </div>
                      <div className="info-row">
                        <span className="label">Fees:</span>
                        <span>₹{app.fees}</span>
                      </div>
                      {app.status === "Completed" &&
                        relatedDescription?._id && (
                          <button
                            onClick={() =>
                              handleDownload(relatedDescription._id, false)
                            }
                            className="download-btn"
                            disabled={downloadingId === relatedDescription._id}
                          >
                            {downloadingId === relatedDescription._id ? (
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
               <FloatingButton/>
              <FloatingButton2/>
        </div>
      )}

      {activeTab === "descriptions" && (
        <MedicalReportsSection
          descriptions={descriptions}
          appointments={appointments}
          downloadingId={downloadingId}
          handleDownload={handleDownload}
        />
      )}

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap");
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body {
          font-family: "Poppins", sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f9fafb;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: "Montserrat", sans-serif;
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
          font-family: "Montserrat", sans-serif;
        }
        .tab.active {
          color: #3b82f6;
          font-weight: 600;
        }
        .tab.active::after {
          content: "";
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
        .appointments-section {
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
          font-family: "Poppins", sans-serif;
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
          font-family: "Montserrat", sans-serif;
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
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
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
        .appointment-card {
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .appointment-card:hover {
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
        .info-row {
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
          font-family: "Montserrat", sans-serif;
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
        .shimmer {
          position: relative;
          overflow: hidden;
          background: #f0f0f0;
          border-radius: 8px;
          margin: 16px 0;
        }
        .shimmer::after {
          content: "";
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
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(250%);
          }
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
        .appointment-card.shimmer {
          padding: 20px;
          background: #f8f8f8;
          border-radius: 12px;
          margin: 20px 0;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.03);
        }
        .appointments-grid {
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
        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          text-align: center;
          padding: 2rem;
        }
        .error-message {
          font-size: 1.5rem;
          color: #dc2626;
          margin-bottom: 2rem;
          font-family: "Montserrat", sans-serif;
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
          font-family: "Montserrat", sans-serif;
        }
        .login-redirect-btn:hover {
          background: #2563eb;
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .appointments-header,
          .search-container {
            flex-direction: column;
            align-items: flex-start;
            margin-left: 5%;
          }
          .search-bar,
          .new-appointment-btn {
            width: 100%;
          }
          .appointments-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default PatientDashboard;
