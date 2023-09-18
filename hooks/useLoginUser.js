import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useApi from './useApi';
import { getCookie, setCookie } from "cookies-next";
import { authenticate } from '@utils/authenticate';

const INITIAL_ERROR_STATE = { open: false, message: '' };

export default function useLoginUser() {
  const [error, setError] = useState(INITIAL_ERROR_STATE);
  const [useLoginUserLoading, setUseLoginUserLoading] = useState(false)

  const history = useRouter();
  const
    [, errorFidelizarMaquina,
      apiDataFidelizarMaquina,
      fetchDataFidelizarMaquina]
      = useApi();

  const fidelizar = async ({ numeroDocumento }) => {
    try {
      setUseLoginUserLoading(true)
      const authConfig = JSON.parse(getCookie("authConfig") || "null") || "";
      await authenticate(authConfig);

      const token = JSON.parse(getCookie("token") || "null") || "";
      const serial = JSON.parse(getCookie("serial") || "null") || "";

      setCookie("numeroDocumento", JSON.stringify(numeroDocumento));

      const url = '/api/fidelizacion/fidelizar-maquina';
      const requestBody = {
        host: authConfig.host,
        serial,
        numeroDocumento,
        token,
      };

      await fetchDataFidelizarMaquina(url, 'POST', requestBody);
    } catch (err) {
      handleApiError(err);
    } finally {
      setUseLoginUserLoading(false)
    }
  };

  const handleApiError = (err) => {
    const errorMessage = err || 'Error desconocido';
    setError({ open: true, message: errorMessage });
  };

  useEffect(() => {
    if (apiDataFidelizarMaquina) {
      if (errorFidelizarMaquina === 'No se conecto al servidor') {
        handleApiError(errorFidelizarMaquina);
        history.push('/login');
        return;
      }
      if (apiDataFidelizarMaquina?.statusDTO?.code !== '00') {
        const errorMessage = apiDataFidelizarMaquina?.statusDTO?.message || 'Error desconocido';
        handleApiError(errorMessage);
        return;
      }

      const storedNumeroDocumento = JSON.parse(getCookie("numeroDocumento") || "null") || "";

      setCookie(
        'user',
        JSON.stringify({
          numeroDocumento: storedNumeroDocumento,
          nombre: apiDataFidelizarMaquina.nombreCompleto || storedNumeroDocumento,
          clave: apiDataFidelizarMaquina.nombreCompleto ? apiDataFidelizarMaquina.clave : 'NOCLAVE',
          billetero: apiDataFidelizarMaquina.enableBilletero,
        })
      );

      if (getCookie('user')) history.push('/home');
    }
  }, [apiDataFidelizarMaquina, errorFidelizarMaquina, history]);

  return {
    setError,
    error,
    errorFidelizarMaquina,
    fidelizar,
    apiDataFidelizarMaquina,
    useLoginUserLoading
  };
}
