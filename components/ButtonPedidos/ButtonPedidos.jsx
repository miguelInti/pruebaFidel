import { useState, useEffect } from "react";
import { styled } from "@mui/system";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { AlarmAddRounded, SendRounded } from "@mui/icons-material";
import { formatMoney, formatNumber } from "@helpers/format";
import useListarPedido from "@hooks/useListarPedido";
import { Cart } from "@components/icons/Cart";
import { theme } from "@styles/muiTheme";

const RootBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "8px !important",
  gap: 12,
  "&:last-child": {
    padding: 0,
  },
});

const DetailsBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  alignContent: "center",
  justifyContent: "space-between",
  gap: 16,
});

const CoverImage = styled(CardMedia)({
  width: 90,
  height: 90,
  objectFit: "cover",
  backgroundSize: "contain",
});

const ControlsBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-end",
});

const NotificationBox = styled(Box)({
  width: 32,
  height: 32,
  backgroundColor: 'yellow',
  position: "absolute",
  top: 0,
  right: 0,
  borderRadius: 99,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "black"
});

const PendingChip = styled(Chip)({
  background: theme.palette.warning.main,
  color: "#000",
});

const SendChip = styled(Chip)({
  background: theme.palette.success.main,
  color: "#fff",
});

function ButtonPedidos() {
  const [open, setOpen] = useState(false);
  const { pedidos, cancelarPeticion, confirmarPeticion, getListProducts } =
    useListarPedido();

    useEffect(() => {
      getListProducts(); // Call the function once during component initialization
    }, []);

  const handleClickOpen = () => {
    setOpen(true);
    getListProducts();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const CancelPedido = (pk) => {
    cancelarPeticion(pk);
    getListProducts();
  };

  const ConfirmPedido = (pk) => {
    confirmarPeticion(pk);
    getListProducts();
  };

  return (
    <>
      <Button
        style={{ display: "grid", position: "relative" }}
        onClick={handleClickOpen}
      >
        {pedidos?.length > 0 && (
          <NotificationBox
            color={pedidos[0].estado === "EN_COLA" ? "yellow" : "green"}
          >
            {pedidos?.length}
          </NotificationBox>
        )}
        <Cart />
        <Typography variant="h6" style={{ color: "white" }}>
          Pedidos
        </Typography>
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle>Mis Pedidos</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid
              container
              direction="row"
              justify="center"
              alignContent="center"
              spacing={1}
            >
              {pedidos?.length > 0 ? (
                pedidos?.map((pedido) => (
                  <Grid item key={pedido?.idPeticion}>
                    <RootBox variant="outlined">
                      <CoverImage
                        image={
                          pedido?.imagen
                            ? pedido?.imagen
                            : "https://via.placeholder.com/150"
                        }
                        title={pedido.nombre}
                      />
                      <DetailsBox>
                        <CardContent>
                          <Typography variant="h5">
                            {pedido.nombre}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="textSecondary"
                          >
                            {pedido.categoriaPremio}
                          </Typography>
                          {pedido.estado === "EN_COLA" ? (
                            <PendingChip
                              size="medium"
                              icon=<AlarmAddRounded />
                              label="Pendiente"
                            />
                          ) : (
                            <SendChip
                              size="medium"
                              icon=<SendRounded style={{ color: "#fff" }} />
                              label="Enviado"
                            />
                          )}
                        </CardContent>

                        <ControlsBox>
                          <Typography variant="h5">
                            {pedido.medioPago === "Efectivo"
                              ? formatMoney(pedido.valorParaCanjear)
                              : formatNumber(pedido.puntosParaCanjear)}
                          </Typography>
                          {pedido.estado === "EN_COLA" ? (
                            <Button
                              size="medium"
                              variant="contained"
                              color="primary"
                              onClick={() => CancelPedido(pedido.pk)}
                            >
                              Anular
                            </Button>
                          ) : (
                            <Button
                              size="medium"
                              variant="contained"
                              color="secondary"
                              onClick={() => ConfirmPedido(pedido.pk)}
                            >
                              Confirmar
                            </Button>
                          )}
                        </ControlsBox>
                      </DetailsBox>
                    </RootBox>
                  </Grid>
                ))
              ) : (
                <Typography
                  color="error"
                  align="center"
                  variant="h5"
                >
                  Sin pedidos
                </Typography>
              )}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
            autoFocus
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ButtonPedidos;
