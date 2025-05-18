import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import AppointmentForm from "../components/AppointmentForm";
import Lottie from "lottie-react";
import doctorAnimation from "../../public/Animaition/doctor-animation1.json";
import {
  FaCalendarAlt,
  FaUserMd,
  FaHospital,
  FaClock,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import FloatingButton from "../components/FloatingButton";

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.7); }
  70% { box-shadow: 0 0 0 15px rgba(0, 123, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 123, 255, 0); }
`;

const PageWrapper = styled.div`
  background: linear-gradient(135deg, #f5f7fa 0%, #e4f0fb 100%);
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
`;

const HeroSection = styled.section`
  position: relative;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(135deg, rgb(72, 113, 156) 0%, rgb(139, 126, 161) 100%);
  clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
  padding: 0 2rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('/medical-pattern.png') center/cover;
    opacity: 0.1;
  }
`;

const HeroContent = styled.div`
  text-align: center;
  color: white;
  z-index: 2;
  max-width: 800px;
  animation: ${float} 6s ease-in-out infinite;

  h1 {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }
    p {
      font-size: 1rem;
    }
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: -5rem auto 3rem;
  padding: 0 2rem;
  position: relative;
  z-index: 3;
`;

const FeatureCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
  }

  svg {
    font-size: 2.5rem;
    color: #007bff;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
    color: #333;
  }

  p {
    color: #666;
    font-size: 0.95rem;
  }
`;

const AppointmentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto 5rem;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: flex-start;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const FormWrapper = styled.div`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: linear-gradient(to bottom, #007bff, #00b4ff);
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #333;
    position: relative;
    padding-bottom: 1rem;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 3px;
      background: linear-gradient(to right, #007bff, #00b4ff);
    }
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const InfoPanel = styled.div`
  background: linear-gradient(135deg, rgb(174, 200, 225) 0%, rgb(26, 144, 194) 100%);
  border-radius: 20px;
  padding: 3rem;
  color: black;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);

  h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    position: relative;
    padding-bottom: 1rem;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 90px;
      height: 3px;
      background: white;
    }
  }

  ul {
    list-style: none;
    margin: 2rem 0;
  }

  li {
    margin-bottom: 1.5rem;
    display: flex;
    align-items: flex-start;
    gap: 1rem;

    svg {
      font-size: 1.2rem;
      margin-top: 3px;
    }
  }

  .emergency {
    background: white;
    color: rgb(60, 66, 79);
    padding: 1.5rem;
    border-radius: 12px;
    text-align: center;
    margin-top: 2rem;
    animation: ${pulse} 2s infinite;

    h3 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 1.8rem;
      font-weight: bold;
      margin: 0;
    }
  }
`;

const AppointmentList = styled.div`
  margin-top: 2rem;
  background: #fff;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

  h3 {
    margin-bottom: 1rem;
  }

  .appointment-card {
    border-bottom: 1px solid #ddd;
    padding: 1rem 0;

    &:last-child {
      border-bottom: none;
    }

    p {
      margin: 0.3rem 0;
      font-size: 0.95rem;
    }
  }
`;

const LoaderWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, rgb(198, 209, 219) 0%, rgb(33, 185, 250) 100%);
`;

const Appointment = () => {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);
useEffect(() => {
  const fetchAppointments = async () => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        console.error("User not logged in or localStorage is empty.");
        return;
      }

      const userData = JSON.parse(storedUser);
      const patientId = userData?._id;

      if (!patientId) {
        console.error("No patient ID found in user data.");
        return;
      }

      const res = await fetch(
        `https://jainam-hospital-backend.onrender.com/api/v1/appointment/getpatientappointments/${patientId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      console.log("Fetched Data:", data);

      if (data.success && data.appointments) {
        setAppointments(data.appointments);
      } else {
        console.error("No appointments found or API response format is unexpected");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  fetchAppointments();
}, []);



  if (loading) {
    return (
      <LoaderWrapper>
        <Lottie animationData={doctorAnimation} style={{ width: "300px", height: "300px" }} />
      </LoaderWrapper>
    );
  }

  return (
    <PageWrapper>
      <HeroSection>
        <HeroContent>
          <h1>Book Your Appointment</h1>
          <p>Experience world-class healthcare with our expert medical team. Schedule your visit in just a few clicks.</p>
        </HeroContent>
      </HeroSection>

      <FeaturesGrid>
        <FeatureCard>
          <FaCalendarAlt />
          <h3>Easy Scheduling</h3>
          <p>Book appointments 24/7 through our online portal with instant confirmation</p>
        </FeatureCard>
        <FeatureCard>
          <FaUserMd />
          <h3>Expert Doctors</h3>
          <p>Consult with our team of highly qualified and experienced specialists</p>
        </FeatureCard>
        <FeatureCard>
          <FaHospital />
          <h3>Modern Facilities</h3>
          <p>State-of-the-art equipment and comfortable patient care environment</p>
        </FeatureCard>
      </FeaturesGrid>

      <AppointmentContainer>
        <FormWrapper>
          <h2>Appointment Form</h2>
          <AppointmentForm />
        </FormWrapper>

        <InfoPanel>
          <h2>Why Choose Us?</h2>
          <ul>
            <li>
              <FaClock />
              <div>
                <strong>Minimal Wait Times</strong>
                <p>Our efficient system ensures you spend less time waiting</p>
              </div>
            </li>
            <li>
              <FaUserMd />
              <div>
                <strong>100+ Specialists</strong>
                <p>Wide range of medical experts for all your needs</p>
              </div>
            </li>
            <li>
              <FaMapMarkerAlt />
              <div>
                <strong>Convenient Location</strong>
                <p>Central location with ample parking facilities</p>
              </div>
            </li>
          </ul>

          <div className="emergency">
            <h3>EMERGENCY</h3>
            <p><FaPhoneAlt /> Helpline: 1800-123-4567</p>
          </div>
          <div className="emergency">
         <AppointmentList>
  <h3>Your Appointments</h3>
  {appointments.length === 0 ? (
    <p>No appointments found.</p>
  ) : (
    appointments.map((item, index) => (
      <div className="appointment-card" key={item._id}>
        <p><strong>Sr No:</strong> {index + 1}</p>
        <p><strong>Name:</strong> {item.firstName} {item.lastName}</p>
        <p><strong>Doctor:</strong> Dr. {item.doctor.firstName} {item.doctor.lastName}</p>
        <p><strong>Department:</strong> {item.department}</p>
        <p><strong>Appointment Date:</strong> {item.appointment_date}</p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            style={{
              padding: "4px 10px",
              borderRadius: "12px",
              color: "#fff",
              backgroundColor:
                item.status === "pending"
                  ? "#f0ad4e"
                  : item.status === "accepted"
                  ? "#5cb85c"
                  : "#d9534f",
              fontWeight: "bold",
              fontSize: "0.85rem",
              marginLeft: "6px",
            }}
          >
            {item.status.toUpperCase()}
          </span>
        </p>
      </div>
    ))
  )}
</AppointmentList>
            </div>
         
        </InfoPanel>
        
      </AppointmentContainer>
      <FloatingButton/>
    </PageWrapper>
  );
};

export default Appointment;
