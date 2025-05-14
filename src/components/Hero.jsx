import React, { useEffect, useState } from "react";

const Hero = ({ title }) => {
  const images = [
    "https://static.independent.co.uk/s3fs-public/thumbnails/image/2020/07/10/13/The-Good-Doctor.jpg",
    "https://cdn.cpdonline.co.uk/wp-content/uploads/2022/09/13092522/Becoming-a-hospital-doctor.jpg",
    "https://img.freepik.com/premium-photo/image-doctors-standing-front-hospital-building_160672-10633.jpg",
    "https://img.freepik.com/premium-photo/male-female-doctors-work-together-hospital_118454-16377.jpg",
    "https://www.healthcareers.nhs.uk/sites/default/files/styles/hero_image/public/hero_images/healthcare-scientist-in-x-ray-room.JPG?itok=cE5MnTaY",
    "https://img.freepik.com/premium-photo/healthcare-people-group-professional-doctor-working-hospital-office-clinic-with-other-doctors_763111-415.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section style={{  fontFamily: "Poppins, sans-serif", padding: "3rem 0", background: "linear-gradient(135deg, #f8fcff 0%, #e6f4fe 100%)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "2rem", padding: "0 1.5rem",marginTop: '30px' }}>
        
        {/* Image Container */}
        <div style={{ flex: "1 1 500px", position: "relative", borderBottomRightRadius: "16px", borderTopLeftRadius:"16px", overflow: "hidden", height: "450px", marginTop: '30px', boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)" }}>
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Slide ${index}`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: currentIndex === index ? 1 : 0,
                transition: "opacity 1s ease-in-out",
              }}
            />
          ))}
          <div style={{ position: "absolute", bottom: "1rem", right: "1rem", background: "white", padding: "0.5rem 1rem", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
            <span style={{ fontWeight: 700, fontSize: "1.2rem", color: "#0369a1" }}>98%</span><br />
            <small style={{ fontSize: "0.75rem", color: "#64748b" }}>Patient Satisfaction</small>
          </div>
        </div>

        {/* Text Section with animation */}
        <div style={{
          flex: "1 1 500px",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          animation: "fadeSlide 1s ease-in-out"
        }}>
          <h1 style={{ fontSize: "3rem", fontWeight: "700", color: "#0369a1", animation: "fadeIn 1.2s ease forwards" }}>{title}</h1>
          <p style={{ color: "#334155", lineHeight: 1.7, animation: "fadeIn 1.5s ease forwards" }}>
            <span style={{ color: "#0369a1", fontWeight: 600 }}>Jainam Hospital</span> is recognized as a <span style={{ color: "#0369a1", fontWeight: 600 }}>leading healthcare provider</span>, offering <span style={{ color: "#0369a1", fontWeight: 600 }}>world-class medical services</span> with compassionate care.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", animation: "fadeIn 1.7s ease forwards" }}>
            <button style={{ padding: "0.8rem 1.5rem", background: "#0369a1", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600 }}>
              Book Appointment
            </button>
            <button style={{ padding: "0.8rem 1.5rem", background: "#fff", color: "#0369a1", border: "2px solid #0369a1", borderRadius: "8px", fontWeight: 600 }}>
              View Services
            </button>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeSlide {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </section>
  );
};

export default Hero;
