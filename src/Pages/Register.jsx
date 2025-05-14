import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";

const RegisterWrapper = styled.div`

  min-height: 100vh;
  padding: 4rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom right, #f0f4f8, #ffffff);
`;

const RegisterCard = styled.div`
  background: #ffffff;
  padding: 3rem 3.5rem;
  max-width: 700px;
  width: 100%;
  margin-top:40px;
  border-radius: 18px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);

  h2 {
    text-align: center;
    margin-bottom: 0.5rem;
    color: #1a1a1a;
  }

  p {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #555;
    font-size: 0.95rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    .input-row {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;

      input,
      select {
        flex: 1;
        min-width: calc(50% - 0.5rem);
      }
    }

    input,
    select {
      padding: 0.9rem 1rem;
      border: 1.5px solid #ccc;
      border-radius: 10px;
      font-size: 1rem;
      background: #fafafa;
      transition: 0.3s;

      &:focus {
        border-color: #007bff;
        background: white;
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.15);
        outline: none;
      }
    }

    button {
      margin-top: 1.5rem;
      padding: 1rem;
      background: #007bff;
      color: white;
      font-weight: bold;
      font-size: 1rem;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      transition: 0.3s;

      &:hover {
        background: #0056b3;
      }
    }

    .bottom-text {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 1rem;
      font-size: 0.95rem;

      a {
        color: #007bff;
        font-weight: 500;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;

    .input-row {
      flex-direction: column;

      input,
      select {
        min-width: 100%;
      }
    }
  }
`;

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://jainam-hospital-backend.onrender.com/api/v1/user/patient/register",
        { firstName, lastName, email, phone, nic, dob, gender, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(res.data.message);
      setIsAuthenticated(true);
      navigateTo("/");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setNic("");
      setDob("");
      setGender("");
      setPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
    }
  };

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <RegisterWrapper>
      <RegisterCard>
        <h2>Sign Up</h2>
        <p>Create your account to get started</p>
        <form onSubmit={handleRegistration}>
          <div className="input-row">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="input-row">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="input-row">
            <input
              type="text"
              placeholder="NIC"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              required
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>
          <div className="input-row">
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Register</button>
          <div className="bottom-text">
            <span>Already registered?</span>
            <Link to="/login">Login now</Link>
          </div>
        </form>
      </RegisterCard>
    </RegisterWrapper>
  );
};

export default Register;
