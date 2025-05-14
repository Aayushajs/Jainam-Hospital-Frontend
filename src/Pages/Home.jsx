  import React from "react";
  import Hero from "../components/Hero";
  import Biography from "../components/Biography";
  import MessageForm from "../components/MessageForm";
  import Departments from "../components/Departments";


  import CTA from "../components/CTA.jsx";
  import { Box, useTheme, useMediaQuery } from "@mui/material";

  const Home = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
      <Box sx={{ overflowX: "hidden", backgroundColor: "#f9f9f9" }}>
        {/* Hero Section */}
        <Hero
          title={
            <span style={{ fontWeight: 700, fontSize: "3rem", color: "#3c6e71" }}>
              Quality Healthcare <br /> Made Accessible
            </span>
          }
          subtitle="Compassionate care for you and your family"
          imageUrl={"/hero.png"}
          ctaText="Book an Appointment"
          ctaLink="/appointment"
          fullHeight={true}
        />

       

        {/* Biography Section */}
        <Biography   
          title="About Jainam Medical Institute"
          content="Founded in 2005, Jainam has been providing exceptional healthcare services to our community. Our team of board-certified physicians and healthcare professionals are committed to delivering personalized care using the latest medical technologies."
          reverse={isMobile ? false : true}
        />

        {/* Services Section */}
        

        {/* Departments Section */}
        <Departments
          title="Our Specialized Departments"
          ctaText="View All Departments"
          ctaLink="/departments"
        />

      
        {/* CTA Section */}
        <CTA
          title="Ready to Experience Better Healthcare?"
          subtitle="Schedule your appointment today"
          primaryButtonText="Book Now"
          primaryButtonLink="/appointment"
          secondaryButtonText="Learn More"
          secondaryButtonLink="/about"
        />

        {/* Message Form Section */}
        <MessageForm 
          title="Have Questions? Contact Us"
          subtitle="Our team is here to help with any inquiries"
        />
      </Box>
    );
  };

  export default Home;
