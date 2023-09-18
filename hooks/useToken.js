import { useCallback, useEffect, useMemo, useState } from 'react';
import { authenticate } from '@utils/authenticate';
import { getCookie } from 'cookies-next';

export default function useToken() {
  const [token, setToken] = useState('');

  const sendAuth = () => {
    setInterval(async () => {
      const auth = JSON.parse(getCookie('authConfig'));
      await authenticate(auth);
      const token = JSON.parse(getCookie('token'));
      setToken(token);
    }, 1000 * 60 * 4);
  };

  const callback = useCallback(sendAuth, []);

  useEffect(() => {
    let intervalId;
    if (getCookie('authConfig')) {
      intervalId = callback();
    }
    return () => clearInterval(intervalId);
  }, [callback]);

  const tokenMemo = useMemo(() => token, [token]);
  return { tokenMemo };
}
