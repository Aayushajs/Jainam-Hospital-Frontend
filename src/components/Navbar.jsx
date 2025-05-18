import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import styled, { keyframes } from "styled-components";

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
    box-shadow: -8px 0 20px rgba(0, 0, 0, 0.1);
    z-index: 999;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #1f1f1f;
  font-weight: 500;
  font-size: 1.1rem;
  position: relative;
  transition: all 0.3s;

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
  z-index: 1001;
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

const ProfileContainer = styled.div`
  position: relative;
  margin-left: 1rem;

  &:hover .dropdown {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;

const ProfileIcon = styled(FaUserCircle)`
  font-size: 2.1rem;
  color: #1f1f1f;
  cursor: pointer;
   margin-right: -4rem
  &:hover {
    color: #e63946;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  right: 0;
  top: 130%;
  background: white;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 1002;
  min-width: 200px;
  font-size: 0.95rem;

  div {
    margin: 0.3rem 0;
  }

  button {
    color: #e63946;
    background: none;
    border: none;
    font-weight: 600;
    cursor: pointer;
    margin-top: 0.6rem;
  }
`;

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 45px;
  height: 24px;
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  span {
    position: absolute;
    cursor: pointer;
    top: 0; left: 0;
    right: 0; bottom: 0;
    background-color: #ccc;
    border-radius: 34px;
    transition: 0.4s;
  }
  span:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    border-radius: 50%;
    transition: 0.4s;
  }
  input:checked + span {
    background-color: #e63946;
  }
  input:checked + span:before {
    transform: translateX(21px);
  }
`;

// Component
const Navbar = () => {
  const [show, setShow] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { isAuthenticated, setIsAuthenticated, user } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setShow(false);
  }, [location]);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

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

  return (
    <>
      <NavContainer scroll={scroll}>
        <Logo to="/">JAINAM<span> HOSPITALS</span></Logo>

        <MenuToggle onClick={() => setShow(!show)}>
          {show ? <CloseButton /> : <GiHamburgerMenu />}
        </MenuToggle>

        <NavLinks show={show}>
          <NavLink to="/" className={location.pathname === "/" ? "active" : ""}>Home</NavLink>
          <NavLink to="/appointment" className={location.pathname === "/appointment" ? "active" : ""}>Appointment</NavLink>
          <NavLink to="/about" className={location.pathname === "/about" ? "active" : ""}>About Us</NavLink>

          {isAuthenticated ? (
            <ProfileContainer>
              <ProfileIcon />
              <Dropdown className="dropdown">
                <div><strong>{`Wellcome Back ${user?.firstName} ${user?.lastName}`}</strong></div>
                <div style={{ fontSize: "0.85rem", color: "gray" }}>{user?.email}</div>
                <div><button onClick={() => navigate("/profile")}>View Profile</button></div>
                <div><button onClick={handleLogout}>Logout</button></div>
              </Dropdown>
            </ProfileContainer>
          ) : (
            <AuthButton onClick={goToLogin}>LOGIN</AuthButton>
          )}

          {/* <ToggleWrapper>
            <Switch>
              <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
              <span></span>
            </Switch>
          </ToggleWrapper> */}
        </NavLinks>
      </NavContainer>
      <Overlay show={show} onClick={() => setShow(false)} />
    </>
  );
};

export default Navbar;
