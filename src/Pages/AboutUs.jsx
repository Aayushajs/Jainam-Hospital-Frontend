import React from "react";
import { Box, Container, Typography, Grid, Avatar, useTheme } from "@mui/material";
import Hero from "../components/Hero";
import CTA from "../components/CTA";
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from '@mui/lab';
import { CheckCircle, LocalHospital, People, Science } from "@mui/icons-material";

// Create styled components with default values
const AboutSection = ({ children, bgColor = 'background.default' }) => (
  <Box component="section" sx={{
    py: { xs: 6, md: 10 },
    backgroundColor: (theme) => theme.palette[bgColor]?.main || theme.palette.background.default,
  }}>
    {children}
  </Box>
);

const MissionSection = ({ children }) => {
  const theme = useTheme();
  return (
    <Box component="section" sx={{
      py: { xs: 6, md: 10 },
      background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
      color: '#ffffff',
      position: 'relative',
      overflow: 'hidden',
      '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'radial-gradient(circle at 75% 30%, rgba(255,255,255,0.1) 0%, transparent 20%)',
      }
    }}>
      {children}
    </Box>
  );
};

const ValueCard = ({ icon, title, description }) => {
  const theme = useTheme();
  return (
    <Box sx={{
      backgroundColor: 'rgba(255,255,255,0.08)',
      p: 4,
      borderRadius: 2,
      height: '100%',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(255,255,255,0.1)',
      backdropFilter: 'blur(5px)',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: `0 15px 30px -5px ${theme.palette.primary.dark}`,
        backgroundColor: 'rgba(255,255,255,0.15)'
      }
    }}>
      <Avatar sx={{ 
        bgcolor: 'rgba(255,255,255,0.2)', 
        width: 60, 
        height: 60,
        mb: 3
      }}>
        {icon}
      </Avatar>
      <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ opacity: 0.9 }}>
        {description}
      </Typography>
    </Box>
  );
};

const AboutUs = () => {
  const theme = useTheme();
  
  const values = [
    {
      title: "Compassion",
      description: "We treat every patient with empathy, dignity, and respect, creating a healing environment that addresses both physical and emotional needs.",
      icon: <People fontSize="large" />
    },
    {
      title: "Excellence",
      description: "Our team of board-certified specialists delivers the highest standard of care through continuous learning and evidence-based practices.",
      icon: <CheckCircle fontSize="large" />
    },
    {
      title: "Innovation",
      description: "We integrate cutting-edge technology and research to provide advanced treatments and improve patient outcomes.",
      icon: <Science fontSize="large" />
    }
  ];

  const milestones = [
    { year: "2005", event: "Founded as a small community clinic" },
    { year: "2010", event: "Expanded to full-service medical center" },
    { year: "2015", event: "Achieved JCI accreditation" },
    { year: "2020", event: "Opened state-of-the-art research wing" },
    { year: "2023", event: "Recognized as regional leader in patient care" }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Hero
        title="About Jainam Medical Institute"
        subtitle="Where compassionate care meets medical excellence"
        imageUrl="/about-hero.jpg"
        height="70vh"
        overlayColor="rgba(0, 0, 0, 0.4)"
        textAlign="center"
        titleVariant="h1"
        subtitleVariant="h4"
      />

      {/* About Section */}
      <AboutSection>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <Typography variant="h3" component="h2" gutterBottom sx={{ 
                fontWeight: 700,
                color: 'primary.main',
                mb: 4,
                position: 'relative',
                   overflow:'hidden',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: '80px',
                  height: '4px',
                  backgroundColor: theme.palette.secondary.main,
                  borderRadius: 2,
                  overflow:'hidden'
                }
              }}>
                Our Story
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 3 }}>
                Founded in 2005, Jainam Medical Institute began as a small community clinic with a vision to transform healthcare through compassionate, patient-centered care.
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                Today, we've grown into a regional leader in medical excellence, serving over 50,000 patients annually with a team of 200+ dedicated healthcare professionals.
              </Typography>
              
              <Box sx={{ mt: 6 }}>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                  Our Journey
                </Typography>
                <Timeline position="alternate">
                  {milestones.map((item, index) => (
                    <TimelineItem key={index}>
                      <TimelineSeparator>
                        <TimelineDot color="primary" variant="outlined" />
                        {index < milestones.length - 1 && <TimelineConnector />}
                      </TimelineSeparator>
                      <TimelineContent>
                        <Box sx={{ p: 2, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 2 }}>
                          <Typography variant="subtitle1" fontWeight="bold">{item.year}</Typography>
                          <Typography variant="body2">{item.event}</Typography>
                        </Box>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }} sx={{ position: 'relative',   overflow:'hidden' }}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Jainam Medical Institute"
                sx={{ 
                  width: '90%', 
                  borderRadius: 4, 
                  boxShadow: 6,
                  overflow:'hidden',
                  transform: 'rotate(1deg)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'rotate(0deg)',
                       overflow:'hidden'
                  }
                }}
              />
              <Box sx={{
                position: 'absolute',
                bottom: -40,
                right: -40,
                width: 200,
                height: 100,
                backgroundColor: theme.palette.secondary.light,
                borderRadius: '50%',
                zIndex: -1,
                opacity: 0.2,
                   overflow:'hidden'
              }} />
            </Grid>
          </Grid>
        </Container>
      </AboutSection>

      {/* Mission Section */}
      <MissionSection>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ 
            fontWeight: 700,
            mb: 2,
            position: 'relative',
               overflow:'hidden',
               
            display: 'inline-block',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '4px',
              backgroundColor: theme.palette.secondary.light,
              borderRadius: 2
              
            }
          }}>
            Our Mission & Values
          </Typography>
          <Typography variant="h6" component="p" align="center" sx={{ maxWidth: 700, mx: 'auto', mb: 6, opacity: 0.9 }}>
            To improve lives through exceptional healthcare that puts patients first
          </Typography>
          
          <Grid container spacing={4} justifyContent="center">
            {values.map((value) => (
              <Grid item key={value.title} xs={12} sm={6} md={4}>
                <ValueCard {...value} />
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ 
            mt: 8,
            p: 4,
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            flexDirection: { xs: 'column', md: 'row' }
          }}>
            <Avatar sx={{ 
              bgcolor: 'secondary.main', 
              width: 80, 
              height: 80,
              mr: { md: 4 },
              mb: { xs: 3, md: 0 }
            }}>
              <LocalHospital fontSize="large" />
            </Avatar>
            <Box>
              <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                Our Promise to You
              </Typography>
              <Typography>
                Every patient receives personalized, comprehensive care from our multidisciplinary team of specialists working together to achieve the best possible outcomes.
              </Typography>
            </Box>
          </Box>
        </Container>
      </MissionSection>

      {/* CTA Section */}
      <CTA
        title="Experience the Jainam Difference"
        subtitle="Our team is ready to provide you with exceptional care"
        buttonText="Schedule an Appointment"
        secondaryButtonText="Meet Our Team"
        secondaryButtonLink="/doctors"
      />
    </Box>
  );
};

export default AboutUs;