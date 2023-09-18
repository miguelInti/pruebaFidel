import { useCallback, useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { authenticate } from '@utils/authenticate';
import useApi from './useApi';


export default function useHelp() {
  const [hasPending, setHasPending] = useState(false);
  const [solicitudes, setSolicitudes] = useState([]);

  const [
    loadingListarSolicitudes,
    errorListarSolicitudes,
    apiDataListarSolicitudes,
    fetchDataListarSolicitudes
  ] = useApi();
  
  const [
    loadingCrearSolicitud,
    errorCrearSolicitud,
    apiDataCrearSolicitud,
    fetchDataCrearSolicitud
  ] = useApi();
  

  const PedirSolicitudes = useCallback(async () => {
    const authConfig = JSON.parse(getCookie('authConfig') || 'null') || '';
    const codigoCasino = JSON.parse(getCookie('codigoCasino') || 'null') || '';
    const localToken = JSON.parse(getCookie('token') || 'null') || '';
    const arg = {
      nombreUsuario: authConfig?.user,
      host: authConfig?.host,
      codigoCasino,
      token: localToken,
    };

    await fetchDataListarSolicitudes('/api/soporte/listar-solicitudes', "post", arg);

  }, [hasPending]);

  useEffect(() => {
    if (apiDataListarSolicitudes) {
      const res = apiDataListarSolicitudes;
      if (res?.statusDTO?.code !== '00') {
        setHasPending(false);
        setSolicitudes([]);
      }
      if (res?.statusDTO?.code === '00') {
        setSolicitudes(res?.solicitudes);
      }
    }
  }, [apiDataListarSolicitudes])

  useEffect(() => {
    PedirSolicitudes();
    return () => setSolicitudes([]);
  }, [PedirSolicitudes]);

  useEffect(() => {
    let myInterval;
    if (hasPending === true) {
      myInterval = setInterval(() => {
        PedirSolicitudes();
      }, 1000 * 60);
    }
    return () => {
      clearInterval(myInterval);
    };
  }, [PedirSolicitudes, hasPending]);

  const solicitarAyuda = async () => {
    const auth = JSON.parse(getCookie('authConfig'));
    await authenticate(auth);

    const authConfig = JSON.parse(getCookie('authConfig'));
    const localMaquina = JSON.parse(getCookie('serial'));
    const localCasino = JSON.parse(getCookie('codigoCasino'));
    const localToken = JSON.parse(getCookie('token'));
    const userToShow = JSON.parse(getCookie('user'));
    const args = {
      nombreUsuario: authConfig?.user,
      host: authConfig?.host,
      codigoCasino: localCasino,
      serial: localMaquina,
      numeroDocumento: userToShow?.numeroDocumento,
      token: localToken,
    };

    fetchDataCrearSolicitud('/api/soporte/crear-solicitud', 'post', args)
  };

  useEffect(() => {
    if (apiDataCrearSolicitud) {
      const res = apiDataCrearSolicitud;
      if (res?.statusDTO?.code === '00') {
        setHasPending(true);
        PedirSolicitudes();
      }
    }
  }, [apiDataCrearSolicitud])


  const solicitar = useCallback(solicitarAyuda, [PedirSolicitudes]);

  const hasSolicitudes = () => {
    const localMaquina = JSON.parse(getCookie("serial") || "null") || "";;
    if (solicitudes.length === 0) {
      return false;
    }
    return solicitudes?.filter((s) => s?.serial === localMaquina).length > 0;
  };

  return {
    hasPending,
    solicitudes,
    setHasPending,
    solicitar,
    hasSolicitudes,
  };
}
