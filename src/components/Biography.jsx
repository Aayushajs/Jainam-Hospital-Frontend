import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Biography = () => {
  const [currentMember, setCurrentMember] = useState(0);

  const teamMembers = [
    { name: "Dr. Ramesh Patel", position: "Chief Medical Officer" },
    { name: "Dr. Chanchal Jain", position: "Head of Cardiology" },
    { name: "Dr. Priya Sharma", position: "Neurology Specialist" },
    { name: "Dr. Ankita Sinha", position: "Pediatrician" },
    { name: "Dr. Neha Gupta", position: "Orthopedic Surgeon" },
    
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMember((prev) => (prev + 1) % teamMembers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bio-section">
      <div className="bio-content">
        <motion.div
          className="bio-left"
          initial={{ opacity: 0, x: -100, rotateY: -30 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src="https://gaelanmedicalcare.com/wp-content/uploads/2023/08/General-Surgfery-.jpg"
            alt="Hospital"
            className="bio-image"
          />
          <motion.div
            className="floating-tag"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            Since 2005
          </motion.div>
        </motion.div>

        <motion.div
          className="bio-right"
          initial={{ opacity: 0, x: 100, rotateY: 30 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="bio-heading">Who We Are</h2>
          <p className="bio-description">
            <strong>Jainam Hospital</strong> is a state-of-the-art medical
            facility offering compassionate, patient-centered healthcare. With
            cutting-edge technology and a dedicated medical team, we ensure
            top-quality service for every patient.
          </p>
          <p className="bio-description">
            Established in 2005, Jainam Hospital has grown into one of the most
            trusted names in advanced healthcare. Our mission is to deliver
            world-class treatment with compassion, innovation, and integrity.
          </p>
          <ul className="bio-features">
            <li><strong>✔️ Modern Infrastructure</strong></li>
            <li><strong>✔️ Advanced Diagnosis</strong></li>
            <li><strong>✔️ 24/7 Emergency Response</strong></li>
            <li><strong>✔️ Personalized Care Plans</strong></li>
          </ul>
        </motion.div>
      </div>

      <motion.div
        className="team-carousel-single"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        <h3 className="team-title">Meet Our Experts</h3>
        <div className="carousel-wrapper">
          {teamMembers.map((member, index) => (
            <div className="single-card" key={index}>
              <motion.img
                src={[
                  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1064&q=80",
                  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                  "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80",
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrwNoqM-WSRKCAu1iPCkElXkEw_BLgy-cNJA&s",
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfF1vhJj74ed9Er-t9XsiWWLC0BPprqpZAuA&s",
                ][index]}
                alt={member.name}
                className="single-img"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              />
              <h4 className="single-name">{member.name}</h4>
              <p className="single-position">{member.position}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <style jsx>{`
        .bio-section {
          padding: 5rem 1.5rem;
          background: #f0f4f8;
          font-family: "Segoe UI", sans-serif;
        }

        .bio-content {
          display: flex;
          gap: 4rem;
          justify-content: center;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          flex-wrap: wrap;
        }

        .bio-left {
          flex: 1;
          position: relative;
        }

        .bio-image {
          width: 100%;
          border-radius: 10px;
          box-shadow: 0 20px 30px rgba(0, 0, 0, 0.12);
        }

        .floating-tag {
          position: absolute;
          bottom: 2rem;
          left: 2rem;
          background: white;
          color: #0ea5e9;
          padding: 0.7rem 1.4rem;
          font-weight: 600;
          border-radius: 999px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
        }

        .bio-right {
          flex: 1;
          text-align: left;
        }

        .bio-heading {
          font-size: 2.5rem;
          background: linear-gradient(to right, #0284c7, #0ea5e9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 700;
        }

        .bio-description {
          margin-top: 1rem;
          font-size: 1.1rem;
          color: #475569;
        }

        .bio-features {
          margin-top: 1.5rem;
          list-style: none;
          padding-left: 0;
          color: #334155;
          font-size: 1rem;
        }

        .bio-features li {
          margin-bottom: 0.8rem;
        }

        .team-carousel-single {
          margin-top: 5rem;
          text-align: center;
        }

        .team-title {
          font-size: 2rem;
          margin-bottom: 2rem;
          color: #0f172a;
        }

        .carousel-wrapper {
          display: flex;
          justify-content: center;
         
          gap: 4rem;
        }

        .single-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          min-width: 200px;
        }

        .single-img {
          width: 200px;
          height: 200px;
          object-fit: cover;
          border-radius: 90%;
          animation: glowBorder 3s ease-in-out infinite;
        }

        .single-name {
          margin-top: 0.5rem;
          font-size: 1.2rem;
          font-weight: 600;
          color: #1e293b;
        }

        .single-position {
          color: #64748b;
          font-size: 0.95rem;
        }

        @keyframes glowBorder {
          0% {
            box-shadow: 0 0 0px rgba(14, 165, 233, 0.4);
          }
          50% {
            box-shadow: 0 0 20px rgba(14, 165, 233, 0.8);
          }
          100% {
            box-shadow: 0 0 0px rgba(14, 165, 233, 0.4);
          }
        }

        @keyframes floatMobile {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(12px);
          }
          100% {
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .bio-content {
            flex-direction: column;
            gap: 3rem;
          }

          .bio-heading {
            font-size: 2rem;
          }

          .carousel-wrapper {
            display: flex;

            overflow-x: auto;
           scroll-snap-type: y mandatory;
            -webkit-overflow-scrolling: touch;
            gap: 1.2rem;
            padding: 0 1rem;
          }

          .single-card {
          display: flex;
            scroll-snap-align: start;
          }

          .single-img {
            width: 160px;
            
            height: 160px;
            animation: floatMobile 3s ease-in-out infinite;
          }
        }
      `}</style>
    </section>
  );
};

export default Biography;
