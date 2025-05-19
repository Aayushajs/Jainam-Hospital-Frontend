// components/FloatingButton2.jsx
import React, { useState } from "react";
import { Fab, Tooltip, Modal, Box, IconButton } from "@mui/material";
import { FaHospital, FaTimes } from "react-icons/fa";
import Lottie from "lottie-react";
import doctorAnimation from "../../public/Animaition/doctor-animation1.json";

const FloatingButton2 = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setLoading(true);
  };

  return (
    <>
      <Tooltip title="YOUR HELPER" placement="left">
        <Fab
          color="primary"
          size="medium"
          onClick={handleOpen}
          sx={{
            position: "fixed",
            bottom: 150,
            right: 50,
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
          <FaHospital fontSize="large" />
        </Fab>
      </Tooltip>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="streamlit-modal"
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
          border: 'none'
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
          
          {loading && (
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255,255,255,0.7)',
              zIndex: 2
            }}>
              <Lottie 
                animationData={doctorAnimation}
                style={{ width: 300, height: 300 }}
                loop={true}
                autoplay={true}
              />
            </Box>
          )}

          <iframe
            src="https://doctorrecommendationsystem-drs.streamlit.app/?embedded=true"
            title="Doctor Recommendation System"
            width="100%"
            height="100%"
            style={{
              border: 'none',
              display: 'block'
            }}
            allow="fullscreen"
            onLoad={() => setLoading(false)}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </Box>
      </Modal>
    </>
  );
};

export default FloatingButton2;