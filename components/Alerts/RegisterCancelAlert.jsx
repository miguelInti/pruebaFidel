'use client'
import { styled } from "@mui/system";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import Link from "next/link";

const StyledDialogTitle = styled(DialogTitle)({
  textAlign: "center",
});

const AlertDialog = ({ open, onClose }) => {
  const backToLogin = () => {
    // Realizar acciones necesarias al volver a la página de login
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <StyledDialogTitle>¿Está seguro que desea salir?</StyledDialogTitle>
      <DialogContent>
        <DialogContentText>
          Si sale, perderá cualquier información ingresada en el formulario.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Link href="/login" passHref>
          <Button color="primary" autoFocus>
            Sí, salir
          </Button>
        </Link>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
