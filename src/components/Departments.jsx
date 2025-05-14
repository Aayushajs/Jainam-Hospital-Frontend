import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  GiMedicinePills,
  GiStethoscope,
  GiHealthNormal,
  GiBrain,
  GiHeartBeats,
  GiBrokenBone,
  GiKidneys,
  GiEyeShield,
  GiLungs
} from "react-icons/gi";

const Departments = () => {
  const departmentsArray = [
    { 
      name: "Pediatrics", 
      imageUrl: "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      icon: <GiHealthNormal className="department-icon" />,
      color: "#00bcd4"
    },
    { 
      name: "Orthopedics", 
      imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      icon: <GiBrokenBone className="department-icon" />,
      color: "#ff9800"
    },
    { 
      name: "Cardiology", 
      imageUrl: "https://st2.depositphotos.com/5653638/11526/i/950/depositphotos_115267274-stock-photo-indian-doctor-woman-smile-with.jpg",
      icon: <GiHeartBeats className="department-icon" />,
      color: "#f44336"
    },
    { 
      name: "Neurology", 
      imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      icon: <GiBrain className="department-icon" />,
      color: "#9c27b0"
    },
    { 
      name: "Pharmacy", 
      imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      icon: <GiMedicinePills className="department-icon" />,
      color: "#673ab7"
    },
    { 
      name: "Nephrology", 
      imageUrl: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      icon: <GiKidneys className="department-icon" />,
      color: "#2196f3"
    },
    { 
      name: "Pulmonology", 
      imageUrl: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      icon: <GiLungs className="department-icon" />,
      color: "#4caf50"
    },
    { 
      name: "Ophthalmology", 
      imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      icon: <GiEyeShield className="department-icon" />,
      color: "#ffeb3b"
    },
    { 
      name: "General Medicine", 
      imageUrl: "https://images.unsplash.com/photo-1551601651-bc60f254d532?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      icon: <GiStethoscope className="department-icon" />,
      color: "#795548"
    },
  ];

  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    
    if (!container || !content) return;

    const contentWidth = content.scrollWidth / 2;
    const duration = contentWidth * 20; // Adjust speed here

    // Clone items for seamless looping
    content.innerHTML += content.innerHTML;

    let animation;
    let startTime;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed / duration) % 1;
      
      content.style.transform = `translateX(-${progress * contentWidth}px)`;
      animation = requestAnimationFrame(animate);
    };

    animation = requestAnimationFrame(animate);

    // Pause on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animation);
    };

    const handleMouseLeave = () => {
      startTime = null;
      animation = requestAnimationFrame(animate);
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animation);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="departments-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Medical Departments</h2>
          <p className="section-description">
            Comprehensive healthcare services across all major specialties
          </p>
        </div>

        <div className="scrolling-container" ref={containerRef}>
          <div className="scrolling-content" ref={contentRef}>
            {departmentsArray.map((department, index) => (
              <motion.div 
                key={index}
                className="department-card"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <div className="card-icon" style={{ backgroundColor: department.color }}>
                  {department.icon}
                </div>
                <div className="card-content">
                  <h3>{department.name}</h3>
                  <img 
                    src={department.imageUrl} 
                    alt={department.name} 
                    className="department-image"
                    loading="lazy"
                  />
                  <button className="view-button">
                    Learn More
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .departments-section {
          padding: 0rem 0rem;
          background: #f8fafc;
          overflow: hidden;
        }
        
        .container {
          max-width: 200%;
          margin: 0 auto;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .section-title {
          font-size: 2.5rem;
          color: #0f172a;
          margin-bottom: 1rem;
          font-weight: 700;
          background: linear-gradient(to right, #0369a1, #0284c7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .section-description {
          color: #64748b;
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .scrolling-container {
          width: 100%;
          overflow: hidden;
          position: relative;
          padding: 1rem 0;
        }
        
        .scrolling-content {
          display: flex;
          gap: 2rem;
          will-change: transform;
          width: max-content;
        }
        
        .department-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          min-width: 300px;
          flex-shrink: 0;
        }
        
        .card-icon {
          padding: 1.5rem;
          display: flex;
          justify-content: center;
          color: white;
        }
        
        .department-icon {
          font-size: 3rem;
        }
        
        .card-content {
          padding: 1.5rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        
        .card-content h3 {
          margin: 0 0 1rem;
          color: #0f172a;
          font-size: 1.3rem;
        }
        
        .department-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 1.5rem;
        }
        
        .view-button {
          margin-top: auto;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #0369a1;
          font-weight: 600;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem 0;
          transition: all 0.3s ease;
        }
        
        .view-button:hover {
          color: #0284c7;
        }
        
        .view-button svg {
          transition: transform 0.3s ease;
        }
        
        .view-button:hover svg {
          transform: translateX(3px);
        }
        
        @media (max-width: 900px) {
          .section-title {
            font-size: 2rem;
          }
          
          .department-card {
            min-width: 280px;
          }
        }
        
        @media (max-width: 600px) {
          .departments-section {
            padding: 3rem 1rem;
          }
          
          .section-title {
            font-size: 1.8rem;
          }
          
          .department-card {
            min-width: 260px;
          }
          
          .department-image {
            height: 150px;
          }
        }
      `}</style>
    </section>
  );
};

export default Departments;