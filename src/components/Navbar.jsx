import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.3rem 6%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ scroll }) => (scroll ? "#ffffffdd" : "transparent")};
  backdrop-filter: blur(${({ scroll }) => (scroll ? "12px" : "0")});
  box-shadow: ${({ scroll }) =>
    scroll ? "0 2px 20px rgba(0, 0, 0, 0.06)" : "none"};
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
  small {
    display: block;
    font-size: 0.75rem;
    color: #666;
    margin-top: -6px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2.2rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${({ show }) => (show ? "0" : "-100%")};
    width: 80%;
    max-width: 300px;
    height: 100vh;
    background: #ffffffee;
    backdrop-filter: blur(12px);
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 5rem;
    transition: all 0.4s cubic-bezier(0.65, 0, 0.35, 1);
    box-shadow: -8px 0 20px rgba(0, 0, 0, 0.1);
    z-index: 999;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #1f1f1f;
  font-weight: 500;
  font-size: 1rem;
  position: relative;
  transition: all 0.3s;
  overflow: hidden;
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
    font-size: 1.3rem;
    margin: 1rem 0;
    padding: 0.5rem 1.5rem;
    animation: ${fadeIn} 0.3s ease forwards;
    animation-delay: ${({ delay }) => delay || "0s"};
  }
`;

const AuthButton = styled.button`
  padding: 0.6rem 1.6rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.95rem;
  background: ${({ primary }) => (primary ? "#e63946" : "transparent")};
  color: ${({ primary }) => (primary ? "#fff" : "#e63946")};
  border: 2px solid #e63946;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ primary }) => (primary ? "#d12f3f" : "#e63946")};
    color: white;
    box-shadow: 0 5px 15px rgba(230, 57, 70, 0.2);
  }

  @media (max-width: 768px) {
    margin-top: 1.5rem;
    padding: 0.8rem 2rem;
    font-size: 1.1rem;
    animation: ${fadeIn} 0.3s ease forwards;
    animation-delay: 0.3s;
  }
`;

const MenuToggle = styled.div`
  display: none;
  font-size: 2rem;
  cursor: pointer;
  color: #2a2a2a;
  z-index: 1001;
  transition: all 0.3s;

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

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [scroll, setScroll] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setShow(false);
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

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <NavContainer scroll={scroll}>
        <Logo to="/">
          JAINAM<span> HOSPITALS</span>  
          
        </Logo>

        <MenuToggle onClick={() => setShow(!show)}>
          {show ? <CloseButton /> : <GiHamburgerMenu />}
        </MenuToggle>

        <NavLinks show={show}>
          <NavLink to="/" delay="0.1s">Home</NavLink>
          <NavLink to="/appointment" delay="0.2s">Appointment</NavLink>
          <NavLink to="/about" delay="0.3s">About Us</NavLink>

          {isAuthenticated ? (
            <AuthButton primary onClick={handleLogout}>
              LOGOUT
            </AuthButton>
          ) : (
            <AuthButton onClick={goToLogin}>
              LOGIN
            </AuthButton>
          )}
        </NavLinks>
      </NavContainer>
      
      <Overlay show={show} onClick={() => setShow(false)} />
    </>
  );
};

export default Navbar;