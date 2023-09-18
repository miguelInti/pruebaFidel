"use client";
import Link from "next/link";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { styled } from "@mui/system";
import { theme } from "@styles/muiTheme";
import { Box, Button, Typography } from "@mui/material";

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

const FidelizacionExitosa = () => {
  return (
      <MyContainer maxWidth="xs">
        <MyIcon />
        <MyTypography variant="h4">¡Fidelización exitosa!</MyTypography>
        <MyTypography variant="body1">
          Fidelización exitosa.
        </MyTypography>
        <Link href="/login">
          <Button color="primary" variant="contained">
            Aceptar
          </Button>
        </Link>
      </MyContainer>
  );
}

export default FidelizacionExitosa;
