import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import AppointmentForm from "../components/AppointmentForm";
import Lottie from "lottie-react";
import doctorAnimation from "../../public/Animaition/doctor-animation1.json";
import { FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaDirections, FaCrosshairs } from "react-icons/fa";
import FloatingButton from "../components/FloatingButton";
import FloatingButton2 from "../components/FloatingButton2";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";

// Animations
const floatIn = keyframes`
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled Components
const PageWrapper = styled.div`
  background: #f8fafc;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
`;

const GlassHero = styled.section`
  height: 45vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg,rgb(31, 90, 216),rgb(53, 99, 171), #60a5fa);
  background-size: 300% 300%;
  animation: ${gradientFlow} 12s ease infinite;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 0 2rem;
  z-index: 2;
  animation: ${floatIn} 1s ease-out;

  h1 {
    font-size: 2.8rem;
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.2;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  p {
    font-size: 1.1rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
    p {
      font-size: 0.95rem;
    }
  }
`;

const MainGrid = styled.div`
  max-width: 1400px;
  margin: -80px auto 4rem;
  padding: 0 0rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  @media (min-width: 1200px) {
    grid-template-columns: 1.2fr 1fr;
  }
`;

const FormContainer = styled.div`
  background: white;
  border-radius: 80px;
  padding: 1rem;
  animation: ${floatIn} 0.8s ease-out 0.2s both;
  position: relative;
  overflow: hidden;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: linear-gradient(to bottom, #3b82f6,rgb(165, 192, 224));
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 2rem;
    color: #1e293b;
    position: relative;
    display: inline-block;

    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 50%;
      height: 3px;
      background: linear-gradient(to right, #3b82f6, #93c5fd);
      border-radius: 3px;
    }
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const MapContainer = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  animation: ${floatIn} 0.8s ease-out 0.4s both;
  display: flex;
  flex-direction: column;

  .map-header {
    padding: 1.5rem 2rem;
    background: linear-gradient(to right, #1e40af, #2563eb);
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      font-size: 1.5rem;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }

    .location-controls {
      display: flex;
      gap: 1rem;
      
      button {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.3s ease;

        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
  }

  .map-wrapper {
    height: 400px;
    width: 100%;
    position: relative;
  }

  .location-info {
    padding: 1.5rem 2rem;
    background: white;

    .info-item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 1.2rem;

      svg {
        color: #3b82f6;
        font-size: 1.2rem;
        margin-top: 3px;
      }

      p {
        margin: 0;
        color: #475569;
        font-size: 0.95rem;
      }
    }

    .emergency {
      background: #fff1f2;
      border-left: 4px solid #f87171;
      padding: 1rem;
      border-radius: 0 8px 8px 0;
      margin-top: 1.5rem;

      h4 {
        color: #dc2626;
        margin: 0 0 0.3rem 0;
        font-size: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      p {
        color: #b91c1c;
        font-weight: 600;
        font-size: 1.1rem;
        margin: 0;
      }
    }
  }
`;

const LoaderContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f8fafc, #e0f2fe);
`;

const NearbyHospitalsList = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 1000;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  max-height: 200px;
  overflow-y: auto;
  width: 300px;

  h4 {
    padding: 0.5rem 1rem;
    margin: 0;
    background: #f1f5f9;
    position: sticky;
    top: 0;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 0.5rem 1rem;
    border-bottom: 1px solid #e2e8f0;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #f8fafc;
    }

    &:last-child {
      border-bottom: none;
    }

    p {
      margin: 0.2rem 0;
      font-size: 0.9rem;
    }

    .distance {
      color: #64748b;
      font-size: 0.8rem;
    }
  }
`;

// Main Component
const Appointment = () => {
  const [loading, setLoading] = useState(true);
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [manualAddress, setManualAddress] = useState("");
  const [mapLoading, setMapLoading] = useState(true);
  const mapRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!loading) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDEryiUNC5mfPVhYQdXjNyDyy4Dr9ReE-s&libraries=places,geometry&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      window.initMap = initMap;

      return () => {
        document.head.removeChild(script);
        delete window.initMap;
      };
    }
  }, [loading]);

  const initMap = () => {
    setMapLoading(true);
    const defaultLocation = { lat: 28.6139, lng: 77.2090 };
    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: defaultLocation,
      zoom: 14,
      mapTypeId: 'roadmap',
      tilt: 45,
      heading: 0,
      streetViewControl: true,
      fullscreenControl: true,
    });

    const directionsServiceInstance = new window.google.maps.DirectionsService();
    const directionsRendererInstance = new window.google.maps.DirectionsRenderer({
      map: mapInstance,
      suppressMarkers: false,
      preserveViewport: true,
    });

    setMap(mapInstance);
    setDirectionsService(directionsServiceInstance);
    setDirectionsRenderer(directionsRendererInstance);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userLoc);
          mapInstance.setCenter(userLoc);
          
          new window.google.maps.Marker({
            position: userLoc,
            map: mapInstance,
            title: "Your Location",
            icon: {
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            }
          });

          findNearbyHospitals(mapInstance, userLoc);
          setMapLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          findNearbyHospitals(mapInstance, defaultLocation);
          setMapLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      findNearbyHospitals(mapInstance, defaultLocation);
      setMapLoading(false);
    }
  };

  const findNearbyHospitals = (mapInstance, location) => {
    const request = {
      location: location,
      radius: '5000',
      type: ['hospital']
    };

    const service = new window.google.maps.places.PlacesService(mapInstance);
    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const hospitals = results.map(place => ({
          id: place.place_id,
          name: place.name,
          location: place.geometry.location,
          address: place.vicinity,
          distance: window.google.maps.geometry.spherical.computeDistanceBetween(
            location,
            place.geometry.location
          )
        })).sort((a, b) => a.distance - b.distance);

        setNearbyHospitals(hospitals);

        hospitals.forEach(hospital => {
          new window.google.maps.Marker({
            position: hospital.location,
            map: mapInstance,
            title: hospital.name,
            icon: {
              url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
            }
          });
        });
      }
    });
  };

  const showDirections = (hospital) => {
    if (!userLocation || !directionsService || !directionsRenderer) return;

    setSelectedHospital(hospital);

    const request = {
      origin: userLocation,
      destination: hospital.location,
      travelMode: 'DRIVING'
    };

    directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(result);
        
        if (map) {
          map.setTilt(45);
          map.setZoom(16);
        }
      }
    });
  };

  const handleManualLocation = () => {
    setLocationModalOpen(true);
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userLoc);
          if (map) {
            map.setCenter(userLoc);
            map.setZoom(16);
            new window.google.maps.Marker({
              position: userLoc,
              map: map,
              title: "Your Location",
              icon: {
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              }
            });
            findNearbyHospitals(map, userLoc);
          }
          setLocationModalOpen(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Could not get your current location. Please try again or enter manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser. Please enter address manually.");
    }
  };

  const handleSubmitManualLocation = () => {
    if (manualAddress.trim() && map) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: manualAddress }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const location = results[0].geometry.location;
          map.setCenter(location);
          map.setZoom(16);
          
          new window.google.maps.Marker({
            position: location,
            map: map,
            title: manualAddress
          });

          if (userLocation) {
            showDirections({
              location: location,
              name: "Manual Location",
              address: manualAddress
            });
          }
          setLocationModalOpen(false);
          setManualAddress("");
        } else {
          alert("Could not find the location: " + manualAddress);
        }
      });
    }
  };

  return (
    <PageWrapper>
      {loading && (
        <LoaderContainer>
          <Lottie 
            animationData={doctorAnimation}
            style={{ width: 300, height: 300 }}
            loop={true}
            autoplay={true}
          />
        </LoaderContainer>
      )}

      {!loading && (
        <>
          <GlassHero>
            <HeroContent>
              <h1>Schedule Your Visit</h1>
              <p>Book an appointment with our specialists in just a few clicks</p>
            </HeroContent>
          </GlassHero>

          <MainGrid>
            <FormContainer>
              <AppointmentForm />
            </FormContainer>

            <MapContainer>
              <div className="map-header">
                <h3>
                  <FaMapMarkerAlt /> Our Medical Center
                </h3>
                <div className="location-controls">
                  <button onClick={handleManualLocation}>
                    <FaMapMarkerAlt /> Enter Location
                  </button>
                  {selectedHospital && (
                    <button onClick={() => showDirections(selectedHospital)}>
                      <FaDirections /> Show Directions
                    </button>
                  )}
                </div>
              </div>
              
              {mapLoading && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  zIndex: 1000
                }}>
                  <Lottie 
                    animationData={doctorAnimation}
                    style={{ width: 150, height: 150 }}
                    loop={true}
                    autoplay={true}
                  />
                </div>
              )}
              
              <div className="map-wrapper" ref={mapRef}>
                {nearbyHospitals.length > 0 && (
                  <NearbyHospitalsList>
                    <h4>Nearby Hospitals</h4>
                    <ul>
                      {nearbyHospitals.map(hospital => (
                        <li 
                          key={hospital.id} 
                          onClick={() => showDirections(hospital)}
                          style={{ 
                            backgroundColor: selectedHospital?.id === hospital.id ? '#f1f5f9' : 'white'
                          }}
                        >
                          <p><strong>{hospital.name}</strong></p>
                          <p>{hospital.address}</p>
                          <p className="distance">
                            {Math.round(hospital.distance)} meters away
                          </p>
                        </li>
                      ))}
                    </ul>
                  </NearbyHospitalsList>
                )}
              </div>
              
              <div className="location-info">
                <div className="info-item">
                  <FaMapMarkerAlt />
                  <p>123 Wellness Boulevard, Health District, MedCity 54321</p>
                </div>
                
                <div className="info-item">
                  <FaPhone />
                  <p>Main Desk: (555) 123-4567</p>
                </div>
                
                <div className="info-item">
                  <FaCalendarAlt />
                  <p>Monday - Saturday: 7:00 AM - 9:00 PM</p>
                </div>
                
                <div className="emergency">
                  <h4><FaPhone /> Emergency Contact</h4>
                  <p>Call +91 93026 33266</p>
                </div>
              </div>
            </MapContainer>
          </MainGrid>
          
          <FloatingButton2/>
          <FloatingButton />
        </>
      )}

      <Dialog open={locationModalOpen} onClose={() => setLocationModalOpen(false)}>
        <DialogTitle>Enter Hospital Location</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Hospital Address"
            type="text"
            fullWidth
            variant="outlined"
            value={manualAddress}
            onChange={(e) => setManualAddress(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Button
            fullWidth
            variant="contained"
            startIcon={<FaCrosshairs />}
            onClick={handleUseCurrentLocation}
            sx={{ mt: 2 }}
          >
            Use Current Location
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLocationModalOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleSubmitManualLocation}
            disabled={!manualAddress.trim()}
            variant="contained"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </PageWrapper>
  );
};

export default Appointment;