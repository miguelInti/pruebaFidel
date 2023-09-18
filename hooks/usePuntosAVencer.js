import { useCallback, useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import useApi from './useApi';

function usePuntosVencer() {
  const [openPuntosVencerError, setOpenPuntosVencerError] = useState(false);
  const [msnPuntosVencerError, setMsnPuntosVencerError] = useState('');
  const [dataVencer, setDataVencer] = useState([
    { data: 0, label: 'hoy' },
    { data: 0, label: '+1' },
    { data: 0, label: '+10' },
    { data: 0, label: '+20' },
    { data: 0, label: '+30' }
  ]);

  const user = getCookie('user') ? JSON.parse(getCookie('user')) : null;
  const serial = getCookie('serial') ? JSON.parse(getCookie('serial')) : null;
  const codigoCasino = getCookie('codigoCasino') ? JSON.parse(getCookie('codigoCasino')) : null;
  const token = getCookie('token') ? JSON.parse(getCookie('token')) : null;
  const authConfig = getCookie('authConfig') ? JSON.parse(getCookie('authConfig')) : null;

  const [loadingVisualizarPuntos, errorVisualizarPuntos, apiDataVisualizarPuntos, fetchDataVisualizarPuntos]  = useApi();

  const sendPuntosVencer = useCallback(async () => {
    try {
      const url = '/api/fidelizacion/visualizar-puntos-vencer';
      const method = 'POST';
      const requestBody = {
        host: authConfig?.host,
        codigoCasino,
        serial,
        numeroDocumento: user?.numeroDocumento,
        intervalos: '0,1,10,20,30',
        token
      };

      fetchDataVisualizarPuntos(url, method, requestBody);

    } catch (error) {
      setMsnPuntosVencerError(error?.error);
      setOpenPuntosVencerError(true);
    }
  }, [authConfig?.host, codigoCasino, serial, user?.numeroDocumento, token])

  useEffect(() => {
    if (user !== null) {
      sendPuntosVencer();
    }
    return () =>
      setDataVencer([]);
  }, []);

  useEffect(() => {
    if (apiDataVisualizarPuntos) {
      if (apiDataVisualizarPuntos?.statusDTO?.code === '00') {
        setDataVencer(apiDataVisualizarPuntos?.puntosVencer);
      }
    }
  }, [apiDataVisualizarPuntos]);

  useEffect(() => {
    if (errorVisualizarPuntos) {
      if (errorVisualizarPuntos === 'No se conectó al servidor') {
        setMsnPuntosVencerError(errorVisualizarPuntos);
        setOpenPuntosVencerError(true);
      }
    }
  }, [errorVisualizarPuntos]);

  return [ dataVencer, sendPuntosVencer, loadingVisualizarPuntos, errorVisualizarPuntos, openPuntosVencerError, setOpenPuntosVencerError, msnPuntosVencerError ];
}

export default usePuntosVencer;
