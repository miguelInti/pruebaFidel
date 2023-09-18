"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Input,
  Button,
  Box,
  IconButton,
  InputAdornment,
  FormHelperText,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";
import { setCookie } from "cookies-next";
import VirtualKeyboard from "@components/VirtualKeyboard";
import KeyboardIcon from "@mui/icons-material/Keyboard";

const AuthForm = ({ onBackClick, onNextClick }) => {
  // useForm
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch, 
    setValue
  } = useForm();

  // Estados
  const [showPassword, setShowPassword] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [openError, setOpenError] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [activeField, setActiveField] = useState(""); // Campo de entrada activo para el teclado virtual
  const [showKeyboard, setShowKeyboard] = useState(false); // Estado para la visibilidad del teclado virtual

  const inputValue = watch(activeField, "");

  const handleAuth = async (data) => {
    const { user, password, host } = data;
    try {
      setIsSyncing(true);
      setErrorMessage(null);

      const response = await fetch("/api/authentication", {
        method: "POST",
        body: JSON.stringify({
          user,
          password,
          host,
        }),
      });
      const responseData = await response.json();

      if (response.ok) {
        setCookie("authConfig", JSON.stringify(data));
        setCookie("token", JSON.stringify(responseData.token));
        onNextClick(responseData); // Llama al callback de onNextClick con los datos de respuesta
      } else {
        setOpenError(true);
        setErrorMessage(responseData.message); // Establecer el mensaje de error recibido desde el servidor
      }
    } catch (error) {
      setMessageError("Error al enviar la solicitud");
      setOpenError(true);
    } finally {
      setIsSyncing(false); // Ocultar el estado de sincronización al finalizar la petición
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const handleInputChange = (value, name) => {
    setValue(name, value);
  };

  const handleFieldFocus = (field) => {
    setActiveField(field);
  };
  
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <form onSubmit={handleSubmit(handleAuth)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "300px",
          }}
        >
          <Input
            {...register("user", { required: "Usuario requerido" })}
            placeholder="Usuario"
            autoFocus
            error={errors.user ? false : true}
            fullWidth
            onFocus={() => handleFieldFocus('user')}
          />
          {errors.user && (
            <FormHelperText error>{errors.user.message}</FormHelperText>
          )}
          <Input
            {...register("password", { required: "Contraseña requerida" })}
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            autoFocus
            fullWidth
            onFocus={() => handleFieldFocus('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleTogglePassword}
                  edge="end"
                  aria-label="toggle password visibility"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors.password && (
            <FormHelperText error>{errors.password.message}</FormHelperText>
          )}
          <Input
            {...register("host", { required: "Host requerido" })}
            placeholder="Host"
            autoFocus
            fullWidth
            onFocus={() => handleFieldFocus('host')}
          />
          {errors.host && (
            <FormHelperText error>{errors.host.message}</FormHelperText>
          )}
          {errorMessage && (
            <FormHelperText error>{errorMessage}</FormHelperText>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isSyncing} // Deshabilitar el botón mientras se está sincronizando
            className={isSyncing ? "syncingButton" : ""}
          >
            {isSyncing ? (
              <>
                Sincronizando{" "}
                <CircularProgress size={24} style={{ marginLeft: 8 }} />
              </>
            ) : (
              "Sincronizar"
            )}
          </Button>

          <Link href="/">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={onBackClick}
            >
              Atrás
            </Button>
          </Link>
          <IconButton
            color="secondary"
            onClick={() => setShowKeyboard(!showKeyboard)}
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
        </Box>
      </form>
      {showKeyboard && (
        <VirtualKeyboard
          inputValue={inputValue}
          onKeyPress={(value) => {
            handleInputChange(value, activeField);
          }}
        />
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
  );
};

export default AuthForm;
