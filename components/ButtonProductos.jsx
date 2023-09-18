"use client";
import { useState, useEffect } from "react";
import { formatMoney, formatNumber } from "../helpers/format";
import useDinamica from "@hooks/useDinamica";
import useListarPedido from "@hooks/useListarPedido";
import useValidatePassSet from "@hooks/useValidatePassSet";
import ValidarClaveDinamicaComponent from "@components/ClaveDinamica/ClaveDinamica";
import ValidarClaveFijaComponent from "./ClaveFija/ValidarClaveFija";
import {
  Alert,
  Button,
  Box,
  CardMedia,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import { AlarmAddRounded, SendRounded } from "@mui/icons-material";
import { getCookie } from "cookies-next";
import { styled } from "@mui/system";
import { useRouter } from "next/navigation";

const ChipPending = styled(Chip)(({ theme }) => ({
  background: theme.palette.warning.main,
  color: "#000",
}));

const ChipSend = styled(Chip)(({ theme }) => ({
  background: theme.palette.success.main,
  color: "#fff",
}));

const ModalDialog = styled(Dialog)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const ModalTitle = styled(DialogTitle)(({ theme }) => ({}));

const ModalContent = styled(DialogContent)(({ theme }) => ({}));

const ModalContentText = styled(DialogContentText)(({ theme }) => ({}));

const ModalActions = styled(DialogActions)(({ theme }) => ({}));

export const ButtonProductos = ({ p, cashAllowed }) => {
  const router = useRouter();

  const {
    hasQueque,
    doBuy,
    doRedimir,
    cancelarPeticion,
    confirmarPeticion,
    buyModal,
    CloseModalBuy,
    cancelModal,
    setCancelModal,
    redimirModal,
    setRedimirModal,
    messageError,
    openError,
    setOpenError,
  } = useListarPedido();

  const user = JSON.parse(getCookie("user") || "null");
  const puntos = JSON.parse(getCookie("puntos") || "null");

  const [addProductsModal, setAddProductsModal] = useState(false);
  const [cantidad, setCantidad] = useState(1);
  const [openFija, setOpenFija] = useState(false);
  const [openDinamica, setOpenDinamica] = useState(false);
  const [pk, setPk] = useState("");
  const { callbackSolicitarClave } = useDinamica();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleCloseFija = () => {
    setOpenFija(false);
  };

  const handleCloseDinamica = () => {
    setOpenDinamica(false);
  };

  const handleAlertClick = (message) => {
    setShowAlert(true);
    setAlertMessage(
      message ||
        "Para redimir puntos, debes acertarte a la caja para completar tus datos."
    );
  };

  const redimir = (pk, cantidad) => {
    setPk(pk);
    if (user?.clave === "FIJA") {
      setOpenFija(true);
    }
    if (user?.clave === "DINAMICA") {
      callbackSolicitarClave();
      setOpenDinamica(true);
    }
    if (user?.clave === "NINGUNA") {
      doRedimir(p?.pk, cantidad);
    }
    if (user?.clave === "NOCLAVE") {
      handleAlertClick();
    }
  };
  

  useEffect(() => {
    if (openError && messageError) {
      handleAlertClick(messageError);
    }
  }, [messageError]);
  

  const handleArrowButtonClick = (direction) => {
    if (direction === "up") {
      setCantidad((c) => c + 1);
    } else if (direction === "down") {
      if (cantidad <= 1) {
        return;
      }
      setCantidad((c) => c - 1);
    }
  };

  const handleCloseRedimirModal = () => {
    router.back();
  };
 
  const handleCloseAlert = () => {
    setOpenError(false)
    setShowAlert(false)
  };

  return (
    <>
      {hasQueque(p?.pk, "EN_COLA") ? (
        <>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Grid
              container
              direction="row"
              alignItems="center"
              alignContent="center"
              justify="center"
              spacing={2}
            >
              <Grid
                item
                lg={6}
                md={6}
                sm={6}
                xs={6}
                margin={"auto"}
                marginTop={"30px"}
                display={"block"}
                textAlign={"center"}
              >
                <Button
                  onClick={() => cancelarPeticion(p?.pk)}
                  variant="contained"
                  color="secondary"
                  size="medium"
                >
                  Anular
                </Button>
              </Grid>

              <Grid
                item
                lg={6}
                md={6}
                sm={6}
                xs={6}
                margin={"auto"}
                marginTop={"30px"}
                display={"block"}
                textAlign={"center"}
              >
                <Button
                  onClick={() => confirmarPeticion(p?.pk)}
                  disabled
                  variant="contained"
                  color="primary"
                  size="medium"
                >
                  Aceptar
                </Button>
              </Grid>
            </Grid>
            <Grid
              sx={{ mt: "20px", ml: "1px" }}
              container
              justify="center"
              alignItems="center"
              spacing={1}
            >
              <ChipPending
                icon={<AlarmAddRounded />}
                label="Pendiente"
                color="secondary"
              />
            </Grid>
          </Grid>
        </>
      ) : hasQueque(p?.pk, "EN_CAMINO") ? (
        <>
          <Grid
            container
            direction="row"
            alignItems="center"
            alignContent="center"
            justify="center"
            spacing={3}
          >
            <Grid
              item
              lg={6}
              md={6}
              sm={6}
              xs={6}
              margin={"auto"}
              display={"block"}
              textAlign={"center"}
            >
              <Button
                onClick={() => cancelarPeticion(p?.pk)}
                disabled
                variant="contained"
                color="secondary"
                size="medium"
              >
                Anular
              </Button>
            </Grid>

            <Grid
              item
              lg={6}
              md={6}
              sm={6}
              xs={6}
              margin={"auto"}
              display={"block"}
              textAlign={"center"}
            >
              <Button
                onClick={() => confirmarPeticion(p?.pk)}
                variant="contained"
                color="primary"
                size="medium"
              >
                Aceptar
              </Button>
            </Grid>
            <Grid
              style={{ marginTop: 10 }}
              container
              justify="center"
              alignItems="center"
              spacing={1}
            >
              <ChipSend
                icon={<SendRounded style={{ color: "#fff" }} />}
                label="Enviado"
              />
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <Grid
              container
              direction="row"
              alignItems="center"
              alignContent="center"
              justify="center"
              spacing={1}
            >
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography align="center">
                  Puntos
                  <Typography align="center">
                    {formatNumber(p?.puntosParaCanjear)}
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item lg={6} md={6} sm={6} xs={6}>
            <Grid
              container
              direction="row"
              spacing={1}
              alignItems="center"
              justify="center"
            >
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography align="center">
                  Precio
                  <Typography align="center">
                    {formatMoney(p?.valorParaCanjear)}
                  </Typography>
                </Typography>
              </Grid>
              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                xs={12}
                margin={"auto"}
                display={"block"}
                textAlign={"center"}
                marginLeft={"10px"}
              >
                <Button
                  onClick={() => setAddProductsModal(true)}
                  variant="contained"
                  color="primary"
                  size="medium"
                >
                  Añadir
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Snackbar
            open={showAlert}
            autoHideDuration={6000}
            onClose={handleCloseAlert}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Alert onClose={handleCloseAlert} severity="error">
              {alertMessage}
            </Alert>
          </Snackbar>

          <Dialog
            fullWidth
            maxWidth="sm"
            open={addProductsModal}
            onClose={() => setAddProductsModal(false)}
          >
            <DialogTitle>Añadir Productos</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography variant="h4" align="center">
                      {p.nombre}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      style={{ marginTop: 11, marginLeft: 33 }}
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        border="1px solid #ccc"
                        borderRadius={4}
                        p={1}
                      >
                        <Button
                          onClick={() => handleArrowButtonClick("down")}
                          variant="contained"
                          color="primary"
                        >
                          -
                        </Button>
                        <Box
                          border="1px solid #ccc"
                          borderRadius={4}
                          padding="10"
                          style={{ margin: "10px" }}
                        >
                          <Typography variant="h4" style={{ margin: "0 10px" }}>
                            {cantidad}
                          </Typography>
                        </Box>
                        <Button
                          onClick={() => handleArrowButtonClick("up")}
                          variant="contained"
                          color="primary"
                        >
                          +
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Grid container justify="flex-start">
                {" "}
                {/* Agrega justifyContent="flex-start" */}
                <Button
                  onClick={() => setAddProductsModal(false)}
                  color="primary"
                >
                  Cancelar
                </Button>
              </Grid>
              <Grid>
                <Button
                  disabled={
                    user === null ||
                    !(
                      Number(puntos?.cantidadPuntosDisponibles) >=
                      Number(p?.puntosParaCanjear) * cantidad
                    )
                  }
                  onClick={() => redimir(p?.pk, cantidad.toString())}
                  variant="contained"
                  color="secondary"
                  size="medium"
                >
                  redimir
                </Button>
              </Grid>
              <Grid>
                <Button
                  onClick={() => doBuy(p?.pk, cantidad.toString())}
                  variant="contained"
                  color="primary"
                  size="medium"
                  disabled={!cashAllowed}
                >
                  Comprar
                </Button>
              </Grid>
            </DialogActions>
          </Dialog>

          <ValidarClaveFijaComponent
            pk={pk}
            openFija={openFija}
            handleCloseFija={handleCloseFija}
            cantidad={cantidad}
          />

          <ValidarClaveDinamicaComponent
            pk={pk}
            openDinamica={openDinamica}
            handleCloseDinamica={handleCloseDinamica}
            cantidad={cantidad}
          />
        </>
      )}
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
      {buyModal && (
        <ModalDialog
          fullWidth
          maxWidth="sm"
          open={true}
          onClose={() => setBuyModal(false)}
        >
          <ModalTitle>Comprado</ModalTitle>
          <ModalContent>
            <ModalContentText>
              <Typography variant="h4" align="center">
                En un momento, le traerán su pedido.
              </Typography>
            </ModalContentText>
          </ModalContent>
          <ModalActions>
            <Button onClick={CloseModalBuy} color="primary">
              Volver al {user?.nombre ? "Inicio" : "Registro"}
            </Button>
          </ModalActions>
        </ModalDialog>
      )}

      {cancelModal ? (
        <ModalDialog
          fullWidth
          maxWidth="sm"
          open={true}
          onClose={() => setCancelModal(false)}
        >
          <ModalTitle>Anulado</ModalTitle>
          <ModalContent>
            <ModalContentText>
              <Typography variant="h4" align="center">
                Pedido anulado.
              </Typography>
            </ModalContentText>
          </ModalContent>
          <ModalActions>
            <Button onClick={CloseModalBuy} color="primary">
              Volver al Inicio
            </Button>
          </ModalActions>
        </ModalDialog>
      ) : null}
    </>
  );
};
