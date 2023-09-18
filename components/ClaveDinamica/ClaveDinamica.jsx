import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input, 
  FormControl, 
  Typography,
  IconButton,
  Grid
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useDinamica from "@hooks/useDinamica";
import {getCookie} from 'cookies-next'
import { styled } from "@mui/system";
import { useRouter } from "next/navigation";
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

export default function ValidarClaveDinamicaComponent({
  openDinamica,
  handleCloseDinamica,
  pk,
  cantidad
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm();
  const {
    callbackValidarClaveDinamica,
    redimirModal,
    setRedimirModal,
    errorDinamica,
  } = useDinamica();
  const user = JSON.parse(getCookie("user") || "null");

  // Estados
  const [showKeyboard, setShowKeyboard] = useState(false); // Estado para la visibilidad del teclado virtual

  const dinamica = watch("dinamica", "");

  const handleCloseRedimirModal = () => {
    router.back();
  };

  const onSubmit = (data) => {
    callbackValidarClaveDinamica(data.dinamica, pk, cantidad);
    reset();
    handleCloseDinamica();
  };

  const handleInputChange = (value) => {
    setValue("dinamica", value);
  };

  return (
    <>
      <Dialog
        open={openDinamica}
        onClose={handleCloseDinamica}
        style={{ left: -100 }}
        maxWidth="md"
      >
        <DialogTitle>Contraseña Dinámica</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <Input
                  id="dinamica"
                  type="password"
                  {...register("dinamica", {
                    required: "Contraseña requerida",
                  })}
                  inputProps={{
                    style: { color: "black" },
                  }}
                />
                {errorDinamica ? "Error en la clave dinamica" : null}
              </FormControl>
              <DialogActions>
                <Button
                  onClick={handleCloseDinamica}
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
                      marginTop: "1rem",
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
                inputValue={dinamica}
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
    </>
  );
}
