import React from "react";
import { motion } from "framer-motion";
import { FaHeartbeat, FaTooth, FaBrain, FaXRay, FaChild, FaStethoscope } from "react-icons/fa";
import { MdArrowForward } from "react-icons/md";

const departments = [
  {
    id: 1,
    title: "Cardiology",
    description: "Expert heart care including diagnostics, surgeries, and rehabilitation.",
    icon: <FaHeartbeat />,
    color: "#FF6B6B",
  },
  {
    id: 2,
    title: "Dentistry",
    description: "Modern dental services from routine checkups to advanced procedures.",
    icon: <FaTooth />,
    color: "#4FD1C5",
  },
  {
    id: 3,
    title: "Neurology",
    description: "Advanced treatment for brain, spine, and nervous system disorders.",
    icon: <FaBrain />,
    color: "#9F7AEA",
  },
  {
    id: 4,
    title: "Radiology",
    description: "High-tech imaging including X-rays, MRIs, CT scans, and ultrasounds.",
    icon: <FaXRay />,
    color: "#F6AD55",
  },
  {
    id: 5,
    title: "Pediatrics",
    description: "Comprehensive child care with compassion and experienced specialists.",
    icon: <FaChild />,
    color: "#48BB78",
  },
  {
    id: 6,
    title: "General Medicine",
    description: "Holistic care for a wide range of health concerns and routine checkups.",
    icon: <FaStethoscope />,
    color: "#4299E1",
  },
   {
    id: 7,
    title: "General Medicine",
    description: "Holistic care for a wide range of health concerns and routine checkups.",
    icon: <FaStethoscope />,
    color: "#4299E1",
  },
   {
    id: 8,
    title: "Pediatrics",
    description: "Comprehensive child care with compassion and experienced specialists.",
    icon: <FaChild />,
    color: "#48BB78",
  },
  
];

const Departments = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="departments-section"
    >
      <div className="background-overlay" />
      <h2 className="section-title">Our Departments</h2>
      <div className="departments-grid">
        {departments.map((dept, index) => (
          <motion.div
            key={dept.id}
            className="department-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="card-header" style={{ backgroundColor: dept.color }}>
              <div className="icon">{dept.icon}</div>
              <h3 className="department-title">{dept.title}</h3>
            </div>
            <div className="card-content">
              <p className="department-description">{dept.description}</p>
              <button className="view-button">
                View More <MdArrowForward />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .departments-section {
          position: relative;
          padding: 6rem 2rem;
          background: linear-gradient(to bottom right, #f0f4f8, #e2e8f0);
          z-index: 1;
        }

        .background-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url("https://images.unsplash.com/photo-1588776814546-1b5caa061c39?auto=format&fit=crop&w=1950&q=80")
            no-repeat center center/cover;
          opacity: 0.07;
          z-index: 0;
        }

        .section-title {
          text-align: center;
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 4rem;
          color: #1e293b;
          background: linear-gradient(to right, #4f46e5, #0ea5e9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .departments-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
          position: relative;
          z-index: 2;
        }

        .department-card {
          background: #ffffff;
          border-radius: 5px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          display: flex;
          flex-direction: column;
        }

        .department-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
        }

        .card-header {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .icon {
          font-size: 2rem;
          color: #ffffff;
        }

        .department-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
        }

        .card-content {
          padding: 1.5rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .department-description {
          font-size: 1rem;
          color: #475569;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .view-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: #e2e8f0;
          color: #0f172a;
          font-size: 0.95rem;
          font-weight: 600;
          padding: 0.6rem 1.2rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .view-button svg {
          transition: transform 0.3s ease;
        }

        .view-button:hover svg {
          transform: translateX(4px);
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 2.2rem;
          }

          .departments-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1.5rem;
          }

          .card-header {
            padding: 1rem;
          }

          .card-content {
            padding: 1rem;
          }

          .view-button {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </motion.section>
  );
};

export default Departments;
