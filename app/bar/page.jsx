"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, Margin } from "@mui/icons-material";
import Alert from "@components/Alerts/Alert";
import { formatNumber, shortName } from "@helpers/format";
import { styled } from "@mui/system";
import { getCookie } from "cookies-next";
import { theme } from "@styles/muiTheme";
import Link from "next/link";
import useProduct from "@hooks/useProduct";


const RootBox = styled(Box)({
  display: 'grid',
  gridAutoFlow: 'column',
  gap: '1rem',
  maxWidth: '100%',
  margin: '10px',
  padding: '1rem 1rem',
});

const CustomCard = styled(Card)({
  width: '270px',
  minWidth: '270px',
  height: 280,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: "transparent",
  color: theme.palette.primary.main,
  border: "5px solid",
  borderColor: theme.palette.primary.main,
  borderRadius: 20,
});

const CustomCardActions = styled(CardActions)({
  width: "100%",
  padding: 0,
});

const CustomButton = styled(Button)({
  color: "#fff",
});

const Bar = () => {
  const [currentItemIdx, setCurrentItemgIdx] = useState(0);
  const [user, setUser] = useState(null);
  const puntosBar = JSON.parse(getCookie("puntos") || "null") || "";
  const { categorias, openError, messageError, setOpenError } = useProduct();

  useEffect(() => {
    const fetchUserFromCookie = () => {
      const userCookie = getCookie("user");
      if (userCookie) {
        const parsedUser = JSON.parse(userCookie);
        setUser(parsedUser);
      }
    };
    fetchUserFromCookie();
  }, []);

  const prevSlide = () => {
    if (categorias) {
      const resetToVeryBack = currentItemIdx === 0;
      const index = resetToVeryBack ? categorias.length - 1 : currentItemIdx - 1;
      setCurrentItemgIdx(index);
    }
  };

  const nextSlide = () => {
    if (categorias) {
      const resetIndex = currentItemIdx === categorias.length - 1;
      const index = resetIndex ? 0 : currentItemIdx + 1;
      setCurrentItemgIdx(index);
    }
  };

  const activeItemsSourcesFromState = categorias
    ? categorias.slice(currentItemIdx, currentItemIdx + 3)
    : [];

  const itemsSourcesToDisplay = () => {
    if (categorias) {
      return activeItemsSourcesFromState.length < 3
        ? [
            ...activeItemsSourcesFromState,
            ...categorias.slice(0, 3 - activeItemsSourcesFromState.length),
          ]
        : activeItemsSourcesFromState;
    }
    return [];
  };
  

  return (
    <RootBox p={1}>
      <Grid container direction="row" spacing={3}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Grid
            container
            direction="row"
            spacing={2}
            alignItems="center"
            alignContent="center"
            justifyContent="space-between"
          >
            <Grid item lg={2} md={2} sm={2} xs={2}>
              <Link href={user ? "/home" : "/login"}>
                <Button size="large" variant="contained" color="primary">
                  Volver
                </Button>
              </Link>
            </Grid>
            <Grid item lg={8} md={8} sm={8} xs={8}>
              <Typography
                variant="h4"
                align="center"
                style={{ fontWeight: "bold" }}
              >
                {user ? shortName(user?.nombre) : "Anónimo"}
              </Typography>
            </Grid>
            <Grid item lg={2} md={2} sm={2} xs={2}>
              {user ? (
                <>
                  <Typography
                    variant="h4"
                    align="center"
                    style={{ fontWeight: "bold" }}
                  >
                    {formatNumber(puntosBar?.cantidadPuntosDisponibles)}
                  </Typography>
                  <Typography variant="h6" align="center">
                    Puntos
                  </Typography>
                </>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
        {/* fin del header */}
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Grid id="left" onClick={prevSlide}>
            <Button style={{ color: "white" }}>
              <ArrowBackIos style={{ fontSize: 80 }} />
            </Button>
          </Grid>

          <RootBox>
            {categorias ? (
              itemsSourcesToDisplay().map((c, index) => (
                <Link href={`${c.categoria}`} key={index}>
                  <CustomCard key={index}>
                    <CardMedia
                      image={c.imagenCategoria}
                      title={c.imagenCategoria}
                      style={{
                        height: "100%",
                        width: "100%",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backdropFilter: "opacity(50%)",
                      }}
                    />
                    <CustomCardActions>
                      <Grid container justify="center">
                        <Grid item lg={12} style={{ width: "100%" }}>
                          <CustomButton
                            size="medium"
                            variant="contained"
                            color="primary"
                            fullWidth
                          >
                            {c.categoria}
                          </CustomButton>
                        </Grid>
                      </Grid>
                    </CustomCardActions>
                  </CustomCard>
                </Link>
              ))
            ) : (
              <CircularProgress color="primary" />
            )}
          </RootBox>

          <Grid onClick={nextSlide}>
            <Button style={{ color: "white" }}>
              <ArrowForwardIos style={{ fontSize: 80 }} />
            </Button>
          </Grid>
        </Box>
      </Grid>
      {messageError ? (
        <Alert
          open={openError}
          onClose={() => {
            setOpenError(false);
            history.push("/login");
          }}
          message={messageError}
        />
      ) : null}
    </RootBox>
  );
};

export default Bar;
