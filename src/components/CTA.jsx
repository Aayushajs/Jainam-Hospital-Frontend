import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";

const CTA = ({
  title,
  subtitle,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        py: 8,
        borderBottomRightRadius: "94px",
        borderTopLeftRadius: "94px",
        px: isMobile ? 2 : 6,
        backgroundColor: theme.palette.primary.main,
        color: "white",
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: "bold",
            mb: 3,
          }}
        >
          {title || "Ready to Experience Better Healthcare?"}
        </Typography>

        <Typography
          variant="h5"
          sx={{
            mb: 5,
            opacity: 0.9,
          }}
        >
          {subtitle || "Schedule your appointment today"}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 3,
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <Button
            component={Link}
            to={primaryButtonLink || "/appointment"}
            variant="contained"
            color="secondary"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: "bold",
              fontSize: "1.1rem",
            }}
          >
            {primaryButtonText || "Book Appointment"}
          </Button>

          {secondaryButtonText && (
            <Button
              component={Link}
              to={secondaryButtonLink || "/services"}
              variant="outlined"
              color="inherit"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: "bold",
                fontSize: "1.1rem",
                borderWidth: 2,
                "&:hover": { borderWidth: 2 },
              }}
            >
              {secondaryButtonText}
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default CTA;
