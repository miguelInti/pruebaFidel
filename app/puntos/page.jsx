"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography, CircularProgress, } from "@mui/material";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { formatNumber, shortName } from "@helpers/format";
import usePuntosVencer from "@hooks/usePuntosAVencer";
import SingleBar from "@components/SingleBar/SingleBar";


const max = 150;
const Puntos = ({ onBackClick }) => {
  const [user, setUser] = useState(null);
  const puntos = JSON.parse(getCookie("puntos") || "null") || "";

  const [ dataVencer, sendPuntosVencer, loadingVisualizarPuntos ] = usePuntosVencer();

  useEffect(() => {
    const fetchUserFromCookie = () => {
      const userCookie = getCookie("user");
      if (userCookie) {
        const parsedUser = JSON.parse(userCookie);
        setUser(parsedUser);
      }
    };
    fetchUserFromCookie();
    sendPuntosVencer();
  }, []);

  return (
    <Box p={2}>
      <Grid container direction="column" spacing={1}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Grid
            container
            direction="row"
            spacing={2}
            alignItems="center"
            marginTop={-1}
          >
            <Grid item lg={2} md={2} sm={2} xs={2}>
              <Link href="/home">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onBackClick}
                >
                  Volver
                </Button>
              </Link>
            </Grid>
            <Grid item lg={8} md={8} sm={8} xs={8}>
              <Typography
                variant="h4"
                align="right"
                style={{ fontWeight: "bold" }}
              >
                {user ? shortName(user?.nombre) : "Anonimo"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* fin del header */}
        <Box p={2}>
          <Grid container direction="row" spacing={2}>
            <Grid item lg={6} md={6} sm={6} xs={6} style={{ paddingLeft: 20 }}>
              <Grid container alignItems="flex-end" style={{ marginBottom: 5 }}>
                <Typography variant="h4" align="right">
                  Detalle de puntos
                </Typography>
              </Grid>
              <Grid
                container
                direction="column"
                spacing={2}
                marginTop={1}
                style={{ paddingLeft: 40 }}
              >
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    spacing={3}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="h6" align="right">
                      Iniciales hoy
                    </Typography>
                    <Typography
                      variant="h5"
                      align="right"
                      style={{ fontWeight: "normal" }}
                    >
                      {puntos?.puntosIniciales
                        ? formatNumber(puntos?.puntosIniciales)
                        : "0"}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid
                    container
                    direction="row"
                    spacing={3}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="h6" align="right">
                      Acumulados hoy
                    </Typography>
                    <Typography
                      variant="h5"
                      align="right"
                      style={{ fontWeight: "normal" }}
                    >
                      {puntos?.puntosAcumuladosHoy
                        ? formatNumber(puntos?.puntosAcumuladosHoy)
                        : "0"}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid
                    container
                    direction="row"
                    spacing={3}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="h6" align="right">
                      Redimidos hoy
                    </Typography>
                    <Typography
                      variant="h5"
                      align="right"
                      style={{ fontWeight: "normal" }}
                    >
                      {puntos?.puntosRedimidosHoy > 0 ? "-" : null}
                      {puntos?.puntosRedimidosHoy
                        ? formatNumber(puntos?.puntosRedimidosHoy)
                        : "0"}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid
                    container
                    direction="row"
                    spacing={3}
                    alignItems="center"
                    justifyContent="space-between"
                    style={{ backgroundColor: "#EC407A" }}
                  >
                    <Typography
                      variant="h5"
                      align="right"
                      style={{ fontWeight: "normal" }}
                    >
                      Disponibles
                    </Typography>
                    <Typography
                      variant="h5"
                      align="right"
                      style={{ fontWeight: "normal" }}
                    >
                      {puntos?.cantidadPuntosDisponibles
                        ? formatNumber(puntos?.cantidadPuntosDisponibles)
                        : "0"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={5} md={5} sm={5} xs={5} marginTop="-10px">
              <Box
                padding={1}
                justifyContent="center"
                alignItems="center"
                justifyItems="center"
              >
                <Typography variant="h7" align="right">
                  Puntos a vencer en 30 dias:
                </Typography>
                <Typography
                  style={{ marginBottom: 10 }}
                  variant="h4"
                  align="right"
                >
                  {dataVencer[dataVencer.length - 1]?.data}
                </Typography>

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  {!loadingVisualizarPuntos ? (
                    dataVencer.map((e, i) => {
                      let denominator =
                        dataVencer[dataVencer.length - 1]?.data;
                      let y =
                        denominator !== 0
                          ? max - (e?.data * max) / denominator
                          : 1;
                      return (
                        <SingleBar
                          key={i}
                          width="40px"
                          height="150px"
                          color="#EF2425"
                          label={e?.data}
                          percentage={`${e?.label}`}
                          data={`M 0 ${max} L 0 ${y} L 60 ${y} l 60 ${max} Z`}
                        />
                      );
                    })
                  ) : (
                    <>
                      <Typography>
                        Consultando puntos a vencer{" "}
                        <CircularProgress size={24} style={{ marginLeft: 8 }} />
                      </Typography>
                    </>
                  )}

                  <div style={{ display: "flex", alignSelf: "flex-end" }}>
                    <Typography
                      style={{ lineHeight: 1 }}
                      variant="h7"
                      align="right"
                      marginBottom="4px"
                    >
                      días
                    </Typography>
                  </div>
                </div>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
};

export default Puntos;
