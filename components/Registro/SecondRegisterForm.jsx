"use client";
import { useState, useEffect } from "react";
import RegisterCancelAlert from "@components/Alerts/RegisterCancelAlert";
import RegistroExitoso from "@components/Registro/RegistroExitoso";
import { useForm } from "react-hook-form";
import { styled } from "@mui/system";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  Input,
  Grid,
  Button,
  Checkbox,
  Typography,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Snackbar,
  Alert,
  darken,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import strings from "@constants/Strings/Strings";
import { theme } from "@styles/muiTheme";
import useApi from '@hooks/useApi';
import { getCookie } from 'cookies-next';
import VirtualKeyboard from "@components/VirtualKeyboard";
import KeyboardIcon from "@mui/icons-material/Keyboard";

const Container = styled("div")({
  // Estilos del contenedor
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
});

const Form = styled("form")({
  // Estilos del formulario
  width: "100%",
  maxWidth: 600,
  padding: theme.spacing(2),
  display: "grid",
  gridTemplateColumns: "1fr",
  gridRowGap: theme.spacing(2),
  zIndex: 100,
});


const MyButton = styled(Button)({
  // Estilos del botón
  color: "white",
  background: "#60A1FF",
  "&:hover": {
    backgroundColor: darken("#60A1FF", 0.2),
  },
});



const SecondRegisterForm = (props) => {
  // Props
  const {
    formData,
    setFormData,
    handleVerificationExceeded,
  } = props;

  // Información para peticiones de
  const authConfig = JSON.parse(getCookie("authConfig") || "null") || "";
  const token = JSON.parse(getCookie("token") || "null") || "";
  const codigoCasino = JSON.parse(getCookie("codigoCasino") || "null") || "";
  const serial = JSON.parse(getCookie("serial")|| "null") || "";
  
  // useApi
  const [
    loadingVerificationCode,
    errorVerificationCode,
    apiDataVerificationCode,
    fetchDataVerifactionCode,
  ] = useApi();
  const [loadingRegister, errorRegister, apiDataRegister, fetchDataRegister] =
    useApi();
  const [loadingHabeasData, errorHabeasData, apiHabeasData, fetchHabeasData] =
    useApi();

  // useForm
  const { register, handleSubmit, setValue, watch } = useForm();

  //Estados
  const [allowedReg, setAllowedReg] = useState(false);
  const [isValidPhone, setisValidPhone] = useState(false);
  const [matchButtonActive, setMatchButtonActive] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const [textoHabeas, setTextoHabeas] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [successfulRegister, setSuccessfulRegister] = useState(false);
  const [activeField, setActiveField] = useState(""); // Campo de entrada activo para el teclado virtual
  const [showKeyboard, setShowKeyboard] = useState(false); // Estado para la visibilidad del teclado virtual

  const inputValue = watch(activeField, "");

  // Código de verificación
  const [receivedCode, setReceivedCode] = useState("");
  const [verificationCodeAttemps, setVerificationCodeAttemps] = useState(1);

  // Información del formulario
  const celular = watch("celular", '');
  const verificationCode = watch("verificationCode", '');
  const terminosCondiciones = watch(
    "terminosCondiciones",
    formData.terminosCondiciones
  );
  const politicaProteccion = watch(
    "politicaProteccion",
    formData.politicaProteccion
  );

  useEffect(() => {
    setFormData({
      ...formData,
      celular,
      terminosCondiciones,
      politicaProteccion,
    });
    if (celular.length === 10) {
      setisValidPhone(true);
    } else {
      setisValidPhone(false);
    }
  }, [celular, terminosCondiciones, politicaProteccion, setFormData]);

  const solicitarClaveValidacion = async () => {
    const apiUrl = '/api/fidelizacion/enviar-clave-validacion'; // URL de la API
    const httpMethod = 'POST'; // Método HTTP (por ejemplo: GET, POST, PUT, DELETE)
    const { user: login, host } = authConfig;
    const requestBody = { token, host, codigoCasino, serial, login, celular }; // Datos del cuerpo (body) de la solicitud
    try {
      await fetchDataVerifactionCode(apiUrl, httpMethod, requestBody);
    } catch (error) {
      setMessageError('Error al enviar la solicitud');
      setOpenError(true);
    }
  };

  useEffect(() => {
    if (apiDataVerificationCode) {
      if (errorVerificationCode) {
        setMessageError(errorVerificationCode);
        setOpenError(true);
      }
      if (apiDataVerificationCode?.statusDTO.code === "00") {
        setReceivedCode(apiDataVerificationCode.clave);
        setMatchButtonActive(true);
      } else {
        setMessageError(apiDataVerificationCode?.statusDTO?.message);
        setOpenError(true);
      }
    }
  }, [apiDataVerificationCode])
  

  const handleMatchCode = () => {
    if (receivedCode === verificationCode) {
      setAllowedReg(true);
    } else {
      setVerificationCodeAttemps(verificationCodeAttemps + 1);
      setAllowedReg(false);
      setMessageError('El código no coincide.');
      setOpenError(true);
    }
    if (verificationCodeAttemps >= 3) {
      handleVerificationExceeded();
    }
  };

  const consultarTextoHabeasData = async () => {
    const apiUrl = "/api/fidelizacion/consultar-texto-habeas-data"; // URL de la API
    const httpMethod = "POST"; // Método HTTP (por ejemplo: GET, POST, PUT, DELETE)
    const { host } = authConfig;
    const requestBody = { token, host }; // Datos del cuerpo (body) de la solicitud

    try {
      setOpenTerms(true);
      await fetchHabeasData(apiUrl, httpMethod, requestBody);
    } catch (error) {
      setMessageError('Error al enviar la solicitud');
      setOpenError(true);
    }
  };

  useEffect(() => {
    if ( apiHabeasData ) {
      if (errorHabeasData) {
        setMessageError(errorHabeasData);
        setOpenError(true);
      }
      if (apiHabeasData?.statusDTO.code === "00") {
        setTextoHabeas(apiHabeasData.textoHabeas);
      } else {
        setMessageError(apiHabeasData?.statusDTO?.message);
        setOpenError(true);
      }
    }
  }, [apiHabeasData])

  const prerregistrarCliente = async () => {
    const apiUrl = "/api/fidelizacion/prerregistrar-cliente"; // URL de la API
    const httpMethod = "POST"; // Método HTTP (por ejemplo: GET, POST, PUT, DELETE)
    const {host, user: login} = authConfig;
    const requestBody = { token, host, login, codigoCasino, celular, idTipoIdentificacion: formData.tipoIdentificacion, identificacion: formData.identificacion, serial }; // Datos del cuerpo (body) de la solicitud

    try {
      await fetchDataRegister(apiUrl, httpMethod, requestBody);
    } catch (error) {
      setMessageError('Error al enviar la solicitud');
      setOpenError(true);
    }
  };

  useEffect(() => {
    if (apiDataRegister) {
      if (errorRegister) {
        setMessageError(errorRegister);
        setOpenError(true);
      }
      if (apiDataRegister?.statusDTO.code === "00") {
        handleSuccessfulRegister();
      } else {
        setMessageError(apiDataRegister?.statusDTO?.message);
        setOpenError(true);
      }
    }
  }, [apiDataRegister]);

  const handleSuccessfulRegister = () => {
    setSuccessfulRegister(true);
  };
  

  const onSubmit = (data) => {
    if (!formData.terminosCondiciones || !formData.politicaProteccion) {
      setMessageError(
        'Debe aceptar los términos y condiciones y la Política de protección de datos personales para continuar.'
      );
      setOpenError(true);
    } else {
      prerregistrarCliente();
    }
  };

  const handleAlert = () => {
    // Implementa la lógica para manejar el cuadro de diálogo de cancelación
  };

  const handleInputChange = (value, name) => {
    setValue(name, value);
  };

  const handleFieldFocus = (field) => {
    setActiveField(field);
    setShowKeyboard(true);
  };

  return (
    <>
      {successfulRegister ? (
        <RegistroExitoso />
      ) : (
        <Container>
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Input
                    id="celular"
                    type="tel"
                    placeholder="Celular"
                    {...register("celular", {
                      required: "Número de celular requerido",
                    })}
                    
                    onFocus={()=> handleFieldFocus ('celular')}
                    inputProps={{
                      style: { color: "white" },
                      pattern: strings.intReg,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <Input
                    id="verificacion"
                    type="tel"
                    placeholder="Código de verificación"
                    {...register("verificationCode", {
                      required: "Código de verificación requerido",
                    })} // Registro del campo verificationCode
                    onFocus={() => handleFieldFocus('verificationCode')}
                    inputProps={{
                      style: { color: "white" },
                      pattern: strings.intReg,
                    }}
                    endAdornment={
                      allowedReg ? (
                        <InputAdornment position="end">
                          <IconButton>
                            <CheckCircleOutline style={{ color: "green" }} />
                          </IconButton>
                        </InputAdornment>
                      ) : null
                    }
                    style={{
                      border: allowedReg ? "2px solid green" : "",
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={2}>
              <Grid item>
                <MyButton
                  disabled={!isValidPhone || loadingVerificationCode}
                  variant="contained"
                  onClick={solicitarClaveValidacion}
                  className={loadingVerificationCode ? "syncingButton" : ""}
                >
                  {loadingVerificationCode ? (
                    <>
                      Solicitando código{" "}
                      <CircularProgress size={24} style={{ marginLeft: 8 }} />
                    </>
                  ) : (
                    "Solicitar código"
                  )}
                </MyButton>
              </Grid>
              <Grid item>
                <MyButton
                  onClick={handleMatchCode}
                  disabled={!matchButtonActive}
                  variant="contained"
                >
                  Validar código
                </MyButton>
              </Grid>
              <Grid item>
                <IconButton
                  color="secondary"
                  onClick={() => setShowKeyboard(!showKeyboard)}
                  sx={{
                    marginTop: "-18px",
                  }}
                >
                  <KeyboardIcon 
                    sx={{
                      fontSize: "3rem",
                    }}
                  />
                </IconButton>
              </Grid>
            </Grid>
            <FormControl fullWidth>
              <Grid item container alignItems="center">
                <Checkbox
                  name="politicaProteccion"
                  {...register("politicaProteccion")}
                  inputProps={{
                    "aria-label": "Aceptar términos y condiciones",
                  }}
                  style={{ color: "white" }}
                />
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ color: "white" }}
                >
                  Autotizo el uso de mis datos según la&nbsp;
                  <Link
                    variant="body2"
                    onClick={consultarTextoHabeasData}
                    style={{ color: "white", textDecoration: "underline" }}
                  >
                    Política de protección de datos personales
                  </Link>
                </Typography>
              </Grid>
            </FormControl>
            <FormControl fullWidth>
              <Grid item container alignItems="center">
                <Checkbox
                  name="terminosCondiciones"
                  {...register("terminosCondiciones")}
                  inputProps={{
                    "aria-label": "Aceptar términos y condiciones",
                  }}
                  style={{ color: "white" }}
                />
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ color: "white" }}
                >
                  He leído y estoy de acuerdo con los&nbsp;
                  <Link
                    variant="body2"
                    onClick={consultarTextoHabeasData}
                    style={{ color: "white", textDecoration: "underline" }}
                  >
                    Términos y Condiciones&nbsp;
                  </Link>
                  de la web *
                </Typography>
              </Grid>
            </FormControl>

            <Grid container direction="row" spacing={2}>
              <Grid item xs={4}>
                <MyButton
                  onClick={() => setOpenAlert(true)}
                  variant="contained"
                >
                  Volver
                </MyButton>
              </Grid>
              <Grid item>
                <MyButton
                  disabled={!allowedReg || loadingRegister}
                  onClick={onSubmit}
                  variant="contained"
                  color="primary"
                  style={{ width: "100%" }}
                  className={loadingRegister ? "syncingButton" : ""}
                >
                  {loadingRegister ? (
                    <>
                      Registrando{" "}
                      <CircularProgress size={24} style={{ marginLeft: 8 }} />
                    </>
                  ) : (
                    "Registrar"
                  )}
                </MyButton>
              </Grid>
            </Grid>
          </Form>
          {showKeyboard && (
              <VirtualKeyboard
                inputValue={inputValue} // Asegúrate de que `inputValue` esté definido en tu estado.
                onKeyPress={(value) => {
                  handleInputChange(value, activeField);
                  // Implementa la lógica para manejar la entrada del teclado virtual aquí
                }}
                keyboardType={'numeric'}
              />
            )}
          <Dialog
            open={openTerms}
            onClose={() => setOpenTerms(false)}
            maxWidth="md"
            style={{ zIndex: 9999 }}
          >
            <DialogTitle>Términos y condiciones</DialogTitle>
            <DialogContent>
              <Box mb={2}>
                <Typography variant="body1">
                  {loadingHabeasData ? (
                    <>
                      Cargando Términos y Condiciones{" "}
                      <CircularProgress size={24} style={{ marginLeft: 8 }} />
                    </>
                  ) : (
                    textoHabeas
                  )}
                </Typography>
              </Box>
            </DialogContent>
            <Box p={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenTerms(false)}
              >
                Aceptar
              </Button>
            </Box>
          </Dialog>
          <RegisterCancelAlert open={openAlert} onClose={handleAlert} />
          <Snackbar
            open={openError}
            autoHideDuration={6000}
            onClose={() => setOpenError(false)}
          >
            <Alert onClose={() => setOpenError(false)} severity="error">
              {messageError}
            </Alert>
          </Snackbar>
        </Container>
      )}
    </>
  );
};

export default SecondRegisterForm;
