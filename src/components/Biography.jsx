import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Biography = () => {
  const [currentMember, setCurrentMember] = useState(0);

  const teamMembers = [
    { name: "Dr. Ramesh Patel", position: "Chief Medical Officer", rating: 5 },
    { name: "Dr. Chanchal Jain", position: "Head of Cardiology", rating: 4.5 },
    { name: "Dr. Priya Sharma", position: "Neurology Specialist", rating: 4 },
    { name: "Dr. Ankita Sinha", position: "Pediatrician", rating: 5 },
    { name: "Dr. Neha Gupta", position: "Orthopedic Surgeon", rating: 4.5 },
  ];

  // Star Rating Component
  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="star-rating">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="star full">★</span>
        ))}
        {hasHalfStar && <span className="star half">★</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="star empty">★</span>
        ))}
        <span className="rating-text">{rating.toFixed(1)}</span>
      </div>
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMember((prev) => (prev + 1) % teamMembers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bio-section">
      {/* ... (previous content remains the same) ... */}

      <motion.div
        className="team-carousel-single"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        <h3 className="team-title">Meet Our Experts</h3>
        <div className="carousel-container">
          <div className="carousel-track">
            {[...teamMembers, ...teamMembers].map((member, index) => (
              <div className="single-card" key={index}>
                <motion.img
                  src={[
                    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1064&q=80",
                    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                    "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrwNoqM-WSRKCAu1iPCkElXkEw_BLgy-cNJA&s",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfF1vhJj74ed9Er-t9XsiWWLC0BPprqpZAuA&s",
                  ][index % 5]}
                  alt={member.name}
                  className="single-img"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <h4 className="single-name">{member.name}</h4>
                <p className="single-position">{member.position}</p>
                <StarRating rating={member.rating} />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .bio-section {
            padding: 3rem 1.5rem;
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

          .carousel-container {
            overflow: hidden;
            width: 100%;
            
          }

          .carousel-track {
            display: flex;
            gap: 4rem;
            margin-top: 0.5rem;
            animation: scrollLeft 40s linear infinite;
          }

          @keyframes scrollLeft {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
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

          @media (max-width: 768px) {
            .bio-content {
              flex-direction: column;
              gap: 3rem;
            }

            .bio-heading {
              font-size: 2rem;
            }

            .carousel-track {
              gap: 2rem;
              animation: scrollLeft 30s linear infinite;
            }

            .single-img {
              width: 160px;
              height: 160px;
            }
          }

        .star-rating {
          display: flex;
          align-items: center;
          margin-top: 0.3rem;
        }

        .star {
          font-size: 1.2rem;
          color: #e2e8f0; /* Default empty star color */
          position: relative;
        }

        .star.full {
          color: #fbbf24; /* Full star color (yellow) */
        }

        .star.half {
          color: #fbbf24; /* Half star color (yellow) */
        }

        .star.half:before {
          content: '★';
          position: absolute;
          left: 0;
          width: 50%;
          overflow: hidden;
          color: #fbbf24;
        }

        .star.half:after {
          content: '★';
          position: absolute;
          left: 0;
          width: 100%;
          color: #e2e8f0;
          z-index: -1;
        }

        .rating-text {
          margin-left: 0.5rem;
          font-size: 0.9rem;
          color: #64748b;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .star {
            font-size: 1rem;
          }
          .rating-text {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Biography;