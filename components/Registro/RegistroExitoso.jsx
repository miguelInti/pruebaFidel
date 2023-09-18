"use client";
import Link from "next/link";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { styled } from "@mui/system";
import { Box, Typography, Button } from "@mui/material";
import { theme } from '@styles/muiTheme';

const MyContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

const MyIcon = styled(CheckCircleOutlineIcon)({
  fontSize: 100,
  color: theme.palette.success.main,
  marginBottom: theme.spacing(2),
});

const MyTypography = styled(Typography)({
  marginBottom: theme.spacing(4),
  textAlign: "center",
});

const MyButton = styled(Button)({
  marginTop: theme.spacing(2),
});

const RegistroExitoso = () => {
  return (
    <MyContainer maxWidth="xs">
      <MyIcon />
      <MyTypography variant="h4">¡Registro exitoso!</MyTypography>
      {/* Personaliza el mensaje aquí */}
      <MyTypography variant="body1">
        Gracias por registrarte en nuestra plataforma. Esperamos que disfrutes
        de nuestros servicios.
      </MyTypography>
      <MyTypography variant="h5">
        Recuerda completar tu registro en la caja.
      </MyTypography>
      <Link href="/">
        <MyButton color="primary" variant="contained">
          Aceptar
        </MyButton>
      </Link>
    </MyContainer>
  );
};

export default RegistroExitoso;
