import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
const AboutUs = () => {
  return (
    <>
      <Hero
        title={"Learn More About Us | ZeeCare Medical Institute"}
        imageUrl={"/about.webp"} // Change the image URL here
      />
      <Biography imageUrl={"/whoweare.png"} />
     
    </>
  );
};

export default AboutUs;
