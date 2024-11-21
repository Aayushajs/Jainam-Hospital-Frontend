import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
          Jainam Hospital is a premier healthcare institution dedicated to delivering exceptional medical services with a focus on quality, compassion, and innovation. Renowned for its cutting-edge infrastructure and advanced technology, the hospital caters to a wide range of specialties, including pediatrics, cardiology, neurology, orthopedics, and oncology, among others. With a team of highly skilled doctors and compassionate staff, Jainam Hospital ensures personalized care for every patient, fostering trust and comfort throughout their healthcare journey. The hospital is committed to accessibility and affordability, making world-class medical services available to all. By prioritizing preventive care, wellness programs, and continuous medical advancements, Jainam Hospital strives to be a beacon of hope and healing in the community, redefining the standards of modern healthcare.
          </p>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;
