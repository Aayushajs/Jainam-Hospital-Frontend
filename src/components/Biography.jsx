import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Biography = ({
  imageUrl1 = "https://gaelanmedicalcare.com/wp-content/uploads/2023/08/General-Surgfery-.jpg"
}) => {
  const [currentMember, setCurrentMember] = useState(0);

  const teamMembers = [
    {
      name: "Dr. Ramesh Patel",
      position: "Chief Medical Officer",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      name: "Dr. Priya Sharma",
      position: "Head of Cardiology",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80"
    },
    {
      name: "Dr. Amit Singh",
      position: "Neurology Specialist",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1064&q=80"
    },
    {
      name: "Dr. Neha Gupta",
      position: "Pediatrician",
      image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMember((prev) => (prev + 1) % teamMembers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="biography-section">
      <div className="biography-container">
        {/* Image Banner with Animation */}
        <motion.div
          className="image-banner"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src={imageUrl1} alt="Our Hospital" />
          <div className="image-overlay"></div>
          <motion.div
            className="floating-badge"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span>Since 2005</span>
          </motion.div>
         
        </motion.div>
         
        {/* Content Banner */}
        <motion.div
          className="content-banner"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="section-subtitle">Biography</p>
          <h2 className="section-title">Who We Are</h2>

          <motion.div
            className="content-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p>
              <span className="highlight">Jainam Hospital</span> is a
              state-of-the-art healthcare facility committed to providing
              comprehensive and compassionate medical services to patients.
              Located in a convenient and accessible area, Jainam Hospital is
              renowned for its modern infrastructure, highly skilled medical
              professionals, and patient-centric approach.
            </p>

            <div className="features-grid">
              <div className="feature-item">
            
                <h4>Cutting-Edge Technology</h4>
                <p>
                  Equipped with the latest medical technologies for accurate
                  diagnosis and treatment
                </p>
              </div>

              <div className="feature-item">
               
                <h4>Expert Medical Team</h4>
                <p>Experienced doctors and nurses dedicated to quality care</p>
              </div>

              <div className="feature-item">

                <h4>Patient-Centered</h4>
                <p>
                  Personalized treatment plans tailored to individual needs
                </p>
              </div>

              <div className="feature-item">
              
                <h4>24/7 Emergency</h4>
                <p>Round-the-clock emergency services for critical care</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Team Members Carousel */}
      <div className="team-section">
        <h3 className="team-title">Meet Our Specialists</h3>
        <div className="team-carousel">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className={`team-member ${
                index === currentMember ? "active" : ""
              }`}
              initial={{ opacity: 0 }}
              animate={{
                opacity: index === currentMember ? 1 : 0.5,
                scale: index === currentMember ? 1.05 : 0.95
              }}
              transition={{ duration: 0.5 }}
              onClick={() => setCurrentMember(index)}
            >
              <div className="member-image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="member-info">
                <h4>{member.name}</h4>
                <p>{member.position}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="team-indicators">
          {teamMembers.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentMember ? "active" : ""}`}
              onClick={() => setCurrentMember(index)}
              aria-label={`View ${teamMembers[index].name}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .biography-section {
          padding: 4rem 1rem;
          background: #f8fafc;
        }

        .biography-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }

        .image-banner {
          position: relative;
          height: 500px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          margin-top: -120px;
        }

        .image-banner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to top, rgba(3, 105, 161, 0.7), transparent);
        }

        .floating-badge {
          position: absolute;
          bottom: 6rem;
          left: 2rem;
          background: white;
          padding: 0.8rem 1.5rem;
          border-radius: 50px;
          font-weight: 600;
          color: #0369a1;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          z-index: 10;
        }

        .image-caption {
          position: absolute;
          bottom: 1.5rem;
          left: 1rem;
          right: 1rem;
          background: rgba(255, 255, 255, 0.85);
          padding: 1rem 1.5rem;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
          color: #0f172a;
          font-size: 0.95rem;
          line-height: 1.6;
          backdrop-filter: blur(4px);
          z-index: 5;
        }

        .image-caption p {
          margin: 0.2rem 0;
          font-weight: 500;
        }

        .content-banner {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .section-subtitle {
          color: #0369a1;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.9rem;
        }

        .section-title {
          font-size: 2.5rem;
          color: #0f172a;
          margin: 0;
          background: linear-gradient(to right, #0369a1, #0284c7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .content-text {
          color: #334155;
          line-height: 1.7;
        }

        .highlight {
          color: #0369a1;
          font-weight: 600;
        }

        .features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .feature-item {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .feature-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .feature-icon {
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
        }

        .feature-item h4 {
          color: #0369a1;
          margin: 0.5rem 0;
        }

        .feature-item p {
          font-size: 0.9rem;
          color: #64748b;
          margin: 0;
        }

        .team-section {
          max-width: 1200px;
          margin: 4rem auto 0;
          padding: 0 1rem;
        }

        .team-title {
          text-align: center;
          font-size: 2rem;
          color: #0f172a;
          margin-bottom: 2rem;
        }

        .team-carousel {
          display: flex;
          gap: 1.5rem;
          overflow-x: auto;
          padding: 1rem 0;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
        }

        .team-carousel::-webkit-scrollbar {
          display: none;
        }

        .team-member {
          scroll-snap-align: center;
          min-width: 250px;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .team-member.active {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .member-image {
          height: 300px;
          overflow: hidden;
        }

        .member-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .team-member:hover .member-image img {
          transform: scale(1.1);
        }

        .member-info {
          padding: 1.5rem;
          text-align: center;
        }

        .member-info h4 {
          margin: 0;
          color: #0f172a;
        }

        .member-info p {
          margin: 0.5rem 0 0;
          color: #64748b;
          font-size: 0.9rem;
        }

        .team-indicators {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1.5rem;
        }

        .indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #cbd5e1;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .indicator.active {
          background: #0369a1;
          transform: scale(1.2);
        }

        @media (max-width: 768px) {
          .biography-container {
            grid-template-columns: 1fr;
          }

          .image-banner {
            height: 350px;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .section-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Biography;
