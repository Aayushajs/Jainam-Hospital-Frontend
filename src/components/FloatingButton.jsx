// components/FloatingButton3.jsx
import React, { useState } from "react";
import { Fab, Tooltip, Modal, Box, IconButton, Typography, Button } from "@mui/material";
import { FaRobot, FaTimes, FaExternalLinkAlt } from "react-icons/fa";
import Lottie from "lottie-react";
import aiAnimation from "../../public/Animaition/doctor-animation1.json";

const FloatingButton = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleOpen = () => {
    setOpen(true);
    setLoading(true);
    // Immediately show the fallback content since we know iframe won't work
    setTimeout(() => setLoading(false), 1500);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openInNewTab = () => {
    window.open("https://huggingface.co/spaces/Aaryank12/Health-care-ai", "_blank");
    handleClose();
  };

  return (
    <>
      <Tooltip title="HEALTHCARE AI" placement="left">
        <Fab
          color="primary"
          size="medium"
          onClick={handleOpen}
          sx={{
            position: "fixed",
            bottom: 65,
            right: 30,
            zIndex: 2000,
            backgroundColor: "#3c6e71",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#284b55",
            },
            animation: "pulse 2s infinite",
            "@keyframes pulse": {
              "0%": { transform: "scale(1)" },
              "50%": { transform: "scale(1.05)" },
              "100%": { transform: "scale(1)" }
            }
          }}
        >
          <FaRobot fontSize="large" />
        </Fab>
      </Tooltip>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="huggingface-modal"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(3px)',
        }}
      >
        <Box sx={{
          width: '90vw',
          height: '90vh',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          overflow: 'hidden',
          position: 'relative',
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          p: 4
        }}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              zIndex: 1,
              color: 'text.primary',
              bgcolor: 'background.paper',
              '&:hover': {
                bgcolor: 'action.hover',
              }
            }}
          >
            <FaTimes />
          </IconButton>
          
          {loading ? (
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%'
            }}>
              <Lottie 
                animationData={aiAnimation}
                style={{ width: 300, height: 300 }}
                loop={true}
                autoplay={true}
              />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Loading Healthcare AI...
              </Typography>
            </Box>
          ) : (
            <>
              <Typography variant="h4" gutterBottom sx={{ color: '#3c6e71' }}>
                Healthcare AI Assistant
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, maxWidth: '600px' }}>
                For the best experience, we'll open the Healthcare AI in a new tab. This ensures all features work properly.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<FaExternalLinkAlt />}
                  onClick={openInNewTab}
                  sx={{
                    backgroundColor: "#3c6e71",
                    "&:hover": {
                      backgroundColor: "#284b55",
                    }
                  }}
                >
                  Open Healthcare AI
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleClose}
                  sx={{
                    color: "#3c6e71",
                    borderColor: "#3c6e71",
                    "&:hover": {
                      borderColor: "#284b55",
                    }
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default FloatingButton;