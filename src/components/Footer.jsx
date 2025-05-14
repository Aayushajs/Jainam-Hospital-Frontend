import React from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const hours = [
    { id: 1, day: "Monday", time: "9:00 AM - 11:00 PM" },
    { id: 2, day: "Tuesday", time: "12:00 PM - 12:00 AM" },
    { id: 3, day: "Wednesday", time: "10:00 AM - 10:00 PM" },
    { id: 4, day: "Thursday", time: "9:00 AM - 9:00 PM" },
    { id: 5, day: "Friday", time: "3:00 PM - 9:00 PM" },
    { id: 6, day: "Saturday", time: "9:00 AM - 3:00 PM" },
  ];

  return (
    <footer className="footer-container">
      <hr />
      <div className="footer-content">
        <div className="footer-logo">
          <img
            src="https://us.123rf.com/450wm/pxlprostudio/pxlprostudio1904/pxlprostudio190402441/120661762-building-icon-on-background-for-graphic-and-web-design-simple-vector-sign-internet-concept-symbol.jpg?ver=6"
            alt="logo"
            className="footer-logo-img"
          />
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/" className="footer-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/appointment" className="footer-link">
                Appointment
              </Link>
            </li>
            <li>
              <Link to="/about" className="footer-link">
                About
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-hours">
          <h4>Hours</h4>
          <ul>
            {hours.map((element) => (
              <li key={element.id} className="footer-hour-item">
                <span className="footer-day">{element.day}</span>
                <span className="footer-time">{element.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <div className="footer-contact-item">
            <FaPhone />
            <span>9302633269</span>
          </div>
          <div className="footer-contact-item">
            <MdEmail />
            <span>Jainam@gmail.com</span>
          </div>
          <div className="footer-contact-item">
            <FaLocationArrow />
            <span>Raipur, India</span>
          </div>
        </div>
      </div>

      <style>{`
        .footer-container {
          background: linear-gradient(135deg, #1c1c1c, #333);
          color: #fff;
          padding: 3rem 1rem;
          font-family: 'Roboto', sans-serif;
        }

        .footer-container hr {
          border: 1px solid #444;
          margin-bottom: 2rem;
        }

        .footer-content {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 2rem;
        }

        .footer-logo,
        .footer-links,
        .footer-hours,
        .footer-contact {
          flex: 1;
          min-width: 220px;
        }

        .footer-logo-img {
          width: 100%;
          max-width: 180px;
          height: auto;
          display: block;
          margin-bottom: 1.5rem;
          transition: transform 0.3s ease;
        }

        .footer-logo-img:hover {
          transform: scale(1.05);
        }

        h4 {
          font-size: 1.3rem;
          margin-bottom: 1rem;
        }

        .footer-links ul,
        .footer-hours ul {
          list-style: none;
          padding: 0;
        }

        .footer-link {
          color: #f5a623;
          text-decoration: none;
          display: block;
          margin-bottom: 0.5rem;
          transition: color 0.3s ease;
        }

        .footer-link:hover {
          color: #fff;
          transform: translateX(5px);
        }

        .footer-hour-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.95rem;
          margin-bottom: 0.4rem;
        }

        .footer-day {
          font-weight: 600;
        }

        .footer-time {
          color: #ccc;
        }

        .footer-contact-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
          font-size: 1rem;
        }

        .footer-contact-item svg {
          color: #f5a623;
          font-size: 1.2rem;
        }

        .footer-contact-item span {
          color: #f5a623;
        }

        /* Responsive for mobile */
        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
            align-items: flex-start;
          }

          .footer-logo-img {
            margin: 0 auto 1.5rem;
            max-width: 120px;
          }

          .footer-contact-item {
            font-size: 0.95rem;
          }

          .footer-hour-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 2px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
