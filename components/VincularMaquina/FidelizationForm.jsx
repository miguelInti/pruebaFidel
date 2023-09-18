"use client";
import { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  Box,
  Button,
  FormControl,
  InputLabel,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { setCookie, getCookie } from 'cookies-next';
import FidelizacionExitosa from "@components/VincularMaquina/FidelizacionExitosa";
import useApi from '@hooks/useApi';


const FidelizationForm = () => {
  // useApi
  const [loading, error, apiData, fetchData] = useApi();

  // Cookies
  const authConfig = JSON.parse(getCookie("authConfig") || "null") || "";
  const token = JSON.parse(getCookie("token") || "null") || "";

  // Estados
  const [casinos, setCasinos] = useState([]);
  const [loadingCasinos, setLoadingCasinos] = useState(false);
  const [machines, setMachines] = useState([]);
  const [loadingMachines, setLoadingMachines] = useState(false);
  const [fidelizated, setFidelizated] = useState(false)
  const [loadingFidelizacion, setLoadingFidelizacion] = useState(false)
  const [openError, setOpenError] = useState(false);
  const [messageError, setMessageError] = useState("");

  // Router
  const router = useRouter();

  // useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  // Información del formulario
  const selectedCasino = watch("casino"); // Obtener el valor actual del campo casino

  const handleCasinos = async () => {
    try {
      setLoadingCasinos(true)
      const response = await fetch("/api/configuracion/listar-casinos", {
        method: "POST",
        body: JSON.stringify({
          token,
          host: authConfig.host,
        }),
      });
      const responseData = await response.json();

      if (response.ok) {
        setCasinos(responseData);
      }
    } catch (error) {
      setOpenError(true);
      setMessageError(error || 'No se ha logrado listar casinos');
    } finally {
      setLoadingCasinos(false)
    }
  };

  const handleMachines = async (codigoCasino) => {
    try {
      setLoadingMachines(true)
      const response = await fetch("/api/configuracion/listar-dispositivos", {
        method: "POST",
        body: JSON.stringify({
          token,
          host: authConfig.host,
          codigoCasino,
        }),
      });
      const responseData = await response.json();
      
      if (response.ok) {
        setMachines(responseData);
      }
    } catch (error) {
      setOpenError(true);
      setMessageError(error || 'No se ha logrado listar dispositivos');
    } finally {
      setLoadingMachines(false)
    }
    
  };

  useEffect(() => {
    handleCasinos();
  }, []);

  useEffect(() => {
    if (selectedCasino) {
      handleMachines(selectedCasino);
    }
  }, [selectedCasino]);

  const onSubmit = async (data) => {
    const { machine } = data;
    try {
      setLoadingFidelizacion(true)
      const response = await fetch("/api/fidelizacion/iniciar-fidelizacion", {
        method: "POST",
        body: JSON.stringify({
          token,
          host: authConfig.host,
          serial: machine
        }),
      });
      const responseData = await response.json();

      if (response.ok) {
        if (responseData.statusDTO.code === '00') {
          setCookie("codigoCasino", JSON.stringify(data.casino));
          setCookie("serial", JSON.stringify(data.machine));
          setFidelizated(true)
        } else {
          setMessageError(responseData?.statusDTO?.message);
          setOpenError(true);
          setFidelizated(false)
        }
      } else {
        setFidelizated(false)
      }
    } catch (error) {
      setMessageError('Error al enviar la solicitud');
      setOpenError(true);
      setFidelizated(false)
    } finally {
      setLoadingFidelizacion(false)
    }
  };

  return (
    <>
      {fidelizated ? (
        <FidelizacionExitosa />
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                maxWidth: "300px",
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="casino-label">
                  {loadingCasinos ? (
                    <>
                      Cargando casinos{" "}
                      <CircularProgress size={24} style={{ marginLeft: 8 }} />
                    </>
                  ) : (
                    "Seleccione casino"
                  )}
                </InputLabel>
                <Select
                  {...register("casino", {
                    required: "El campo del casino es requerido",
                  })}
                  labelId="casino-label"
                  label="Seleccione un casino"
                  defaultValue=""
                  displayEmpty
                  className="fixed-width-select"
                  disabled={loadingCasinos}
                >
                  {casinos.length > 0
                    ? casinos.map((casino) => (
                        <MenuItem
                          key={casino.codigoCasino}
                          value={casino.codigoCasino}
                        >
                          {casino.nombreCasino}
                        </MenuItem>
                      ))
                    : null}
                </Select>
                {errors.casino && <span>{errors.casino.message}</span>}
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="machine-label">
                  {loadingMachines ? (
                    <>
                      Cargando máquinas{" "}
                      <CircularProgress size={24} style={{ marginLeft: 8 }} />
                    </>
                  ) : (
                    "Seleccione máquina"
                  )}
                </InputLabel>
                <Select
                  {...register("machine", {
                    required: "El campo de la máquina es requerido",
                  })}
                  labelId="machine-label"
                  defaultValue=""
                  displayEmpty
                  className="fixed-width-select"
                  disabled={loadingMachines || loadingCasinos}
                  label="Seleccione máquina"
                >
                  {
                    machines.length > 0
                      ? machines.map((machine) => (
                          <MenuItem
                            key={machine.numeroDispositivo}
                            value={machine.serial}
                          >
                            {machine.numeroDispositivo}
                          </MenuItem>
                        ))
                      : null
                    // (
                    //   <MenuItem value="" disabled={!selectedCasino}>
                    //     {!selectedCasino
                    //       ? "Seleccione un casino"
                    //       : "No hay máquinas disponibles"}
                    //   </MenuItem>
                    // )
                  }
                </Select>
                {errors.machine && <span>{errors.machine.message}</span>}
              </FormControl>

              <Button
                disabled={loadingFidelizacion}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className={loadingFidelizacion ? "syncingButton" : ""}
              >
                {loadingFidelizacion ? (
                  <>
                    Fidelizando{" "}
                    <CircularProgress size={24} style={{ marginLeft: 8 }} />
                  </>
                ) : (
                  "Terminar"
                )}
              </Button>
            </Box>
          </form>
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

export default FidelizationForm;
