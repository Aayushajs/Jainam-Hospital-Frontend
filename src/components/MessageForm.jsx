import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Container,
  Paper,
  InputAdornment,
  CircularProgress,
  styled,
  useTheme,
  keyframes
} from "@mui/material";
import {
  Person,
  Email,
  Phone,
  Message as MessageIcon,
  Send
} from "@mui/icons-material";

// Animation keyframes
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

// Custom styled components
const GradientPaper = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
 // borderRadius: '24px',
 borderBottomRightRadius: '34px',
 borderTopLeftRadius: '34px',
   boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
  overflow: 'hidden',
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
   // background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: 'rgba(255,255,255,0.9)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
    
    '&:hover': {
      boxShadow: `0 4px 12px ${theme.palette.primary.light}20`,
      transform: 'translateY(-2px)'
    },
    '&.Mui-focused': {
      boxShadow: `0 4px 16px ${theme.palette.primary.light}30`,
      transform: 'translateY(-3px)'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: '1px',
      borderColor: 'rgba(0,0,0,0.08)'
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: '1px',
      borderColor: `${theme.palette.primary.main} !important`
    },
    '& .MuiInputAdornment-root': {
      marginRight: '12px', // Increased gap between icon and text
      color: theme.palette.primary.main
    },
    '& .MuiOutlinedInput-input': {
      padding: '14px 0', // Removed left padding to prevent overlap
      fontSize: '0.95rem'
    }
  },
  '& .MuiInputLabel-root': {
    fontWeight: 500,
    color: theme.palette.text.secondary,
    transform: 'translate(44px, 16px) scale(1)', // Adjusted for icon space
    '&.Mui-focused, &.MuiFormLabel-filled': {
      transform: 'translate(34px, -9px) scale(0.85)',
      color: theme.palette.primary.main,
      fontWeight: 600,
      backgroundColor: theme.palette.background.paper,
      padding: '0 4px',
      left: '-8px' // Compensate for icon space
    }
  },
  '& .MuiFormHelperText-root': {
    marginLeft: '8px',
    fontSize: '0.8rem'
  }
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: 'white',
  padding: '14px 32px',
  borderRadius: '12px',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
    animation: `${floatAnimation} 2s infinite ease-in-out`
  }
}));

const MessageForm = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Required field";
    if (!formData.lastName.trim()) newErrors.lastName = "Required field";
    if (!formData.email.trim()) {
      newErrors.email = "Required field";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Required field";
    } else if (!/^\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = "10-15 digits required";
    }
    if (!formData.message.trim()) newErrors.message = "Required field";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "https://jainam-hospital-backend.onrender.com/api/v1/message/send",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      
      toast.success(response.data.message);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: ""
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container  sx={{ py: 3  }}>
      <GradientPaper elevation={0} sx={{ p: { xs: 3, md: 5 } }}>
        <Box textAlign="center" mb={5}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 800,
              //background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
             // WebkitBackgroundClip: 'text',
             // WebkitTextFillColor: 'transparent',
              display: 'inline-block',
              mb: 1.5,
              overflow:"hidden",
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Contact Our Team
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.1rem' }
            }}
          >
            Have questions or need assistance? Our team is here to help you with any inquiries.
          </Typography>
        </Box>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person 
                        sx={{ 
                          fontSize: '1.25rem',
                          color: errors.firstName ? theme.palette.error.main : theme.palette.primary.main
                        }} 
                      />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person 
                        sx={{ 
                          fontSize: '1.25rem',
                          color: errors.lastName ? theme.palette.error.main : theme.palette.primary.main
                        }} 
                      />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email 
                        sx={{ 
                          fontSize: '1.25rem',
                          color: errors.email ? theme.palette.error.main : theme.palette.primary.main
                        }} 
                      />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone 
                        sx={{ 
                          fontSize: '1.25rem',
                          color: errors.phone ? theme.palette.error.main : theme.palette.primary.main
                        }} 
                      />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Your Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                error={!!errors.message}
                helperText={errors.message}
                multiline
                rows={5}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ 
                      alignItems: 'flex-start',
                      marginTop: '10px'
                    }}>
                      <MessageIcon 
                        sx={{ 
                          fontSize: '1.25rem',
                          color: errors.message ? theme.palette.error.main : theme.palette.primary.main
                        }} 
                      />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center", mt: 2 }}>
              <SubmitButton
                type="submit"
                variant="contained"
                size="large"
                startIcon={isSubmitting ? <CircularProgress size={24} color="inherit" /> : <Send />}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </SubmitButton>
            </Grid>
          </Grid>
        </form>
      </GradientPaper>
    </Container>
  );
};

export default MessageForm;