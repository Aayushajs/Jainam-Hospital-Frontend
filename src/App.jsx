import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Appointment from "./Pages/Appointment";
import AboutUs from "./Pages/AboutUs";
import Register from "./Pages/Register";
import ProfilePage from "./Pages/Profile";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Context } from "./main";
import Login from "./Pages/Login";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PatientDashboard from "./Pages/Appoinmentpage";

const theme = createTheme({
  palette: {
    primary: {
      main: '#0369a1',
      dark: '#0284c7',
    },
    secondary: {
      main: '#00bcd4',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },
});
const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } =
    useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://jainam-hospital-backend.onrender.com/api/v1/user/patient/me",
          //"http://localhost:4000/api/v1/user/patient/me",
          {
            withCredentials: true,
            
            }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <>
      <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/appoinmentpage" element={<PatientDashboard />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
        <ToastContainer position="top-center" />
      </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
