import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaCalendarAlt, FaUserMd } from "react-icons/fa";

const AppointmentForm = ({ patientId }) => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    appointmentDate: "",
    department: "Pediatrics",
    doctorId: "",
    address: "",
    hasVisited: false
  });

  // Data state
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Departments list
  const departmentsArray = [
    "Pediatrics", "Orthopedics", "Cardiology", "Neurology", "Oncology",
    "Radiology", "Physical Therapy", "Dermatology", "ENT",
  ];

  // Fetch doctors list
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "https://jainam-hospital-backend.onrender.com/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (error) {
        toast.error("Failed to fetch doctors list");
      }
    };
    fetchDoctors();
  }, []);

  // Filter doctors by department
  useEffect(() => {
    if (formData.department) {
      const filtered = doctors.filter(
        (doctor) => doctor.doctorDepartment === formData.department
      );
      setFilteredDoctors(filtered);
      setFormData(prev => ({ ...prev, doctorId: "" }));
    }
  }, [formData.department, doctors]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle form submission
  const handleAppointment = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate required fields
      if (!formData.doctorId) {
        throw new Error("Please select a doctor");
      }

      const selectedDoctor = doctors.find(doc => doc._id === formData.doctorId);
      if (!selectedDoctor) {
        throw new Error("Selected doctor not found");
      }

      const { data } = await axios.post(
        "https://jainam-hospital-backend.onrender.com/api/v1/appointment/post",
        {
          ...formData,
          appointment_date: formData.appointmentDate,
          doctor_firstName: selectedDoctor.firstName,
          doctor_lastName: selectedDoctor.lastName,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(data.message);
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        nic: "",
        dob: "",
        gender: "",
        appointmentDate: "",
        department: "Pediatrics",
        doctorId: "",
        address: "",
        hasVisited: false
      });
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="appointment-form-container">
      <div className="appointment-form">
        <div className="section-header">
          <h2>Book New Appointment</h2>
          <p>Fill in your details to schedule an appointment</p>
        </div>
        
        <form onSubmit={handleAppointment}>
          <div className="form-grid">
            {/* Personal Information */}
            <div className="form-group">
              <label>First Name*</label>
              <input 
                type="text" 
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Last Name*</label>
              <input 
                type="text" 
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Email*</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Phone*</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>NIC*</label>
              <input 
                type="text" 
                name="nic"
                value={formData.nic}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Date of Birth*</label>
              <input 
                type="date" 
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Gender*</label>
              <select 
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            {/* Appointment Details */}
            <div className="form-group">
              <label>Appointment Date*</label>
              <input 
                type="date" 
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Department*</label>
              <select 
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                {departmentsArray.map((dept, i) => (
                  <option value={dept} key={i}>{dept}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Doctor*</label>
              <select 
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                required
                disabled={!formData.department}
              >
                <option value="">Select Doctor</option>
                {filteredDoctors.map((doctor) => (
                  <option value={doctor._id} key={doctor._id}>
                    Dr. {doctor.firstName} {doctor.lastName}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group full-width">
              <label>Address*</label>
              <textarea 
                rows="3" 
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group checkbox-group">
              <label>
                <input 
                  type="checkbox" 
                  name="hasVisited"
                  checked={formData.hasVisited}
                  onChange={handleChange}
                />
                Visited before?
              </label>
            </div>
          </div>
          
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Booking...' : 'Book Appointment'}
          </button>
        </form>
      </div>

      {/* Styles */}
      <style jsx>{`
        .appointment-form-container {
          max-width: 1900px;
        height: 50%;
          margin: 0 auto;
          padding: 2rem;
        }
        
        .appointment-form {
          background: #fff;
          border-radius: 16px;
          padding: 2.5rem;
        }
        
        .section-header {
          margin-bottom: 2rem;
          color: #2c3e50;
        }
        
        .section-header h2 {
          margin: 0;
          font-size: 1.8rem;
        }
        
        .section-header p {
          margin: 0.5rem 0 0;
          color: #7f8c8d;
          font-size: 0.95rem;
        }
        
        /* Form Styles */
        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .form-group {
          margin-bottom: 0;
        }
        
        .form-group.full-width {
          grid-column: 1 / -1;
        }
        
        .form-group.checkbox-group {
          display: flex;
          align-items: center;
        }
        
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #2c3e50;
          font-size: 0.95rem;
        }
        
        input, select, textarea {
          width: 100%;
          padding: 0.8rem 1rem;
          border: 1px solid #ddd;
          border-radius: 10px;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }
        
        input:focus, select:focus, textarea:focus {
          border-color: #3498db;
          outline: none;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
        }
        
        textarea {
          resize: vertical;
          min-height: 100px;
        }
        
        input[type="checkbox"] {
          width: auto;
          margin-right: 0.5rem;
        }
        
        button {
          background: #3498db;
          color: white;
          padding: 1rem 2rem;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
        }
        
        button:hover {
          background: #2980b9;
        }
        
        button:disabled {
          background: #bdc3c7;
          cursor: not-allowed;
        }
        
        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .appointment-form-container {
            padding: 0.5rem;
    
          }
          
          .appointment-form {
            padding: 0.5rem;
            width: 90%;
            margin-right:2.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AppointmentForm;