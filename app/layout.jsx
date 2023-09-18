'use client'
import '@styles/globals.css';
import React, { useState, useEffect } from "react";
import RandomCodeModal from "@components/Modal/RandomCodeModal"; // Importa tu componente de modal aquí
import RotatePhoneModal from "@components/Modal/RotatePhoneModal ";
import useOnline from "@hooks/useOnline";
import Alert from "@components/Alerts/Alert";
import useToken from "@hooks/useToken";
import { Suspense } from "react";
import LoadingComponent from "@components/Loading/LoadingComponent";
import { ThemeProvider } from "@mui/system";
import { theme } from "@styles/muiTheme";
import { Box } from "@mui/material";
import { getCookie } from 'cookies-next';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';
import JuegoResponsable from '../public/icons/JuegoResponsable.png';


const RootLayout = ({ children }) => {
  const isVertical = useMediaQuery('(orientation: portrait)');
  useToken();
  const { isOnline, setIsOnline } = useOnline();

  const [showTokenModal, setShowTokenModal] = useState(false);

  const handleModalClose = () => {
    setShowTokenModal(false); // Cierra el modal estableciendo showModal en false
  };

  useEffect(() => {
    // Abre el modal automáticamente cada 30 segundos
    const interval = setInterval(() => {
      const currentUser = getCookie("user")
        ? JSON.parse(getCookie("user"))
        : null;
      const currentSerial = getCookie("serial")
        ? JSON.parse(getCookie("serial"))
        : null;
      const fromQr = getCookie("fromQr")
        ? JSON.parse(getCookie("fromQr"))
        : null;
      
      if (currentUser && currentSerial && fromQr) {
        // Muestra la notificación cuando se abre el modal
        showNotification();
        setShowTokenModal(true);
      }
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Función para mostrar la notificación
  
  const showNotification = () => {
    console.log("Entra a show");
    if ("Notification" in window && Notification.permission === "granted") {
      console.log('Entra al if');
      const notification = new Notification("Modal Abierto", {
        body: "El modal se ha abierto.",
        // Puedes personalizar aún más la notificación aquí si es necesario.
      });
    }
  };

  return (
    <html lang="es">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          {isOnline ? null : (
            <Alert
              open={isOnline}
              onClose={() => setIsOnline(false)}
              message="No hay conexion al internet"
            />
          )}
          <Box position="absolute" bottom="5px" left="5px">
            <Image
              src={JuegoResponsable}
              style={{
                position: "fixed",
                bottom: 0,
                padding: "10px",
                width: "133px",
                height: "69px",
              }}
              alt="Picture of the author"
              priority
            />
          </Box>
          <Suspense fallback={<LoadingComponent />}>
            <RotatePhoneModal open={isVertical} onClose={() => {}} />
            {children}
            {showTokenModal && (
              <RandomCodeModal onCloseModal={() => setShowTokenModal(false)} />
            )}
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
