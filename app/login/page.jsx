"use client";
import {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { Grid, Input, Button, Typography, CircularProgress, Snackbar, Alert, IconButton, InputLabel, FormHelperText } from "@mui/material";
import { BarIcon } from "@components/icons/Bar";
import { Cart } from "@components/icons/Cart";
import { RegistrarIcon } from "@components/icons/RegistrarIcon";
import useLoginUser from "@hooks/useLoginUser";
import { styled } from "@mui/system";
import Link from 'next/link'
import ButtonHelper from "@components/ButtonHelper/ButtonHelper";
import VirtualKeyboard from "@components/VirtualKeyboard";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import { getCookie } from 'cookies-next';


const StyledButton = styled(Button)({
  display: "grid",
  justifyContent: "center",
  justifyItems: "center",
  "& span.MuiButton-label": {
    justifyItems: "center",
  },
});

const LoginForm = () => {

  const [isFromQr, setIsFromQr] = useState()

  useEffect(() => {
    const fromQr = getCookie("fromQr")
        ? JSON.parse(getCookie("fromQr"))
        : null;
    setIsFromQr(fromQr);
  }, [])
  

  const {
    fidelizar,
    useLoginUserLoading,
    error,
    setError,
  } = useLoginUser();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch
  } = useForm();

  const numeroDocumento = watch('numeroDocumento', '');

  const onSubmit = (data) => {
    fidelizar(data);
  };


  const [showKeyboard, setShowKeyboard] = useState(false);

  const handleToggleKeyboard = () => {
    setShowKeyboard(!showKeyboard);
  };

  useEffect(() => {
    const handleNotificationPermission = () => {
      if ("Notification" in window) {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            // El usuario ha otorgado permiso para mostrar notificaciones.
            // Puedes mostrar una notificación aquí si lo deseas.
          }
        });
      }
    };
    handleNotificationPermission();
  });


  const showNotification = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('Título de la notificación', {
            body: 'Contenido de la notificación',
          });
        }
      });
    }
  };

  return (
    <Grid
      item
      xs={12}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginTop: "10px",
        marginLeft: "20px",
        width: "100%",
      }}
    >
      <form onSubmit={handleSubmit(showNotification)} style={{ width: "100%" }}>
        <Grid container spacing={1} direction="column" alignItems="flex-start">
          <Grid item xs={12} width="100%">
            <InputLabel style={{ color: "white" }} htmlFor="numeroDocumento">
              Cédula
            </InputLabel>
            <Input
              name="numeroDocumento"
              variant="outlined"
              fullWidth
              {...register("numeroDocumento", {
                required: "Documento Requerido",
              })}
              sx={{ maxWidth: "250px" }}
              autoFocus
              inputProps={{
                style: {
                  color: "black",
                  backgroundColor: "white",
                  borderRadius: "5px",
                },
              }}
            />
            {errors.numeroDocumento && (
              <FormHelperText error>
                {errors.numeroDocumento.message}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12} width="100%">
            <Button
              disabled={useLoginUserLoading}
              type="submit"
              variant="contained"
              color="primary"
              className={useLoginUserLoading ? "syncingButton" : ""}
              fullWidth
              sx={{ maxWidth: "250px" }}
            >
              {useLoginUserLoading ? (
                <>
                  Iniciando Sesión{" "}
                  <CircularProgress size={24} style={{ marginLeft: 8 }} />
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </Button>
          </Grid>
          <Grid item xs={12} width="100%">
            {!isFromQr ? (
              <Link href="/">
                <Button
                  variant="contained"
                  color="info"
                  fullWidth
                  sx={{ maxWidth: "250px" }}
                >
                  Volver
                </Button>
              </Link>
            ) : null}
          </Grid>
          <Grid item>
            <IconButton
              color="secondary"
              onClick={handleToggleKeyboard}
              sx={{
                marginTop: "-15px",
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
      </form>
      <Grid item>
        {showKeyboard && (
          <VirtualKeyboard
            inputValue={numeroDocumento}
            onKeyPress={(value) => setValue("numeroDocumento", value)}
            keyboardType={"numeric"}
          />
        )}
      </Grid>
      <Snackbar
        open={error.open}
        autoHideDuration={6000}
        onClose={() => setError({ open: false })}
      >
        <Alert onClose={() => setError({ open: false })} severity="error">
          {error.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

const ButtonsGroup = () => {
  return (
    <Grid
      container
      paddingLeft={3}
      paddingTop={2}
      marginBottom={90}
      item
      xs={12}
      md={10}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link href="/register" passHref style={{ textDecoration: "none" }}>
            <StyledButton>
              <RegistrarIcon />
              <Typography variant="h6" style={{ color: "white" }}>
                Registrarse
              </Typography>
            </StyledButton>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/bar" passHref style={{ textDecoration: "none" }}>
            <StyledButton>
              <BarIcon />
              <Typography variant="h6" style={{ color: "white" }}>
                Redención
              </Typography>
            </StyledButton>
          </Link>
        </Grid>
        <Grid item>
          <StyledButton>
            <Cart />
            <Typography variant="h6" style={{ color: "white" }}>
              Pedidos
            </Typography>
          </StyledButton>
        </Grid>
        <Grid item>
          <ButtonHelper />
        </Grid>
      </Grid>
    </Grid>
  );
};


const LoginPage = () => {
  return (
    <Grid container spacing={0} sx={{ minHeight: "100vh" }}>
      <LoginForm />
      <ButtonsGroup />
    </Grid>
  );
};

export default LoginPage;
