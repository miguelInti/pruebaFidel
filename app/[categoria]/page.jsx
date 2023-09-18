'use client'
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import Link from 'next/link';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  CardMedia,
} from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { formatNumber, shortName } from '@helpers/format';
import Alert from '@components/Alerts/Alert';
import useListarPedido from '@hooks/useListarPedido';
import { ButtonProductos } from '@components/ButtonProductos';
import { getCookie } from 'cookies-next';

const RootBox = styled(Box)({
  display: 'grid',
  gridAutoFlow: 'column',
  gap: '1rem',
  maxWidth: '100%',
  margin: '10px 50px',
  padding: '1rem 1rem',
});

const ItemCard = styled(Card)({
  height: 280,
  width: '300px',
  minWidth: '300px',
  width: 'fit-content',
  padding: '0 1em',
  alignItems: 'center',
  background: 'linear-gradient(180deg, #019aff 0%, #181d45 100%);',
  borderRadius: 20,
  color: '#fff',
});

const ContentBox = styled(CardContent)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
});

const DetailsBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '80%',
  marginTop: '30px',
  flexShrink: 0,
});

const CoverImage = styled(CardMedia)({
  minWidth: 120,
  width: 120,
  minHeight: 300,
  maxHeight: 100,
  objectFit: 'cover',
  backgroundSize: 'auto !important',
  marginBottom: 20,
});

const Categoria = ({ params }) => {
  const [Ios, setIos] = useState([]);
  const [puntosBar, setPuntosBar] = useState(null);
  const [user, setUser] = useState('');

  const {
    openError,
    setOpenError,
    messageError,
  } = useListarPedido();

  useEffect(() => {
    const fetchCookies = () => {
      const barCookie = localStorage.getItem('bar');
      const userCookie = getCookie('user');
      const puntosBarCookie = getCookie('puntos');

      if (barCookie) {
        const barList = JSON.parse(barCookie);
        const filteredIos = barList.filter(
          (bar) => bar.categoriaPremio === params.categoria
        );
        setIos(filteredIos);
      }

      if (userCookie) {
        const parsedUser = JSON.parse(userCookie);
        setUser(parsedUser);
      }

      if (puntosBarCookie) {
        const puntosBarParsed = JSON.parse(puntosBarCookie);
        setPuntosBar(puntosBarParsed);
      }
    };

    fetchCookies();
  }, [params.categoria]);

  const [currentItemIdx, setCurrentItemIdx] = useState(0);

  const prevSlide = () => {
    if (Ios) {
      const resetToVeryBack = currentItemIdx === 0;
      const index = resetToVeryBack ? Ios.length - 1 : currentItemIdx - 1;
      setCurrentItemIdx(index);
    }
  };

  const nextSlide = () => {
    if (Ios) {
      const resetIndex = currentItemIdx === Ios.length - 1;
      const index = resetIndex ? 0 : currentItemIdx + 1;
      setCurrentItemIdx(index);
    }
  };

  const activeItemsSourcesFromState = Ios
    ? Ios.slice(currentItemIdx, currentItemIdx + 2)
    : [];

  const itemsSourcesToDisplay = () => {
    if (Ios) {
      return activeItemsSourcesFromState.length < 2
        ? [
            ...activeItemsSourcesFromState,
            ...Ios.slice(0, 2 - activeItemsSourcesFromState.length),
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
              <Link href="/bar">
              <Button
                size="large"
                variant="contained"
                color="primary"
              >
                Volver
              </Button>
              </Link>
            </Grid>
            <Grid item lg={7} md={7} sm={7} xs={7}>
              <Typography
                variant="h4"
                align="center"
                style={{ fontWeight: "bold" }}
              >
                {user ? shortName(user.nombre) : 'Anónimo'}
              </Typography>
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={3}>
              {user ? (
                <>
                  <Typography
                    variant="h4"
                    align="right"
                    style={{ fontWeight: "bold" }}
                  >
                    {formatNumber(puntosBar?.cantidadPuntosDisponibles)}
                  </Typography>
                  <Typography variant="h6" align="right" >
                    Puntos
                  </Typography>
                </>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
        {/* fin del header */}

        <Box width="100%" display="flex" alignItems="center">
          <Grid id="left" onClick={prevSlide}>
            <Button style={{ color: "white" }}>
              <ArrowBackIos style={{ fontSize: 80 }} />
            </Button>
          </Grid>

          <RootBox id="content">
            {Ios
              ? itemsSourcesToDisplay().map((p, i) => (
                  <ItemCard key={p.nombre + i}>
                    <ContentBox>
                      {/* <CoverImage
                        image={p.imagen}
                        title={p.imagen}
                      /> */}
                      <DetailsBox>
                        <Typography variant="h4" align="center">
                          {p.nombre}
                        </Typography>
                        <Typography variant="h4" align="center">
                          Disponibles: {p.unidadesDisponibles}
                        </Typography>
                        <Grid
                          style={{ padding: '1em' }}
                          container
                          justifyContent="space-between"
                          alignContent="center"
                        >
                          <ButtonProductos
                            p={p}
                            cashAllowed={p.compraEnEfectivo}
                          />
                        </Grid>
                      </DetailsBox>
                    </ContentBox>
                  </ItemCard>
                ))
              : "cargando..."}
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
          onClose={() => setOpenError(false)}
          message={messageError}
        />
      ) : null}
    </RootBox>
  );
};

export default Categoria;
