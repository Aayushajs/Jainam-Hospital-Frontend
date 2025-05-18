import React from "react";
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Avatar, 
  useTheme,
  Paper,
  Divider,
  Button
} from "@mui/material";
import { 
  Healing, 
  EmojiPeople, 
  Science, 
  LocalHospital, 
  AccessTime,
  Groups,
  VerifiedUser,
  School,
  Timeline as TimelineIcon
} from "@mui/icons-material";
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from '@mui/lab';

// Custom styled components
const SectionContainer = ({ children, bgColor = 'background.default', py = 10 }) => (
  <Box component="section" sx={{
    py: { xs: 6, md: py },
    backgroundColor: bgColor,
    position: 'relative',
    overflow: 'hidden'
  }}>
    {children}
  </Box>
);

const GradientSection = ({ children }) => {
  const theme = useTheme();
  return (
    <Box sx={{
      background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
      color: theme.palette.primary.contrastText,
      position: 'relative',
      '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 30%)',
      }
    }}>
      {children}
    </Box>
  );
};

const ValueCard = ({ icon, title, description, color }) => {
  const theme = useTheme();
  return (
    <Paper elevation={3} sx={{
      p: 4,
      height: '100%',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      borderLeft: `4px solid ${theme.palette[color].main}`,
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: theme.shadows[6]
      }
    }}>
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        mb: 3
      }}>
        <Avatar sx={{ 
          bgcolor: `${theme.palette[color].main}20`, 
          color: theme.palette[color].main,
          mr: 2
        }}>
          {icon}
        </Avatar>
        <Typography variant="h5" component="h3" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="body1" color="text.secondary">
        {description}
      </Typography>
    </Paper>
  );
};

const StatItem = ({ value, label, icon }) => (
  <Box sx={{ textAlign: 'center', px: 2 }}>
    <Typography variant="h2" component="div" sx={{ 
      fontWeight: 700,
      color: 'primary.main',
      mb: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {value}
      {icon && React.cloneElement(icon, { sx: { ml: 1, fontSize: '1.5em' } })}
    </Typography>
    <Typography variant="subtitle1" color="text.secondary">
      {label}
    </Typography>
  </Box>
);

const AboutUs = () => {
  const theme = useTheme();
  
  const coreValues = [
    {
      title: "Patient-Centered Care",
      description: "We prioritize your needs, preferences and values in every decision about your health and treatment.",
      icon: <EmojiPeople />,
      color: 'primary'
    },
    {
      title: "Medical Excellence",
      description: "Our board-certified specialists deliver the highest standard of care through evidence-based practices.",
      icon: <VerifiedUser />,
      color: 'secondary'
    },
    {
      title: "Innovative Solutions",
      description: "We integrate cutting-edge technology and research to provide advanced treatments.",
      icon: <Science />,
      color: 'info'
    },
    {
      title: "Collaborative Approach",
      description: "Our multidisciplinary teams work together to develop comprehensive treatment plans.",
      icon: <Groups />,
      color: 'success'
    }
  ];

  const milestones = [
    { year: "2005", event: "Founded as a small community clinic with 5 physicians" },
    { year: "2010", event: "Expanded to full-service medical center with specialty departments" },
    { year: "2015", event: "Achieved JCI accreditation for quality and patient safety" },
    { year: "2020", event: "Opened state-of-the-art research and innovation center" },
    { year: "2023", event: "Recognized as a Top Hospital by National Healthcare Review" }
  ];

  const stats = [
    { value: "200+", label: "Specialists", icon: <LocalHospital /> },
    { value: "50K+", label: "Patients Annually", icon: <EmojiPeople /> },
    { value: "24/7", label: "Emergency Care", icon: <AccessTime /> },
    { value: "95%", label: "Patient Satisfaction", icon: <Healing /> }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <SectionContainer bgColor="primary.dark" py={15}>
        <Container maxWidth="lg">
          <Box sx={{ 
            textAlign: 'center',
            color: 'primary.contrastText',
            maxWidth: 800,
            mx: 'auto'
          }}>
            <Typography variant="h1" component="h1" sx={{ 
              fontWeight: 700,
              mb: 3,
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}>
              About Jainam Medical Center
            </Typography>
            <Typography variant="h5" component="p" sx={{ 
              fontWeight: 400,
              mb: 5,
              opacity: 0.9
            }}>
              Where compassionate care meets world-class medical expertise
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button variant="contained" color="secondary" size="large">
                Meet Our Team
              </Button>
              <Button variant="outlined" color="secondary" size="large" sx={{ color: 'primary.contrastText' }}>
                Take a Tour
              </Button>
            </Box>
          </Box>
        </Container>
      </SectionContainer>

      {/* Introduction Section */}
      <SectionContainer>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h2" sx={{ 
                fontWeight: 700,
                mb: 3,
                position: 'relative',
                display: 'inline-block',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: '80px',
                  height: '4px',
                  backgroundColor: 'secondary.main'
                }
              }}>
                Our Story
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', mb: 3 }}>
                Founded in 2005, Jainam Medical Center began as a small community clinic with a vision to transform healthcare through compassionate, patient-centered care.
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', mb: 4 }}>
                Today, we've grown into a regional leader in medical excellence, serving patients from across the country with a team of dedicated healthcare professionals.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" color="primary">
                  Our History
                </Button>
                <Button variant="outlined" color="primary">
                  Awards & Recognition
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                position: 'relative',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: 6,
                '& img': {
                  width: '100%',
                  height: 'auto',
                  display: 'block'
                }
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1579684453423-f84349ef60b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                  alt="Jainam Medical Center facility" 
                />
                <Box sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: 3,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                  color: 'white'
                }}>
                  <Typography variant="h6">Our State-of-the-Art Facility</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </SectionContainer>

      {/* Stats Section */}
      <SectionContainer bgColor="background.paper">
        <Container maxWidth="lg">
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            gap: 4,
            py: 4,
            borderTop: `1px solid ${theme.palette.divider}`,
            borderBottom: `1px solid ${theme.palette.divider}`
          }}>
            {stats.map((stat, index) => (
              <StatItem key={index} {...stat} />
            ))}
          </Box>
        </Container>
      </SectionContainer>

      {/* Mission & Values */}
      <GradientSection>
        <SectionContainer>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography variant="h2" component="h2" sx={{ 
                fontWeight: 700,
                mb: 2,
                color: 'primary.contrastText'
              }}>
                Our Mission & Values
              </Typography>
              <Typography variant="h6" component="p" sx={{ 
                maxWidth: 700,
                mx: 'auto',
                color: 'primary.contrastText',
                opacity: 0.9
              }}>
                Guiding principles that shape every aspect of our care
              </Typography>
            </Box>
            
            <Grid container spacing={4}>
              {coreValues.map((value, index) => (
                <Grid item key={index} xs={12} sm={6} md={3}>
                  <ValueCard {...value} />
                </Grid>
              ))}
            </Grid>

            <Paper elevation={0} sx={{ 
              mt: 8,
              p: 4,
              backgroundColor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', md: 'row' } }}>
                <Avatar sx={{ 
                  bgcolor: 'secondary.main', 
                  width: 80, 
                  height: 80,
                  mr: { md: 4 },
                  mb: { xs: 3, md: 0 }
                }}>
                  <Healing fontSize="large" />
                </Avatar>
                <Box>
                  <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 600, color: 'primary.contrastText' }}>
                    Our Commitment to You
                  </Typography>
                  <Typography color="primary.contrastText" sx={{ opacity: 0.9 }}>
                    Every patient receives personalized, comprehensive care from our multidisciplinary team of specialists working together to achieve the best possible outcomes.
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Container>
        </SectionContainer>
      </GradientSection>

      {/* Timeline Section */}
      <SectionContainer>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h2" sx={{ 
            fontWeight: 700,
            mb: 2,
            textAlign: 'center'
          }}>
            Our Journey
          </Typography>
          <Typography variant="h6" component="p" sx={{ 
            mb: 6,
            textAlign: 'center',
            color: 'text.secondary'
          }}>
            Milestones in our pursuit of medical excellence
          </Typography>
          
          <Timeline position="alternate" sx={{ maxWidth: 800, mx: 'auto' }}>
            {milestones.map((item, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot color="primary" sx={{ boxShadow: 2 }}>
                    <TimelineIcon />
                  </TimelineDot>
                  {index < milestones.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="h6" component="div" color="primary" fontWeight="bold">
                      {item.year}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography>
                      {item.event}
                    </Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Container>
      </SectionContainer>

      {/* CTA Section */}
      <SectionContainer bgColor="background.paper">
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" component="h2" sx={{ 
            fontWeight: 700,
            mb: 3
          }}>
            Experience the Jainam Difference
          </Typography>
          <Typography variant="h6" component="p" sx={{ 
            mb: 5,
            maxWidth: 700,
            mx: 'auto',
            color: 'text.secondary'
          }}>
            Discover why patients choose us for their healthcare needs
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
            <Button variant="contained" color="primary" size="large">
              Schedule an Appointment
            </Button>
            <Button variant="outlined" color="primary" size="large">
              Contact Us
            </Button>
          </Box>
        </Container>
      </SectionContainer>
    </Box>
  );
};

export default AboutUs;