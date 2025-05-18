import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
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
import { useInView } from "react-intersection-observer";

const Departments = () => {
  const departmentsArray = [
    { 
      name: "Pediatrics", 
      imageUrl: "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      icon: <GiHealthNormal className="department-icon" />,
      color: "#00bcd4",
      description: "Specialized care for infants, children, and adolescents"
    },
    { 
      name: "Orthopedics", 
      imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      icon: <GiBrokenBone className="department-icon" />,
      color: "#ff9800",
      description: "Treatment for musculoskeletal system and sports injuries"
    },
    { 
      name: "Cardiology", 
      imageUrl: "https://images.unsplash.com/photo-1581595219315-a187dd40c322?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      icon: <GiHeartBeats className="department-icon" />,
      color: "#f44336",
      description: "Comprehensive heart care and cardiovascular treatments"
    },
    { 
      name: "Neurology", 
      imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      icon: <GiBrain className="department-icon" />,
      color: "#9c27b0",
      description: "Expert care for brain and nervous system disorders"
    },
    { 
      name: "Pharmacy", 
      imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      icon: <GiMedicinePills className="department-icon" />,
      color: "#673ab7",
      description: "Medication management and pharmaceutical care"
    },
    { 
      name: "Nephrology", 
      imageUrl: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      icon: <GiKidneys className="department-icon" />,
      color: "#2196f3",
      description: "Specialized kidney care and dialysis treatments"
    },
    { 
      name: "Pulmonology", 
      imageUrl: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      icon: <GiLungs className="department-icon" />,
      color: "#4caf50",
      description: "Respiratory system care and lung disease treatment"
    },
    { 
      name: "Ophthalmology", 
      imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      icon: <GiEyeShield className="department-icon" />,
      color: "#ffeb3b",
      description: "Eye care and vision correction services"
    },
    { 
      name: "General Medicine", 
      imageUrl: "https://images.unsplash.com/photo-1551601651-bc60f254d532?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      icon: <GiStethoscope className="department-icon" />,
      color: "#795548",
      description: "Comprehensive care for adults with complex conditions"
    },
  ];

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const controls = useAnimation();
  const containerRef = useRef(null);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <motion.section 
      className="departments-section"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <div className="section-background" />
      
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            <span className="title-gradient">Specialized</span> Medical Departments
          </h2>
          <p className="section-description">
            Comprehensive healthcare services across all major specialties with world-class facilities
          </p>
        </motion.div>

        <div className="departments-grid" ref={containerRef}>
          {departmentsArray.map((department, index) => (
            <motion.div
              key={index}
              className="department-card"
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 40px -10px rgba(0,0,0,0.2)"
              }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className="card-header"
                style={{ backgroundColor: department.color }}
              >
                <div className="card-icon">
                  {department.icon}
                </div>
                <h3>{department.name}</h3>
              </div>
              
              <div className="card-image-container">
                <img 
                  src={department.imageUrl} 
                  alt={department.name} 
                  className="department-image"
                  loading="lazy"
                />
                <div className="image-overlay" />
              </div>
              
              <div className="card-content">
                <p className="department-description">
                  {department.description}
                </p>
                <motion.button 
                  className="view-button"
                  whileHover={{ 
                    backgroundColor: department.color,
                    color: "#fff"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  View Department
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .departments-section {
          position: relative;
          padding: 6rem 1rem;
          overflow: hidden;
          background: #f8fafc;
        }
        
        .section-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80') center/cover;
          opacity: 0.03;
          z-index: 0;
        }
        
        .container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        
        .section-title {
          font-size: 2.8rem;
          margin-bottom: 1.5rem;
          font-weight: 700;
          line-height: 1.2;
          color: #0f172a;
        }
        
        .title-gradient {
          background: linear-gradient(135deg, #0891b2 0%, #0369a1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .section-description {
          color: #64748b;
          font-size: 1.1rem;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }
        
        .departments-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
          padding: 1rem;
        }
        
        .department-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 1;
        }
        
        .card-header {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          color: white;
        }
        
        .card-icon {
          background: rgba(255,255,255,0.2);
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .department-icon {
          font-size: 1.8rem;
        }
        
        .card-header h3 {
          margin: 0;
          font-size: 1.3rem;
          font-weight: 600;
        }
        
        .card-image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        
        .department-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .department-card:hover .department-image {
          transform: scale(1.05);
        }
        
        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to top, rgba(0,0,0,0.3), transparent);
        }
        
        .card-content {
          padding: 1.5rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        
        .department-description {
          color: #64748b;
          margin: 0 0 1.5rem;
          line-height: 1.6;
          font-size: 0.95rem;
        }
        
        .view-button {
          margin-top: auto;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #0369a1;
          font-weight: 600;
          background: rgba(3, 105, 161, 0.1);
          border: none;
          border-radius: 8px;
          cursor: pointer;
          padding: 0.8rem 1.2rem;
          transition: all 0.3s ease;
          align-self: flex-start;
        }
        
        .view-button svg {
          transition: transform 0.3s ease;
        }
        
        .view-button:hover svg {
          transform: translateX(3px);
        }
        
        @media (max-width: 1024px) {
          .departments-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          }
          
          .section-title {
            font-size: 2.4rem;
          }
        }
        
        @media (max-width: 768px) {
          .departments-section {
            padding: 4rem 1rem;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .section-description {
            font-size: 1rem;
          }
          
          .departments-grid {
            grid-template-columns: 1fr;
            max-width: 500px;
            margin: 0 auto;
          }
        }
        
        @media (max-width: 480px) {
          .section-title {
            font-size: 1.8rem;
          }
          
          .card-header {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
          }
          
          .card-header h3 {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </motion.section>
  );
};

export default Departments;