import React, {useEffect} from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Input,
  Typography,
  Snackbar,
  Alert,
  Grid,
  IconButton
} from "@mui/material";
import { useState } from "react"
import { useForm } from "react-hook-form";
import useValidatePassSet from "@hooks/useValidatePassSet";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { styled } from "@mui/system";
import VirtualKeyboard from "@components/VirtualKeyboard";
import KeyboardIcon from "@mui/icons-material/Keyboard";

const ModalDialog = styled(Dialog)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const ModalTitle = styled(DialogTitle)(({ theme }) => ({}));

const ModalContent = styled(DialogContent)(({ theme }) => ({}));

const ModalContentText = styled(DialogContentText)(({ theme }) => ({}));

const ModalActions = styled(DialogActions)(({ theme }) => ({}));

export default function ValidarClaveFijaComponent({
  openFija,
  handleCloseFija,
  pk,
  cantidad
}) {
  const router = useRouter();
  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const { callbackValidate, redimirModal, setRedimirModal, errorMessage, errorValidate, setErrorValidate } =
    useValidatePassSet();
  const user = JSON.parse(getCookie("user") || "null");

  //Estados
  const [showKeyboard, setShowKeyboard] = useState(false); // Estado para la visibilidad del teclado virtual
  
  const contrasenaFija = watch('contrasenaFija', '');

  const handleCloseRedimirModal = () => {
    router.back();
  };

  const onSubmit = (data) => {
    callbackValidate(data.contrasenaFija, pk, cantidad);
  };

  const handleInputChange = (value) => {
    setValue('contrasenaFija', value);
  };

  return (
    <>
      <Dialog
        open={openFija}
        onClose={()=>{}}
        style={{ left: -100 }}
        maxWidth="md"
      >
        <DialogTitle>Contraseña fija</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <Input
                  id="contrasenaFija"
                  type="password"
                  {...register("contrasenaFija", {
                    required: "Contraseña requerida",
                  })}
                  inputProps={{
                    style: { color: "black" },
                  }}
                />
              </FormControl>

              <DialogActions>
                <Button
                  onClick={handleCloseFija}
                  variant="contained"
                  color="primary"
                  autoFocus
                >
                  Cerrar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  autoFocus
                >
                  Solicitar
                </Button>
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
              </DialogActions>
            </form>
          </DialogContentText>
          <Grid>
            {showKeyboard && (
              <VirtualKeyboard
                inputValue={contrasenaFija}
                onKeyPress={(value) => handleInputChange(value)}
                keyboardType={'numeric'}
              />
            )}
          </Grid>
        </DialogContent>
      </Dialog>
      <ModalDialog
        fullWidth
        maxWidth="sm"
        open={redimirModal}
        onClose={() => setRedimirModal(false)}
      >
        <ModalTitle> Redimido</ModalTitle>
        <ModalContent>
          <ModalContentText>
            <Typography variant="h4" align="center">
              En un momento, le traerán su pedido.
            </Typography>
          </ModalContentText>
        </ModalContent>
        <ModalActions>
          <Button
            onClick={handleCloseRedimirModal}
            color="secondary"
            variant="contained"
          >
            Volver al {user?.nombre ? "Inicio" : "Registro"}
          </Button>
        </ModalActions>
      </ModalDialog>
      <Snackbar
            open={errorValidate}
            autoHideDuration={6000}
            onClose={() => setErrorValidate(false)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Alert onClose={() => setErrorValidate(false)} severity="error">
              {errorMessage}
            </Alert>
          </Snackbar>
    </>
  );
}