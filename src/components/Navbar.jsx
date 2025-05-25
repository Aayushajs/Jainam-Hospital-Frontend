import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../Context/context.jsx";
import styled, { keyframes } from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { 
  FaUser, 
  FaHome, 
  FaCalendarAlt, 
  FaInfoCircle, 
  FaRobot,
  FaAmbulance,
  FaSignOutAlt,
  FaHistory,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const NavContainer = styled.nav`
  position: fixed;
  top: 0.5rem;
  left: 1.5rem;
  right: 1.5rem;
  z-index: 1000;
  padding: 1.5rem 4.5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ scroll }) => (scroll ? "rgba(255, 255, 255, 0.6)" : "transparent")};
  backdrop-filter: blur(${({ scroll }) => (scroll ? "25px" : "0")});
  box-shadow: ${({ scroll }) => scroll ? "0 4px 30px rgba(0, 0, 0, 0.06)" : "none"};
  border-radius: 50px;
  transition: all 0.3s ease;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Logo = styled(Link)`
  font-size: 2rem;
  font-weight: 800;
  text-decoration: none;
  color: #1a1a1a;
  span {
    color: #e63946;
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
    span {
      font-size: 1.4rem;
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${({ show }) => (show ? "0" : "-100%")};
    width: 80%;
    max-width: 300px;
    height: 100vh;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(15px);
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 4rem;
    transition: all 0.4s ease;
    z-index: 999;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
  }
`;

const NavLink = styled(Link)`
  position: relative;
  text-decoration: none;
  color: #1f1f1f;
  font-weight: 500;
  font-size: 1.1rem;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &.active {
    color: #e63946;
    &:after {
      width: 100%;
    }
  }

  &:after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    height: 2px;
    width: 0%;
    background: #e63946;
    transition: width 0.3s;
  }

  &:hover {
    color: #e63946;
    &:after {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin: 0.8rem 0;
    animation: ${fadeIn} 0.3s ease forwards;
  }
`;

const AuthButton = styled.button`
  padding: 0.6rem 1.3rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.9rem;
  background: ${({ primary }) => (primary ? "#e63946" : "transparent")};
  color: ${({ primary }) => (primary ? "#fff" : "#e63946")};
  border: 2px solid #e63946;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${({ primary }) => (primary ? "#d12f3f" : "#e63946")};
    color: white;
  }
`;

const MenuToggle = styled.div`
  display: none;
  font-size: 2rem;
  cursor: pointer;
  color: #2a2a2a;
  z-index: 1001;
  @media (max-width: 768px) {
    display: block;
  }
`;

const CloseButton = styled(IoClose)`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-size: 2rem;
  cursor: pointer;
  color: #1f1f1f;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
  opacity: ${({ show }) => (show ? 1 : 0)};
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  transition: all 0.3s ease;
`;

// Profile related styled components
const InitialCircle = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: #e63946;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  user-select: none;
`;

const ProfileToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  position: relative;
  padding: 0.5rem 0;

  @media (min-width: 769px) {
    &:hover > div {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
  }
`;

const ProfileText = styled.span`
  display: none;
  @media (max-width: 768px) {
    display: inline;
    font-weight: 600;
  }
`;

const ProfileContainer = styled.div`
  position: relative;
  margin-left: 0rem;
  margin-right: -2.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    margin-left: 5rem;
    margin-top: 1rem;
    order: -1;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  right: 0;
  top: 130%;
  background: white;
  border-radius: 7px;
  padding: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 1002;
  min-width: 250px;
  font-size: 1rem;

  @media (min-width: 769px) {
    ${ProfileContainer}:hover & {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    position: relative;
    top: 0;
    right: 3.79rem;
    opacity: ${({ show }) => (show ? 1 : 0)};
    visibility: ${({ show }) => (show ? "visible" : "hidden")};
    height: ${({ show }) => (show ? "auto" : "0")};
    transform: none;
     border-radius: 0px;
    margin-top: 0.3rem;
    padding: ${({ show }) => (show ? "1rem" : "0")};
    box-shadow: none;
    background: rgba(203, 197, 197, 0.03);
    width: 100%;
  }

  div {
    margin: 0.3rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  button {
    color: rgba(22, 102, 70, 0.67);
    background: none;
    border: none;
    font-weight: 600;
    cursor: pointer;
    margin-top: 0.6rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.3rem 0;
  }
`;

// Component
const Navbar = () => {
  const [show, setShow] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { isAuthenticated, setIsAuthenticated, user } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setShow(false);
    setShowProfileDropdown(false);
  }, [location]);

  const handleLogout = async () => {
    try {
      await axios.get("https://jainam-hospital-backend.onrender.com/api/v1/user/patient/logout", {
        withCredentials: true,
      });
      toast.success("Logged out successfully");
      setIsAuthenticated(false);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  const goToLogin = () => navigate("/login");

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <>
      <NavContainer scroll={scroll}>
        <Logo to="/">JAINAM<span> HOSPITALS</span></Logo>

        <MenuToggle onClick={() => setShow(!show)}>
          {show ? <CloseButton /> : <GiHamburgerMenu />}
        </MenuToggle>

        <NavLinks show={show}>
          {/* Navigation links */}
          <NavLink to="/" className={location.pathname === "/" ? "active" : ""}>
            <FaHome /> Home
          </NavLink>
          <NavLink to="/appointment" className={location.pathname === "/appointment" ? "active" : ""}>
            <FaCalendarAlt /> Appointment
          </NavLink>
          <NavLink to="/about" className={location.pathname === "/about" ? "active" : ""}>
            <FaInfoCircle /> About Us
          </NavLink>   
          <NavLink to="/departments" className={location.pathname === "/departments" ? "active" : ""}>
            <FaRobot /> AI Assistant
          </NavLink>
          <NavLink to="/emergency" className={location.pathname === "/emergency" ? "active" : ""}>
            <FaAmbulance /> Emergency
          </NavLink>
          {isAuthenticated ? (
            <ProfileContainer 
              ref={profileRef}
              onMouseEnter={() => window.innerWidth > 768 && setShowProfileDropdown(true)}
              onMouseLeave={() => window.innerWidth > 768 && setShowProfileDropdown(false)}
            >
              <ProfileToggle onClick={toggleProfileDropdown}>
                <InitialCircle>{user?.firstName?.charAt(0)?.toUpperCase()}</InitialCircle>
                <ProfileText>Profile</ProfileText>
                {window.innerWidth <= 768 && (showProfileDropdown ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />)}
              </ProfileToggle>
              <Dropdown show={showProfileDropdown}>
                <div>
                  <FaUser />
                  <strong>{`${user?.firstName} ${user?.lastName}`}</strong>
                </div>
                <div style={{ fontSize: "0.85rem", color: "gray" }}>
                  {user?.email}
                </div>
                <button onClick={() => navigate("/profile")}>
                  <FaUser /> My Profile
                </button>
                <button onClick={() => navigate("/appoinmentpage")}>
                  <FaHistory /> Appointment History
                </button>
                <button onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </button>
              </Dropdown>
            </ProfileContainer>
          ) : (
            <AuthButton onClick={goToLogin}>
              <FaUser /> LOGIN
            </AuthButton>
          )}
        </NavLinks>
      </NavContainer>
      <Overlay show={show} onClick={() => setShow(false)} />
    </>
  );
};

export default Navbar;