import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserEdit, FaSave } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lottie from "lottie-react";
import doctorAnimation from "../../public/Animaition/doctor-animation.json";
import doctorAnimation2 from "../../public/Animaition/doctor-animation1.json";
import { gap } from "@mui/system";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(
        "https://jainam-hospital-backend.onrender.com/api/v1/user/patient/me",
        { withCredentials: true }
      );
      setProfile(data.user);
      setFormData({
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email,
        phone: data.user.phone,
        nic: data.user.nic,
        dob: data.user.dob.split("T")[0],
        gender: data.user.gender,
      });
    } catch (err) {
      console.error("Failed to fetch profile", err);
      toast.error("Failed to load profile.");
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        "https://jainam-hospital-backend.onrender.com/api/v1/user/patient/update",
        formData,
        { withCredentials: true }
      );
      toast.success("Profile updated successfully!");
      setEditMode(false);
      fetchProfile();
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Update failed. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <Lottie animationData={doctorAnimation2} loop style={{ width: 300, height: 300 }} />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <ToastContainer position="top-center" autoClose={3000} />

      
      {/* Mobile View - Animation on Top */}
      {isMobile && (
        <div style={styles.mobileAnimation}>
          <Lottie animationData={doctorAnimation} loop style={{ width: '100%', height: 200 ,marginTop: '60px', marginBottom:'-40px'}} />
        </div>
      )}

      <div style={styles.contentWrapper}>
  
        {/* Desktop View - Animation in Left Panel */}
        {!isMobile && (
          <div style={styles.leftPanel}>
            <Lottie animationData={doctorAnimation} loop style={{ width: '100%',marginLeft: '-40%', }} />
          </div>
        )}

        <div style={styles.rightPanel}>
          <div style={styles.card}>
            <div style={styles.profileImage}>
              {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
            </div>
            <div style={styles.profileInfo}>
              <h2 style={styles.profileName}>{profile.firstName} {profile.lastName}</h2>
              <p style={styles.profileEmail}>{profile.email}</p>
              <p style={styles.role}>{profile.role}</p>
            </div>
            <button 
              style={editMode ? styles.editButtonActive : styles.editButton}
              onClick={() => setEditMode(!editMode)}
            >
              <FaUserEdit style={styles.editIcon} />
              {editMode ? 'Cancel' : 'Edit'}
            </button>
          </div>

          <div style={styles.formSection}>
            <h3 style={styles.sectionTitle}>Profile Information</h3>
            <div style={styles.form}>
              {[
                { label: "First Name", name: "firstName" },
                { label: "Last Name", name: "lastName" },
                { label: "Email", name: "email", type: "email" },
                { label: "Phone", name: "phone", type: "tel" },
                { label: "NIC", name: "nic" },
                { label: "Date of Birth", name: "dob", type: "date" },
              ].map(({ label, name, type = "text" }) => (
                <div key={name} style={styles.formGroup}>
                  <label style={styles.label}>{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    disabled={!editMode}
                    onChange={handleChange}
                    style={{
                      ...styles.input,
                      ...(editMode ? styles.inputActive : styles.inputDisabled),
                    }}
                  />
                </div>
              ))}

              <div style={styles.formGroup}>
                <label style={styles.label}>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  disabled={!editMode}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    ...(editMode ? styles.inputActive : styles.inputDisabled),
                  }}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {editMode && (
                <div style={styles.buttonGroup}>
                  <button 
                    style={styles.saveButton}
                    onClick={handleUpdate}
                  >
                    <FaSave style={styles.buttonIcon} />
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>

          <div style={styles.termsBox}>
            <h4 style={styles.termsTitle}>Terms & Conditions</h4>
            <p style={styles.termsText}>
              By using this portal, you agree to our privacy policy and terms of service. 
              All your personal medical information will be securely stored and used only 
              for healthcare purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f0f4f8',
    fontFamily: "'Inter', sans-serif",
  },
  mobileAnimation: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#f0f4f8',
    padding: '10px 0',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      padding: '10px',
    },
  },
  leftPanel: {
    flex: 1,
    display: 'flex', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  rightPanel: {
    flex: 2,
      marginTop: "7%",
    padding: '0 20px',
    '@media (max-width: 768px)': {
      padding: '10px',
    },
  },
  card: {
    position: 'relative',
    background: 'linear-gradient(to right, #e0f7fa, #e0f2f1)',
    borderRadius: '16px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    flexWrap: 'wrap',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      textAlign: 'center',
      gap: '15px',
    },
  },
  profileImage: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#3b82f6',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: '600',
    flexShrink: 0,
  },
  profileInfo: {
    flex: 1,
    minWidth: '200px',
  },
  profileName: {
    margin: '0',
    fontSize: '20px',
    color: '#1e293b',
    '@media (max-width: 768px)': {
      fontSize: '18px',
    },
  },
  profileEmail: {
    margin: '5px 0',
    fontSize: '14px',
    color: '#64748b',
  },
  role: {
    display: 'inline-block',
    backgroundColor: '#e0f2fe',
    color: '#0369a1',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    marginTop: '5px',
  },
  editButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'white',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '8px 16px',
    cursor: 'pointer',
    color: '#3b82f6',
    fontWeight: '500',
    fontSize: '14px',
    '@media (max-width: 768px)': {
      width: '100%',
      justifyContent: 'center',
    },
  },
  editButtonActive: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#f1f5f9',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '8px 16px',
    cursor: 'pointer',
    color: '#64748b',
    fontWeight: '500',
    fontSize: '14px',
    '@media (max-width: 768px)': {
      width: '100%',
      justifyContent: 'center',
    },
  },
  editIcon: {
    fontSize: '14px',
  },
  formSection: {
    marginTop: '20px',
    background: '#ffffff',
    padding: '20px',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '20px',
    position: 'relative',
    paddingBottom: '8px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '20px',
    position: 'relative',
    paddingBottom: '8px',
  },
  form: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#475569',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    fontSize: '14px',
    transition: 'all 0.2s ease',
  },
  inputActive: {
    backgroundColor: 'white',
    borderColor: '#93c5fd',
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
  },
  inputDisabled: {
    backgroundColor: '#f8fafc',
    color: '#64748b',
    cursor: 'not-allowed',
  },
  buttonGroup: {
    gridColumn: '1 / -1',
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
    '@media (max-width: 768px)': {
      justifyContent: 'center',
    },
  },
  saveButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#3b82f6',
    color: 'white',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#2563eb',
    },
  },
  buttonIcon: {
    fontSize: '14px',
  },
  termsBox: {
    marginTop: '20px',
    padding: '20px',
    backgroundColor: '#f1f5f9',
    borderRadius: '12px',
    fontSize: '14px',
    lineHeight: '1.6',
  },
  termsTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '12px',
  },
  termsText: {
    color: '#475569',
    margin: '0',
  },
};

export default ProfilePage;