import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { deleteCookie , getCookie } from 'cookies-next';
import useApi from './useApi';

export default function useCloseSession() {
    const router = useRouter();
    const [openError, setOpenError] = useState(false);
    const [messageError, setMessageError] = useState('');

    const  [loading, error, apiData, fetchData]  = useApi();

    const CloseSession = () => {
        const authConfig = JSON.parse(getCookie('authConfig'));
        const serial = JSON.parse(getCookie('serial'));
        const token = JSON.parse(getCookie('token'));
        const user = JSON.parse(getCookie('user'));

        const args = {
            host: authConfig?.host,
            serial,
            numeroDocumento: user.numeroDocumento,
            token,
        };

        if (user !== null && serial) {
            fetchData('/api/fidelizacion/cerrar-fidelizacion-maquina', 'POST', args);
        }
    };

    const CallbackCloseSession = useCallback(CloseSession, [fetchData]);

    useEffect(() => {
        if (!loading && !error && apiData) {
            if (apiData?.Error) {
                deleteCookie ('user');
                deleteCookie ('puntos');
                deleteCookie ('showMessage');
                router.push('/login');
                return;
            }

            if (apiData?.statusDTO?.code !== '00') {
                setMessageError(apiData?.statusDTO?.message);
                setOpenError(true);
                return;
            }

            deleteCookie ('user');
            deleteCookie ('puntos');
            deleteCookie ('showMessage');
            router.push('/login');
        }
    }, [apiData, error, loading, router]);

    const goToLogin = () => {
        deleteCookie ('user');
        deleteCookie ('puntos');
        deleteCookie ('showMessage');
        router.push('/login');
    };

    const CallbackUserNull = useCallback(goToLogin, [router]);

    return {
        CallbackCloseSession,
        CallbackUserNull,
        messageError,
        openError,
        setOpenError,
        loading,
    };
}
