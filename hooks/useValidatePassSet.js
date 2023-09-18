import { useCallback, useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
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

const useValidatePassSet = () => {
  const cookies = useCookies();
  const [, , apiData, fetchData] = useApi();
  const user = JSON.parse(getCookie('user')) || {};
  const [pk, setPk] = useState('')
  const [cantidad,setCantidad] = useState(1)
  const [redimirModal, setRedimirModal] = useState(false);
  const realizarPeticionApi = useApi();
  const [errorValidate, setErrorValidate] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const validatePassSet = useCallback((clave, pk, cantidad) => {
    const auth = JSON.parse(getCookie('authConfig')) || {};
    const localToken = getCookie('token') || '';

    if (user.numeroDocumento && auth.host && clave && localToken) {
      const args = {
        host: auth.host,
        numeroDocumento: user.numeroDocumento,
        clave,
        token: localToken,
      };
      setPk(pk);
      setCantidad(cantidad);
      fetchData('/api/fidelizacion/validar-clave-fija', 'POST', args);
    }
  }, [user.numeroDocumento, fetchData]);

  useEffect(() => {
    if (apiData) {
      if (apiData.statusDTO && apiData.statusDTO.code !== '00') {
        setErrorValidate(true)
        setErrorMessage(apiData.statusDTO.message)
      }

      if (apiData.statusDTO && apiData.statusDTO.code === '00') {
        doRedimir(pk, cantidad);
      }
    }
  }, [apiData])
  
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
        setErrorMessage(arg?.statusDTO?.message);
      }

      if (arg?.statusDTO?.code === '00') {
        setRedimirModal(true);
      }
    }
  }, [realizarPeticionApi[2]]);


  const callbackValidate = useCallback(validatePassSet, []);

  return {
    callbackValidate,
    redimirModal,
    setRedimirModal,
    errorMessage,
    errorValidate,
    setErrorValidate
  };
}

export default useValidatePassSet;
