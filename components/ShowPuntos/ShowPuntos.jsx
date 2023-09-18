"use client"
import useApi from "@hooks/useApi";
import { Grid, Typography } from "@mui/material";
import { getCookie, setCookie } from "cookies-next";
import {  useEffect } from "react";
import { useRouter } from "next/navigation";

const ShowPuntos = () => {
    const router = useRouter();
    const user = getCookie('user') ? JSON.parse(getCookie('user')) : null;
    const serial = getCookie('serial') ? JSON.parse(getCookie('serial')) : null;
    const codigoCasino = getCookie('codigoCasino') ? JSON.parse(getCookie('codigoCasino')) : null;
    const token = getCookie('token') ? JSON.parse(getCookie('token')) : null;

    const [ loadingVisualizarPuntos, errorVisualizarPuntos, apiDataVisualizarPuntos, fetchDataVisualizarPuntos ] = useApi();
    
    useEffect(() => {
        if (user !== null) {
            sendPuntos();
        }
    }, []);

    useEffect(() => {
      if (apiDataVisualizarPuntos) {
        if (errorVisualizarPuntos === "No se conecto al servidor") {
          setMsnPuntosError(errorVisualizarPuntos?.error);
          setOpenPuntosError(true);
        }
        if (apiDataVisualizarPuntos?.statusDTO?.code === "38") {
          router.push("/login");
        }
        if (apiDataVisualizarPuntos?.statusDTO?.code === "00") {
          const puntosCookie = {
            cantidadPuntosDisponibles:
              apiDataVisualizarPuntos?.cantidadPuntosDisponibles,
            puntosAcumuladosHoy:
              apiDataVisualizarPuntos?.puntosAcumuladosHoy,
            puntosIniciales: apiDataVisualizarPuntos?.puntosIniciales,
            puntosRedimidosHoy:
              apiDataVisualizarPuntos?.puntosRedimidosHoy,
          };
          setCookie("puntos", puntosCookie);
          }
      }
    }, [apiDataVisualizarPuntos])
    
    const sendPuntos = async () => {
        try {
            const authConfig = getCookie('authConfig') ? JSON.parse(getCookie('authConfig')) : null;

            const requestBody = {
                host: authConfig?.host,
                codigoCasino,
                serial,
                numeroDocumento: user?.numeroDocumento,
                token,
            };

            fetchDataVisualizarPuntos('/api/fidelizacion/visualizar-puntos', 'POST', requestBody)
        } catch (error) {
            setMsnPuntosError(error?.error);
            setOpenPuntosError(true);
        }
    };

    useEffect(() => {
        let id;
        if (user !== null) {
            id = setInterval(() => {
                sendPuntos();
            }, 1000 * 30);
        }
        return () => clearInterval(id);
    }, [sendPuntos]);

  return (
    <Grid item>
      {!loadingVisualizarPuntos ? (
        <Typography variant="h4" align="center">
          {/* Utiliza apiDataVisualizarPuntos directamente aquí */}
          {apiDataVisualizarPuntos
            ? apiDataVisualizarPuntos.cantidadPuntosDisponibles
            : 'No hay puntos disponibles'}
        </Typography>
      ) : (
        <Typography variant="h4" align="center">
          Cargando Puntos...
        </Typography>
      )}
    </Grid>
  );
};

export default ShowPuntos;
