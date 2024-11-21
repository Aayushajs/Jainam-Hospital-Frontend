import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
            Jainam Hospital is a state-of-the-art healthcare facility committed
            to providing comprehensive and compassionate medical services to
            patients. Located in a convenient and accessible area, Jainam
            Hospital is renowned for its modern infrastructure, highly skilled
            medical professionals, and patient-centric approach.
          </p>
          <p>We are all in 2024!</p>
          <p>We are working on a MERN STACK PROJECT.</p>
          <p>
            Cutting-Edge Technology: Equipped with the latest medical
            technologies and diagnostic tools to ensure accurate and efficient
            treatment. Expert Medical Team: Jainam Hospital boasts a team of
            experienced doctors, nurses, and support staff dedicated to
            delivering quality care. Patient-Centered Approach: Comfortable and
            hygienic patient rooms. Personalized treatment plans tailored to
            individual needs. 24/7 emergency services. Focus on Wellness: Offers
            preventive healthcare programs, regular health check-ups, and
            awareness campaigns to promote a healthy lifestyle. Accessible and
            Affordable Care: Combines high standards of medical care with
            affordability, ensuring services are accessible to all sections of
            society.
          </p>
          <p>Lorem ipsum dolor sit amet!</p>
          <p>Coding is fun!</p>
        </div>
      </div>
    </>
  );
};

export default Biography;
