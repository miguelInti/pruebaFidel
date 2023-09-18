'use client'
import AuthForm from "@components/VincularMaquina/AuthForm";
import { useState } from "react";
import FidelizationForm from "@components/VincularMaquina/FidelizationForm";


const VincularMaquina = () => {
  const [showFidelizationForm, setShowFidelizationForm] = useState(false);
  const [token, setToken] = useState('');

  const handleBackClick = () => {
    
  };

  const handleNextClick = (responseData) => {
    // Renderizar el componente FidelizationForm
    setToken(responseData)
    setShowFidelizationForm(true);
  };

  return (
    <>
      {!showFidelizationForm ? (
        <>
          <AuthForm onBackClick={handleBackClick} onNextClick={handleNextClick} />
        </>
      ) : (
        <FidelizationForm token={token}/>
      )}
    </>
  );
};

export default VincularMaquina;
