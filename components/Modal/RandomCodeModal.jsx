import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Dialog,
  Button,
  CircularProgress,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import useApi from "@hooks/useApi";
import { getCookie, deleteCookie } from "cookies-next";
import useCloseSession from "@hooks/useCloseSession";
import { useRouter } from 'next/navigation';

const RandomCodeModal = ({ onCloseModal }) => {
  const urlHost = process.env.NEXT_PUBLIC_BACKEND_API_HOST || "http://localhost:3001";
  const router = useRouter();
  const {
    CallbackCloseSession,
    CallbackUserNull
  } = useCloseSession();

  const [showModal, setShowModal] = useState(true);
  const [token, setToken] = useState();
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [validationMessage, setValidationMessage] = useState("");
  const [isValidationActive, setIsValidationActive] = useState(true); // Start validation immediately
  const [canCloseModal, setCanCloseModal] = useState(false);
  const [timerInterval, setTimerInterval] = useState(null);
  const [validationInterval, setValidationInterval] = useState(null);
  const [isValidationFailed, setIsValidationFailed] = useState(false);

  const [loadingGetToken, errorGetToken, apiDataGetToken, fetchDataGetToken] =
    useApi();
  const [
    loadingValidateCode,
    errorValidateCode,
    apiDataValidateCode,
    fetchDataValidateCode,
  ] = useApi();

  const getToken = () => {
    const currentId = getCookie("numeroDocumento")
      ? JSON.parse(getCookie("numeroDocumento"))
      : null;
    const currentSerial = getCookie("serial")
      ? JSON.parse(getCookie("serial"))
      : null;
    const url = `${urlHost}/api/v1/activityToken/${currentId}/${currentSerial}`;
    fetchDataGetToken(url, "GET");
  };

  useEffect(() => {
    if (apiDataGetToken && apiDataGetToken.token) {
      const receivedToken = apiDataGetToken.token;
      const userId = apiDataGetToken.userId;
      setToken(receivedToken);
  
      const newTimerInterval = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(newTimerInterval);
            clearInterval(newValidationInterval);
            return 0;
          }
        });
      }, 1000);
      setTimerInterval(newTimerInterval);
  
      const newValidationInterval = setInterval(() => {
        validateToken(userId);
      }, 5000);
      setValidationInterval(newValidationInterval);
  
      return () => {
        clearInterval(newTimerInterval);
        clearInterval(newValidationInterval);
      };
    }
  }, [apiDataGetToken]);
  

  const validateToken = (userId) => {
    const url = `${urlHost}/api/v1/status/${userId}`;
    fetchDataValidateCode(url, "GET");
  };

  useEffect(() => {
    if (errorValidateCode) {
      setValidationMessage(
        "Código no se pudo validar correctamente. Tu sesión fue cerrada."
      );
      setIsValidationActive(false);
      clearInterval(validationInterval); // Clear the validation interval
      clearInterval(timerInterval); // Clear the timer interval
      setIsValidationFailed(true);
    }
    if (apiDataValidateCode && isValidationActive) {
      if (!apiDataValidateCode.isValidated) {
        if (timeRemaining <= 0) {
          setValidationMessage(
            "Código no se pudo validar correctamente. Tu sesión fue cerrada."
          );
          setIsValidationActive(false);
          clearInterval(validationInterval); // Clear the validation interval
          clearInterval(timerInterval); // Clear the timer interval
          setIsValidationFailed(true);
        }
      } else {
        setValidationMessage("Código validado exitosamente");
        setIsValidationActive(false);
        setCanCloseModal(true); // Permitir cerrar el modal una vez que la validación haya terminado
        clearInterval(validationInterval); // Clear the validation interval
        clearInterval(timerInterval); // Clear the timer interval
      }
    }
  }, [apiDataValidateCode, isValidationActive, timeRemaining, errorValidateCode]);

  const closeModal = () => {
    if (canCloseModal) {
      setShowModal(false);
      clearInterval(validationInterval); // Clear the validation interval
      clearInterval(timerInterval); // Clear the timer interval
      onCloseModal();
    }
  };

  const closeSession = () => {
    CallbackCloseSession();
    deleteCookie("user");
    deleteCookie("puntos");
    deleteCookie("showMessage");
    router.push("/login");
    closeModal();
  };

  useEffect(() => {
    if (isValidationActive) {
      getToken();
    }
  }, [isValidationActive]);

  useEffect(() => {
    if (isValidationFailed) {
      setCanCloseModal(true); // Permitir cerrar el modal una vez que la validación haya terminado
      closeSession();
    }
  }, [isValidationFailed]);

  return (
    <Dialog
      open={showModal}
      onClose={canCloseModal ? closeModal : null}
      slotProps={{ backdrop: { onClick: null } }}
    >
      <Box p={2}>
        {validationMessage ? (
          <>
            {validationMessage.includes("Código no se pudo validar") ? (
              <>
                <Box p={2} textAlign="center">
                  <ErrorOutlineIcon fontSize="large" color="error" />
                  <Typography variant="h6">{validationMessage}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={closeModal}
                    fullWidth
                  >
                    Cerrar
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Box p={2} textAlign="center">
                  <CheckCircleOutlineIcon fontSize="large" color="success" />
                  <Typography variant="h6">{validationMessage}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={closeModal}
                    fullWidth
                  >
                    Aceptar
                  </Button>
                </Box>
              </>
            )}
          </>
        ) : (
          <>
            <Typography variant="h5" align="center">
              Ingresa el código en tu máquina:
            </Typography>
            <Typography variant="h4" align="center">
              {token ? token : "Esperando token"}
            </Typography>
            <Typography variant="body1" align="center">
              Tiempo restante: {timeRemaining} segundos
            </Typography>
            <Box mt={2} textAlign="center">
              <CircularProgress />
            </Box>
          </>
        )}
      </Box>
    </Dialog>
  );
};

export default RandomCodeModal;
