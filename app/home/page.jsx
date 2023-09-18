"use client";
import { useState, useEffect } from "react";
import { Grid, Box, Button, Typography, CircularProgress } from "@mui/material";
import { ButtonsGroup } from "@components/Nav/ButtonsGroup";
import { styled } from "@mui/system";
import { getCookie } from "cookies-next";
import useCloseSession from "@hooks/useCloseSession";
import ShowPuntos from '@components/ShowPuntos/ShowPuntos'
import ChangePassword from "@components/ChangePassword";


const StyledTypography = styled(Typography)({
  display: "flex",
  fontWeight: 600,
  marginRight: -70,
  fontSize: 45,
});

const ButtonsGroupContainer = styled(Box)({

  '@media (min-width: 975px)': {
    marginTop: 60,
  },

  '@media (max-width: 975px)': {
    position: "block",
    bottom: 20,
    top: 40,
  },
     
});

const Home = () => {
  const [isShow, setIsShow] = useState(false);
  
  const [user, setUser] = useState(null);

  const {
    CallbackCloseSession,
    CallbackUserNull,
    messageError,
    openError,
    setOpenError,
    loading
  } = useCloseSession();

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

  const leaveLobby = () => {
    CallbackCloseSession();
  };

  return (
    <Box position="relative" height="100vh" p={1}>
      <Grid container justifyContent="space-between" p={1}>
        <Grid item>
          <Button
            size="large"
            variant="text"
            color="secondary"
            onClick={() => setIsShow(!isShow)}
          >
            {isShow ? "Ocultar" : "Mostrar"}
          </Button>
          {user?.clave === 'FIJA' ? <ChangePassword /> : null}
        </Grid>
        <Grid item>
          <Typography
            variant="h4"
            color="secondary"
            align="right"
            style={{ wordWrap: "break-word", fontWeight: 700 }}
          >
            {isShow && user ? user?.nombre : null}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            disabled={loading}
            size="large"
            onClick={leaveLobby}
            variant="contained"
            color="secondary"
            className={loading ? "syncingButton" : ""}
          >
            {loading ? (
              <>
                Cerrando Sesión{" "}
                <CircularProgress size={24} style={{ marginLeft: 8 }} />
              </>
            ) : (
              "Cerrar Sesión"
            )}
          </Button>
        </Grid>

        <Grid
          container
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={0} 
          style={{ marginTop: '-30px' }} 
        >
          <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              direction="column"
            >
              <ShowPuntos/>
              <Grid item>
                <Typography
                  variant="h4"
                >
                  Puntos Totales 
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={7} lg={7} md={7} sm={7} xs={7}>
            <Grid
              container
              alignItems="flex-end"
              justifyContent="flex-end"
              direction="row"
              marginBottom={5}
            >
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Grid container marginTop={'4px'}>
                  <ButtonsGroupContainer>
                    <ButtonsGroup />
                  </ButtonsGroupContainer>
                </Grid>
                
              </Grid>
            </Grid>  
          </Grid>   
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
