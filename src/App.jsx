import React, { useContext } from "react";
import "./App.css";
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate 
} from "react-router-dom";
import Home from "./Pages/Home";
import Appointment from "./Pages/Appointment";
import AboutUs from "./Pages/AboutUs";
import Register from "./Pages/Register";
import ProfilePage from "./Pages/Profile";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "./Context/context.jsx";
import notfount  from "../public/Animaition/no-records-animation.json"
import Login from "./Pages/Login";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PatientDashboard from "./Pages/Appoinmentpage";
import Lottie from 'lottie-react'; 
import PHome from "../src/Pages/PharmacyPages/Home.jsx";
import { Container } from '@mui/material'

import Cart from '../src/Pages/PharmacyPages/Cart'

import EmergencyDashboard from "./Pages/emrgcy.jsx";


const defaultLottieOptions = {
  loop: true,
  autoplay: true,
  animationData:notfount, 
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};


const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <Lottie 
      options={defaultLottieOptions}
      height={200}
      width={200}
    />
  </div>
);

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(Context);

  if (loading) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};


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
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/pharmacy" element={<PHome />} />
        <Route path="/cart" element={<Cart />} />
       
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/EmergencyDashboard" element={
            <ProtectedRoute>
              <EmergencyDashboard />
            </ProtectedRoute>
          } />
          <Route path="/appoinmentpage" element={
            <ProtectedRoute>
              <PatientDashboard />
            </ProtectedRoute>
          } />

          <Route path="/appointment" element={
            <ProtectedRoute>
              <Appointment />
            </ProtectedRoute>
          } />
        </Routes>
        <Footer />
        <ToastContainer position="top-center" />
      </Router>
    </ThemeProvider>
  );
};

export default App;