import React from "react";
import styled from "styled-components";
import AppointmentForm from "../components/AppointmentForm";

const PageWrapper = styled.div`
  background: linear-gradient(to bottom right, #f0f4f8, #ffffff);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeroWrapper = styled.div`
  width: 100%;
  margin-top: 90px; /* space for navbar */
  background: url('/signin.png') no-repeat center center/cover;
  height: 45vh;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 2.8rem;
    color: white;
    background: rgba(0, 0, 0, 0.5);
    padding: 1rem 2.5rem;
    border-radius: 16px;
    backdrop-filter: blur(6px);
    text-align: center;
  }

  @media (max-width: 768px) {
    height: 35vh;
    h1 {
      font-size: 2rem;
      padding: 0.8rem 1.5rem;
    }
  }
`;

const FormContainer = styled.div`
  background: #ffffff;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  border-radius: 18px;
  padding: 3rem 3.5rem;
  margin-top: -3rem;
  width: 100%;
  max-width: 1100px;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    label {
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #333;
    }

    input,
    select,
    textarea {
      width: 100%;
      padding: 0.9rem 1.1rem;
      border: 1.5px solid #ccc;
      border-radius: 10px;
      font-size: 1rem;
      background: #fafafa;
      transition: 0.3s;

      &:focus {
        border-color: #007bff;
        outline: none;
        background: white;
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.15);
      }
    }

    textarea {
      resize: vertical;
      min-height: 100px;
    }

    button {
      background: #007bff;
      color: white;
      font-weight: bold;
      font-size: 1rem;
      border: none;
      padding: 1rem;
      border-radius: 10px;
      cursor: pointer;
      transition: 0.3s ease;

      &:hover {
        background: #0056b3;
      }
    }
  }
`;

const Appointment = () => {
  return (
    <PageWrapper>
      <HeroWrapper>
        <h1>Schedule Your Appointment</h1>
      </HeroWrapper>
      <FormContainer>
        <AppointmentForm />
      </FormContainer>
    </PageWrapper>
  );
};

export default Appointment;
