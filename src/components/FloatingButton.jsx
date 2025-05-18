// components/FloatingButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Fab, Tooltip } from "@mui/material";
import { RocketLaunch } from "@mui/icons-material";

const FloatingButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/profile");
  };

  return (
    <Tooltip title="AI Chat Room"  placement="left"  >
      <Fab
        color="primary"
        size="medium"
        onClick={handleClick}
        sx={{
          position: "fixed",
          bottom: 90,
          right: 50,
          zIndex: 2000,
          backgroundColor: "#3c6e71",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#284b55",
            
          },
        }}
      >
        <RocketLaunch fontSize="large" />
      </Fab>
    </Tooltip>
  );
};

export default FloatingButton;
