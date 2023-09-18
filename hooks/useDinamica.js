import { useCallback, useEffect, useState } from 'react';
import { getCookie, setCookie } from 'cookies-next';
import useApi from './useApi';

function useCookies() {
  const getAuthConfigCookie = () => JSON.parse(getCookie('authConfig') || 'null');
  const getUserCookie = () => JSON.parse(getCookie('user') || 'null');
  const getSerialCookie = () => JSON.parse(getCookie('serial') || '');
  const getTokenCookie = () => JSON.parse(getCookie('token') || '');
  const getBarCookie = () => JSON.parse(localStorage.getItem('bar') || 'null');

  return {
    getAuthConfigCookie,
    getUserCookie,
    getSerialCookie,
    getTokenCookie,
    getBarCookie
  };
}

export default function useDinamica() {
  const cookies = useCookies();
  const [redimirModal, setRedimirModal] = useState(false);
  const [loading, error, apiData, fetchData]  = useApi();
  const [errorDinamica, setErrorDinamica] = useState(false);
  const user = JSON.parse(getCookie('user')) || {};
  const codigoCasino = JSON.parse(getCookie("codigoCasino") || "null") || "";
  const serial = JSON.parse(getCookie("serial")|| "null") || "";
  const realizarPeticionApi = useApi();
  const [messageError, setMessageError] = useState('');
  const [openError, setOpenError] = useState(false);

  const SolicitarClave = useCallback(() => {
    const auth = JSON.parse(getCookie('authConfig')) || {};
    const token = getCookie('token') || '';
    
    if (user.numeroDocumento && auth.host && auth.user && token) {
      const args = {
        codigoCasino,
        serial,
        host: auth.host,
        numeroDocumento: user.numeroDocumento,
        login: auth.user,
        token,
      };
      
      fetchData('/api/fidelizacion/validar-clave-dinamica', 'POST', args);
    }
  }, [user.numeroDocumento, fetchData]);

  const ValidarClaveDinamica = useCallback((clave, pk, cantidad) => {
    const dinamica = getCookie('dinamica') || '';

    if (clave === dinamica) {
      doRedimir(pk, cantidad);
    }

    if (clave !== dinamica) {
      setErrorDinamica(true);
    }
  }, []);

  useEffect(() => {
    if (apiData) {
      if (apiData.statusDTO && apiData.statusDTO.code !== '00') {
        console.log(apiData);
      }

      if (apiData.statusDTO && apiData.statusDTO.code === '00') {
        const dinamica = apiData.clave || '';
        if (dinamica) {
          setCookie('dinamica', dinamica);
          // ...
        }
      }
    }
  }, [apiData]);

  const doRedimir = (idPeticion, cantidad) => {
    const auth = cookies.getAuthConfigCookie();
    const user = cookies.getUserCookie();
    const serial = cookies.getSerialCookie();
    const token = cookies.getTokenCookie();
    const args = {
      host: auth?.host,
      numeroDocumento: user?.numeroDocumento ?? null,
      serial,
      token,
      idPeticion,
      cantidad
    };

    realizarPeticionApi[3]('/api/bar/realizar-peticion', 'POST', args);
  };

  useEffect(() => {
    if (realizarPeticionApi[2]) {
      const arg = realizarPeticionApi[2];
      if (arg?.statusDTO?.code !== '00') {
        showErrorMessage(arg?.statusDTO?.message);
      }

      if (arg?.statusDTO?.code === '00') {
        setRedimirModal(true);
      }
    }
  }, [realizarPeticionApi[2]]);

  const showErrorMessage = (msg) => {
    setMessageError(msg);
    setOpenError(true);
  };

  return {
    redimirModal,
    setRedimirModal,
    loading,
    error,
    errorDinamica,
    openError,
    setOpenError,
    messageError,
    callbackSolicitarClave: SolicitarClave,
    callbackValidarClaveDinamica: ValidarClaveDinamica,
  };
}
