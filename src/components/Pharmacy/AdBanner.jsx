import { Box, Typography, Button, IconButton, useTheme } from '@mui/material';
import { useState, useEffect } from 'react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function AdBanner() {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const banners = [
    {
      title: "आयुर्वेदिक उत्पादों पर 25% छूट",
      subtitle: "प्राकृतिक स्वास्थ्य समाधान",
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88",
      cta: "अभी खरीदें",
      color: theme.palette.primary.main
    },
    {
      title: "मुफ्त डिलीवरी",
      subtitle: "999 रुपये से अधिक के सभी ऑर्डर पर",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae",
      cta: "उत्पाद देखें",
      color: theme.palette.secondary.main
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % banners.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <Box sx={{
      position: 'relative',
      height: { xs: 400, md: 300 },
      overflow: 'hidden',
      borderRadius: 4,
      boxShadow: 3,
      mb: 4
    }}>
      {/* बैनर स्लाइड्स */}
      <Box sx={{
        display: 'flex',
        width: `${banners.length * 100}%`,
        transform: `translateX(-${activeIndex * (100 / banners.length)}%)`,
        transition: 'transform 0.5s ease'
      }}>
        {banners.map((banner, index) => (
          <Box key={index} sx={{
            width: `${100 / banners.length}%`,
            height: '100%',
            
            position: 'relative',
            flexShrink: 0
          }}>
            {/* बैकग्राउंड इमेज */}
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '150%',
              background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url(${banner.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.9)'
            }} />

            {/* कंटेंट */}
            <Box sx={{
              position: 'relative',
              zIndex: 1,
              color: 'white',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              p: 4
            }}>
              <Typography variant="h2" sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '2rem', md: '3rem' },
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}>
                {banner.title}
              </Typography>

              <Typography variant="h5" sx={{
                mb: 4,
                fontSize: { xs: '1.1rem', md: '1.5rem' },
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
              }}>
                {banner.subtitle}
              </Typography>

              <Button
                variant="contained"
                sx={{
                  px: 6,
                  py: 2,
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  bgcolor: banner.color,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 6
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {banner.cta}
              </Button>
            </Box>
          </Box>
        ))}
      </Box>

      {/* नेविगेशन बटन */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: 'absolute',
          left: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'white',
          bgcolor: 'rgba(0,0,0,0.3)',
          '&:hover': {
            bgcolor: 'rgba(0,0,0,0.5)'
          }
        }}
      >
        <NavigateBeforeIcon fontSize="large" />
      </IconButton>

      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'white',
          bgcolor: 'rgba(0,0,0,0.3)',
          '&:hover': {
            bgcolor: 'rgba(0,0,0,0.5)'
          }
        }}
      >
        <NavigateNextIcon fontSize="large" />
      </IconButton>

      {/* डॉट्स इंडिकेटर */}
      <Box sx={{
        position: 'absolute',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 1
      }}>
        {banners.map((_, index) => (
          <Box
            key={index}
            onClick={() => setActiveIndex(index)}
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              bgcolor: activeIndex === index ? 'primary.main' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </Box>
    </Box>
  );
}