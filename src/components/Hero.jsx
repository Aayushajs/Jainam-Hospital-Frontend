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
    <section style={{
      marginTop: "3.5rem",
      fontFamily: "Poppins, sans-serif",
      padding: "3rem 1rem",
      background: "#f9fafc"
    }}>
      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "2rem"
      }}>
        {/* Left Image Area */}
        <div style={{
          flex: "1 1 500px",
          position: "relative",
          overflow: "hidden",
          borderTopLeftRadius: "30px",
          borderBottomRightRadius: "30px",
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.15)",
          height: "480px"
        }}>
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
                transition: "opacity 1.5s ease-in-out",
                zIndex: currentIndex === index ? 2 : 1,
                filter: "brightness(0.85)"
              }}
            />
          ))}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom right, rgba(0,0,0,0.2), rgba(0,0,0,0.3))",
            zIndex: 3
          }} />
          <div style={{
            position: "absolute",
            bottom: "1rem",
            right: "1rem",
            background: "rgba(255, 255, 255, 0.9)",
            padding: "0.75rem 1.25rem",
            borderRadius: "10px",
            backdropFilter: "blur(6px)",
            fontWeight: 600,
            boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
            zIndex: 4
          }}>
            <span style={{ fontSize: "1.2rem", color: "#0369a1" }}>98%</span><br />
            <small style={{ fontSize: "0.75rem", color: "#475569" }}>Patient Satisfaction</small>
          </div>
        </div>

        {/* Right Text Area */}
        <div style={{
          flex: "1 1 500px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "1.5rem",
          animation: "fadeSlide 1s ease-in-out"
        }}>
          <h1 style={{
            fontSize: "3.2rem",
            fontWeight: "700",
            background: "linear-gradient(to right, #0369a1, #0ea5e9)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            {title}
          </h1>
          <p style={{
            color: "#475569",
            lineHeight: "1.8",
            fontSize: "1.05rem"
          }}>
            <strong style={{ color: "#0369a1" }}>Jainam Hospital</strong> is a trusted name in healthcare — delivering excellence through <strong style={{ color: "#0ea5e9" }}>modern treatment</strong>, <strong style={{ color: "#0ea5e9" }}>advanced facilities</strong>, and <strong style={{ color: "#0ea5e9" }}>personalized care</strong> by expert doctors.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button style={{
              padding: "0.9rem 1.8rem",
              background: "#0369a1",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: "pointer",
              transition: "background 0.3s ease"
            }}
              onMouseOver={(e) => e.currentTarget.style.background = "#0c4a6e"}
              onMouseOut={(e) => e.currentTarget.style.background = "#0369a1"}>
              Book Appointment
            </button>
            <button style={{
              padding: "0.9rem 1.8rem",
              background: "#fff",
              color: "#0369a1",
              border: "2px solid #0369a1",
              borderRadius: "10px",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#0369a1";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.color = "#0369a1";
              }}>
              View Services
            </button>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeSlide {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </section>
  );
};

export default Hero;
