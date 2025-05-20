import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import MessageForm from "../components/MessageForm";
import Departments from "../components/Departments";
import FloatingButton from "../components/FloatingButton.jsx";
import FloatingButton2 from "../components/FloatingButton2.jsx";
import CTA from "../components/CTA.jsx";

import { Box, useTheme, useMediaQuery, Skeleton } from "@mui/material";

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ overflowX: "hidden", backgroundColor: "#f9f9f9" }}>
      {/* Hero Section */}
      {loading ? (
        <Skeleton variant="rectangular" height={isMobile ? 300 : 500} animation="wave" />
      ) : (
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
      )}

      {/* Biography Section */}
      {loading ? (
        <Box sx={{ p: 4 }}>
          <Skeleton height={40} width="60%" />
          <Skeleton height={20} width="80%" />
          <Skeleton height={20} width="70%" />
          <Skeleton height={20} width="90%" />
        </Box>
      ) : (
        <Biography
          title="About Jainam Medical Institute"
          content="Founded in 2005, Jainam has been providing exceptional healthcare services to our community. Our team of board-certified physicians and healthcare professionals are committed to delivering personalized care using the latest medical technologies."
          reverse={isMobile ? false : true}
        />
      )}

      {/* Departments Section */}
      {loading ? (
        <Box sx={{ px: 3, py: 6, display: "grid", gap: 4, gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr" }}>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} variant="rectangular" height={220} animation="wave" sx={{ borderRadius: 3 }} />
          ))}
        </Box>
      ) : (
        <Departments
          title="Our Specialized Departments"
          ctaText="View All Departments"
          ctaLink="/departments"
        />
      )}

      <FloatingButton />
      <FloatingButton2 />

      {/* CTA Section */}
      {loading ? (
        <Box sx={{ px: 4, py: 5 }}>
          <Skeleton width="40%" height={40} />
          <Skeleton width="60%" height={20} />
          <Skeleton width={140} height={36} sx={{ mt: 2 }} />
        </Box>
      ) : (
        <CTA
          title="Ready to Experience Better Healthcare?"
          subtitle="Schedule your appointment today"
          primaryButtonText="Book Now"
          primaryButtonLink="/appointment"
          secondaryButtonText="Learn More"
          secondaryButtonLink="/about"
        />
      )}

      {/* Message Form Section */}
      {loading ? (
        <Box sx={{ px: 4, py: 4 }}>
          <Skeleton width="40%" height={35} />
          <Skeleton width="60%" height={20} />
          <Skeleton height={40} sx={{ my: 1 }} />
          <Skeleton height={40} sx={{ my: 1 }} />
          <Skeleton height={100} sx={{ my: 1 }} />
          <Skeleton width={100} height={36} />
        </Box>
      ) : (
        <MessageForm
          title="Have Questions? Contact Us"
          subtitle="Our team is here to help with any inquiries"
        />
      )}
    </Box>
  );
};

export default Home;
