import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie, setCookie } from 'cookies-next';
import useApi from './useApi';

const usePuntos = () => {
    const router = useRouter();

    const [puntos, setPuntos] = useState({
        cantidadPuntosDisponibles: 0,
        puntosAcumuladosHoy: 0,
        puntosIniciales: 0,
        puntosRedimidosHoy: 0
    });

    const [openPuntosError, setOpenPuntosError] = useState(false);
    const [msnPuntosError, setMsnPuntosError] = useState('');

    const user = getCookie('user') ? JSON.parse(getCookie('user')) : null;
    const serial = getCookie('serial') ? JSON.parse(getCookie('serial')) : null;
    const codigoCasino = getCookie('codigoCasino') ? JSON.parse(getCookie('codigoCasino')) : null;
    const token = getCookie('token') ? JSON.parse(getCookie('token')) : null;

    const [loadingVisualizarPuntos, errorVisualizarPuntos, apiDataVisualizarPuntos, fetchDataVisualizarPuntos] = useApi();

    const sendPuntos = async () => {
        try {
            const authConfig = getCookie('authConfig') ? JSON.parse(getCookie('authConfig')) : null;

            const requestBody = {
                host: authConfig?.host,
                casino: codigoCasino,
                serial,
                numeroDocumento: user?.numeroDocumento,
                token,
            };

            await fetchDataVisualizarPuntos('/api/fidelizacion/visualizar-puntos', 'POST', requestBody)
        } catch (error) {
            setMsnPuntosError(error?.error);
            setOpenPuntosError(true);
        }
    };

    useEffect(() => {
        if (apiDataVisualizarPuntos) {
            if (errorVisualizarPuntos === 'No se conecto al servidor') {
                setMsnPuntosError(errorVisualizarPuntos?.error);
                setOpenPuntosError(true);
            }
            if (apiDataVisualizarPuntos?.statusDTO?.code === '38') {
                router.push('/login');
            }
            if (apiDataVisualizarPuntos?.statusDTO?.code === '00') {
                setCookie('puntos', {
                    cantidadPuntosDisponibles: apiDataVisualizarPuntos?.cantidadPuntosDisponibles,
                    puntosAcumuladosHoy: apiDataVisualizarPuntos?.puntosAcumuladosHoy,
                    puntosIniciales: apiDataVisualizarPuntos?.puntosIniciales,
                    puntosRedimidosHoy: apiDataVisualizarPuntos?.puntosRedimidosHoy,
                });
                setPuntos({
                    cantidadPuntosDisponibles: apiDataVisualizarPuntos?.cantidadPuntosDisponibles,
                    puntosAcumuladosHoy: apiDataVisualizarPuntos?.puntosAcumuladosHoy,
                    puntosIniciales: apiDataVisualizarPuntos?.puntosIniciales,
                    puntosRedimidosHoy: apiDataVisualizarPuntos?.puntosRedimidosHoy,
                });
            }
        }
    }, [apiDataVisualizarPuntos])

    const callback = useCallback(sendPuntos, [
        router,
        user?.numeroDocumento,
        serial,
        codigoCasino,
        token,
        fetchDataVisualizarPuntos,
    ]);

    useEffect(() => {
        let id;
        if (user !== null) {
            id = setInterval(() => {
                callback();
            }, 1000 * 30);
        }
        return () => clearInterval(id);
    }, [callback]);

    useEffect(() => {
        if (user !== null) {
            callback();
        }
        return () =>
            setPuntos({
                cantidadPuntosDisponibles: 0,
                puntosAcumuladosHoy: 0,
                puntosIniciales: 0,
                puntosRedimidosHoy: 0
            });
    }, []);

    return { openPuntosError, setOpenPuntosError, msnPuntosError, puntos, loadingVisualizarPuntos, errorVisualizarPuntos };
}

export default usePuntos;