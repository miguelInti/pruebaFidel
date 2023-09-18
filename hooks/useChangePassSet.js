import { useCallback, useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import useApi from './useApi';

export default function useChangePasswordSet() {
  const [openError, setOpenError] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [loading, error, apiData, fetchData] = useApi();

  const changePassword = useCallback((oldPassword, newPassword) => {
    const localToken = JSON.parse(getCookie('token'));
    const authConfig = JSON.parse(getCookie('authConfig')) || null;
    const numeroDocumento = JSON.parse(getCookie('numeroDocumento'));

    const args = {
      host: authConfig?.host,
      claveAnterior: oldPassword,
      nuevaClave: newPassword,
      numeroDocumento: numeroDocumento,
      token: localToken,
    };

    fetchData('/api/fidelizacion/cambiar-clave', 'post', args);
  }, []);

  useEffect(() => {
    if (error) {
      setMessageError('Error occurred while fetching data from API');
      setOpenError(true);
    } else if (apiData) {
      // Handle the response data from the API
      if (apiData?.error === 'No se conecto al servidor') {
        setMessageError(apiData?.error);
        setOpenError(true);
      } else if (apiData?.statusDTO?.code !== '00') {
        setMessageError(apiData?.statusDTO?.message);
        setOpenError(true);
      } else {
        setMessageError(apiData?.statusDTO?.message);
        setOpenError(true);
      }
    }
  }, [error, apiData]);

  return {
    openError,
    setOpenError,
    messageError,
    callBackChangePassword: changePassword,
  };
}
