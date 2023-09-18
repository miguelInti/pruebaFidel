"use client";
import React, { useState, useEffect } from "react";
import RegisterForm from "@components/Registro/RegisterForm";
import SecondRegisterForm from "@components/Registro/SecondRegisterForm";
import MaximoIntentosExcedido from "@components/Registro/MaximoIntentosExcedido";

function Register() {
  const [formData, setFormData] = useState({
    tipoIdentificacion: "5002",
    identificacion: "",
    celular: "",
    terminosCondiciones: false,
    politicaProteccion: false,
  });
  const [showSecondForm, setShowSecondForm] = useState(false);
  const [exceededVerificationAttemps, setExceededVerificationAttemps] =
    useState(false);

  const handleVerificationExceeded = () => {
    setExceededVerificationAttemps(true);
  };

  return (
    <div>
      {!exceededVerificationAttemps && !showSecondForm && (
        <RegisterForm
          formData={formData}
          setFormData={setFormData}
          setShowSecondForm={setShowSecondForm}
        />
      )}
      {showSecondForm && (
        <SecondRegisterForm
          formData={formData}
          setFormData={setFormData}
          handleVerificationExceeded={handleVerificationExceeded}
        />
      )}
      {exceededVerificationAttemps && <MaximoIntentosExcedido />}
    </div>
  );  
}

export default Register;
