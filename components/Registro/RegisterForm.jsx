"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { styled } from "@mui/system";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  Grid,
  Button,
  Snackbar,
  Alert,
  darken,
  FormHelperText,
  CircularProgress,
  IconButton
} from "@mui/material";
import strings from "@constants/Strings/Strings";
import RegisterCancelAlert from "@components/Alerts/RegisterCancelAlert";
import { theme } from "@styles/muiTheme";
import useApi from "@hooks/useApi";
import { getCookie } from "cookies-next";
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

const DropDown = styled(Select)({
  // Estilos del Select
  color: "black",
  backgroundColor: "white",
  borderRadius: "5px",
  padding: "10px",
  marginTop: "10px",
});

const MyButton = styled(Button)({
  // Estilos del botón
  color: "white",
  background: "#60A1FF",
  "&:hover": {
    backgroundColor: darken("#60A1FF", 0.2),
  },
});

const RegisterForm = (props) => {
  const { formData, setFormData, setShowSecondForm } = props;

  //Estados
  const [openAlert, setOpenAlert] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false); // Estado para la visibilidad del teclado virtual

  const  [loading, error, apiData, fetchData]  = useApi();

  // useForm
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue
  } = useForm();

  useEffect(() => {
    register("identificacion");
  }, [register]);
  
  // Información del formulario
  const tipoIdentificacion = watch("tipoIdentificacion", "5002");
  const identificacion = watch("identificacion", "");

  const [idTypes, setIdTypes] = useState();

  useEffect(() => {
    const { host } = JSON.parse(getCookie("authConfig") || "null") || "";
    const token = JSON.parse(getCookie("token") || "null") || "";

    // Parámetros del useApi
    const apiUrl = "/api/fidelizacion/consultar-informacion-prerregistro"; // URL de la API
    const httpMethod = "POST"; // Método HTTP (por ejemplo: GET, POST, PUT, DELETE)
    const requestBody = { token, host }; // Datos del cuerpo (body) de la solicitud
    fetchData(apiUrl, httpMethod, requestBody);
  }, []);

  useEffect(() => {
    if (apiData) {
      if (apiData?.statusDTO.code === "00") {
        setIdTypes(apiData.tiposIdentificacion);
        setOpenError(false);
      } else if (apiData?.statusDTO.code !== "00") {
        setMessageError(apiData?.statusDTO?.message);
        setOpenError(true);
      }
    } else if (error) {
      setMessageError(apiData?.statusDTO?.message);
      setOpenError(true);
    }
  }, [apiData, error]);

  useEffect(() => {
    setFormData({
      tipoIdentificacion,
      identificacion,
    });
  }, [tipoIdentificacion, identificacion, setFormData]);

  const handleAlert = () => {
    // Implementa la lógica para manejar el cuadro de diálogo de cancelación
  };

  const onSubmit = (data) => {
    setFormData({
      ...formData,
      data,
    });
    setShowSecondForm(true);
  };

  return (
    <Container>
      <Grid container sx={{maxWidth: "400px"}}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth>
            <InputLabel id="castipoIdentificacionno-label">
              {loading ? (
                <>
                  Cargando tipos de documento{" "}
                  <CircularProgress size={24} style={{ marginLeft: 8 }} />
                </>
              ) : (
                "Seleccione tipo de documento"
              )}
            </InputLabel>
            <Select
              labelId="tipoIdentificacion-label"
              id="tipoIdentificacion"
              value={tipoIdentificacion}
              disabled={loading}
              label="Seleccione documento"
              {...register("tipoIdentificacion", {
                required: "Tipo de identificación requerio.",
              })}
            >
              {idTypes?.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.nombre}
                </MenuItem>
              ))}
            </Select>
            {errors.tipoIdentificacion && (
              <FormHelperText error>
                {errors.tipoIdentificacion.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth>
            <Input
              placeholder="Número identificación"
              id="identificacion"
              type="tel"
              {...register("identificacion", {
                required: "Número de identificación requerido",
              })}
              inputProps={{
                style: { color: "white" },
                pattern: strings.intReg,
              }}
            />
            {errors?.identificacion && (
              <FormHelperText error>
                {errors?.identificacion?.message}
              </FormHelperText>
            )}
          </FormControl>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={4}>
              <MyButton onClick={() => setOpenAlert(true)} variant="contained">
                Volver
              </MyButton>
            </Grid>
            <Grid item>
              <MyButton
                // disabled={!allowedReg}
                type="submit"
                variant="contained"
                color="primary"
                style={{ width: "100%" }}
              >
                Siguiente
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
        </Form>
      </Grid>
      {showKeyboard && (
        <VirtualKeyboard
          inputValue={identificacion}
          onKeyPress={(value) => {
            setValue("identificacion", value);
          }}
          keyboardType={"numeric"}
        />
      )}
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
  );
};

export default RegisterForm;
