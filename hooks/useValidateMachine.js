import { useCallback, useEffect, useState } from 'react';
import useApi from '@hooks/useApi'; // Importa el hook personalizado useApi
import { setCookie, parseCookies } from 'cookies-next';

// Función de utilidad para obtener y parsear las cookies
const getCookiesData = () => {
  const { user, authConfig, token, serial } = parseCookies();

  return {
    user: user ? JSON.parse(user) : null,
    authConfig: authConfig ? JSON.parse(authConfig) : null,
    token,
    serial,
  };
};

export default function useValidateMachine() {
  const [
    loadingFidelizarMaquina,
    errorFidelizarMaquina,
    apiDataFidelizarMaquina,
    fetchDataFidelizarMaquina]
   = useApi(); // Instancia el hook personalizado useApi antes de su uso

  const [openMachineError, setOpenMachineError] = useState(false);
  const [messageMachineError, setMessageMachineError] = useState('');

  const { user, authConfig, token, serial } = getCookiesData();

  const fidelizarMaquina = useCallback(() => {
    const requestBody = {
      host: authConfig?.host,
      serial,
      numeroDocumento: user?.numeroDocumento,
      token,
    };

    fetchDataFidelizarMaquina('/api/fidelizacion/fidelizar-maquina', 'POST', requestBody);
  }, [user?.numeroDocumento, token, serial, authConfig, fetchDataFidelizarMaquina]);

  useEffect(() => {
    let id;
    if (user !== null) {
      id = setInterval(() => {
        fidelizarMaquina();
      }, Number(60000));
    }
    return () => clearInterval(id);
  }, [fidelizarMaquina, user]);

  useEffect(() => {
    if (errorFidelizarMaquina && errorFidelizarMaquina === 'No se conecto al servidor') {
      setMessageMachineError(errorFidelizarMaquina);
      setOpenMachineError(true);
    } else if (apiDataFidelizarMaquina && apiDataFidelizarMaquina.statusDTO) {
      const { code } = apiDataFidelizarMaquina.statusDTO;
      const showMessage = getCookie('showMessage') === 'N'
        ? getCookie('showMessage')
        : 'Y';
      if (showMessage === 'Y' && code !== '00') {
        setCookie('showMessage', 'N');
        setMessageMachineError('El dispositivo ha perdido conexión con la máquina, desde este momento no se están acumulando puntos. Por favor comunícate con el administrador.');
        setOpenMachineError(true);
      } else if (showMessage === 'N' && code === '00') {
        setMessageMachineError('Se realizó la conexión con la máquina, desde este momento estás acumulando puntos.');
        setOpenMachineError(true);
      }
    }
  }, [apiDataFidelizarMaquina, errorFidelizarMaquina]);

  return {
    loadingFidelizarMaquina,
    errorFidelizarMaquina,
    apiDataFidelizarMaquina,
    openMachineError,
    setOpenMachineError,
    messageMachineError,
  };
}
