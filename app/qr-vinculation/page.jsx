"use client";
import FidelizacionExitosa from "@components/VincularMaquina/FidelizacionExitosa";
import {
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Box,
  Button
} from "@mui/material";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { useEffect, useState } from "react";


const QrVinculation = ({ searchParams }) => {
  const host = searchParams.host || null;
  const machine = searchParams.machine || null;
  const casino = searchParams.casino || null;
  const [params, setParams] = useState({host, machine, casino})
  const [isSyncing, setIsSyncing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [messageError, setMessageError] = useState("");
  const [openError, setOpenError] = useState(false);
  const [loadingFidelizacion, setLoadingFidelizacion] = useState(false);
  const [fidelizated, setFidelizated] = useState(false);
  const [processState, setProcessState] = useState(0);

  useEffect(() => {
    if (host !== null) {
      handleAuth(host, machine, casino);
    }
  }, []);

  const handleAuth = async (host, machine, casino) => {
    try {
      setIsSyncing(true);
      setErrorMessage(null);
      const body = JSON.stringify({
        user: "AppSistema",
        password: "AppSistema135.",
        host,
      });
      const response = await fetch("/api/authentication", {
        method: "POST",
        body,
      });
      const responseData = await response.json();

      if (response.ok) {
        setCookie("authConfig", body);
        setCookie("token", JSON.stringify(responseData.token));
        handleFidelization(machine, casino, responseData.token, body);
        setProcessState(1);
      } else {
        setOpenError(true);
        setErrorMessage(responseData.message); // Establecer el mensaje de error recibido desde el servidor
      }
    } catch (error) {
      setMessageError("Error al enviar la solicitud de autenticación");
      setOpenError(true);
    } finally {
      setIsSyncing(false); // Ocultar el estado de sincronización al finalizar la petición
    }
  };

  const handleFidelization = async (machine, casino, token, authConfig) => {
    try {
      setLoadingFidelizacion(true);
      const response = await fetch("/api/fidelizacion/iniciar-fidelizacion", {
        method: "POST",
        body: JSON.stringify({
          token,
          host,
          serial: machine,
        }),
      });
      const responseData = await response.json();

      if (response.ok) {
        if (responseData.statusDTO.code === "00") {
          setCookie("codigoCasino", JSON.stringify(casino));
          setCookie("serial", JSON.stringify(machine));
          setCookie("fromQr", true);
          setFidelizated(true);
        } else {
          setMessageError(responseData?.statusDTO?.message);
          setOpenError(true);
          setFidelizated(false);
        }
      } else {
        setFidelizated(false);
        setMessageError(responseData?.statusDTO.message || 'No se ha logrado vincular');
        setOpenError(true);
      }
    } catch (error) {
      setMessageError("Error al enviar la solicitud");
      setOpenError(true);
      setFidelizated(false);
    } finally {
      setLoadingFidelizacion(false);
    }
  };

  return (
    <>
      {fidelizated ? (
        <FidelizacionExitosa />
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          {processState === 0 ? (
            <Box textAlign="center">
              {isSyncing ? (
                <>
                  <CircularProgress size={24} style={{ marginBottom: 8 }} />
                  <Typography variant="h4">Sincronizando</Typography>
                </>
              ) : (
                <Typography variant="h4">Sincronizar</Typography>
              )}
            </Box>
          ) : (
            <Box textAlign="center">
              {loadingFidelizacion ? (
                <>
                  <CircularProgress size={24} style={{ marginLeft: 8 }} />
                  <Typography variant="h4">Fidelizando</Typography>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ maxWidth: "350px", marginBottom: "10px" }}
                    onClick={() =>
                      handleAuth(params.host, params.machine, params.casino)
                    }
                  >
                    Reintentar
                  </Button>

                  <Link href="/login">
                    <Button
                      variant="contained"
                      color="info"
                      fullWidth
                      sx={{ maxWidth: "350px" }}
                    >
                      Terminar
                    </Button>
                  </Link>
                </>
              )}
            </Box>
          )}
          <Snackbar
            open={openError}
            autoHideDuration={6000}
            onClose={() => setOpenError(false)}
          >
            <Alert onClose={() => setOpenError(false)} severity="error">
              {messageError}
            </Alert>
          </Snackbar>
        </Box>
      )}
    </>
  );
};

export default QrVinculation;
