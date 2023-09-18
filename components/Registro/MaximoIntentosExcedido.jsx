"use client";
import Link from "next/link";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { styled } from "@mui/system";
import { Box, Typography, Button } from "@mui/material";

const MyContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
}));

const MyIcon = styled(ErrorOutlineIcon)(({ theme }) => ({
  fontSize: 100,
  color: theme.palette.error.main,
  marginBottom: theme.spacing(2),
}));

const MyTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  textAlign: 'center',
}));

const MyButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const MaximoIntentosExcedido = () => {
  return (
    <MyContainer maxWidth="xs">
      <MyIcon />
      <MyTypography variant="h4">Máximo de intentos excedido</MyTypography>
      {/* Personaliza el mensaje aquí */}
      <MyTypography variant="body1">
        Lo sentimos, has excedido el número máximo de intentos para verificar tu
        número de celular. Por favor, contáctanos para recibir ayuda adicional.
      </MyTypography>
      <Link href="/">
        <MyButton color="primary" variant="contained">
          Aceptar
        </MyButton>
      </Link>
    </MyContainer>
  );
};

export default MaximoIntentosExcedido;
