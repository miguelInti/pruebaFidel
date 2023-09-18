import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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

export default function useListarPedido() {
  const router = useRouter();
  const cookies = useCookies();

  const listarProductosApi = useApi();
  const comprarProductosApi = useApi();
  const realizarPeticionApi = useApi();
  const anularPeticionesApi = useApi();
  const confirmarPeticionesApi = useApi();

  const [listarProductos, setListarProductos] = useState([]);
  const [openError, setOpenError] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [buyModal, setBuyModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [redimirModal, setRedimirModal] = useState(false);

  useEffect(() => {
    getListProducts();
    return () => {
      setListarProductos([]); // This worked for me
    };
  }, []);

  const handleCloseRedimirModal = () => {
      router.back();
  };

  const CloseModalBuy = () => {
      router.back();
    setBuyModal(false);
  };

  const showErrorMessage = (msg) => {
    setMessageError(msg);
    setOpenError(true);
  };

  const filterProducts = (arr) => {
    const barList = cookies.getBarCookie();
    const newArr = [...arr];

    const result = [];

    newArr.forEach((pedido) => {
      barList.forEach((producto) => {
        if (pedido.idPremio === producto.pk) {
          producto.idPeticion = pedido.idPeticion;
          producto.estado = pedido.estadoPeticion;
          producto.medioPago = pedido.medioPago;
          result.push(producto);
        }
      });
    });

    setPedidos(result);
  };

  const getListProducts = () => {
    const auth = cookies.getAuthConfigCookie();
    const user = cookies.getUserCookie();
    const serial = cookies.getSerialCookie();
    const token = cookies.getTokenCookie();
    const args = {
      host: auth?.host,
      numeroDocumento: user?.numeroDocumento ?? null,
      serial,
      token,
    };

    listarProductosApi[3]('/api/bar/listar-peticiones-cliente', 'POST', args);
  };

  useEffect(() => {
    if (listarProductosApi[2]) {
      const res = listarProductosApi[2];
      filterProducts(res?.peticiones);
      setListarProductos(res?.peticiones);
    }
  }, [listarProductosApi[2]]);

  const doBuy = (idPeticion, cantidad) => {
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

    comprarProductosApi[3]('/api/bar/comprar-premio', 'POST', args);
  };

  useEffect(() => {
    if (comprarProductosApi[2]) {
      const arg = comprarProductosApi[2];
      if (arg?.statusDTO?.code !== '00') {
        showErrorMessage(arg?.statusDTO?.message);
      }

      if (arg?.statusDTO?.code === '00') {
        setBuyModal(true);
      }
    }
  }, [comprarProductosApi[2]]);

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
  
  useEffect(() => {
  }, [setBuyModal])
  

  

  const cancelarPeticion = (idPremio) => {
    const product = listarProductos.find((l) => l?.idPremio === idPremio);
    const auth = cookies.getAuthConfigCookie();
    const serial = cookies.getSerialCookie();
    const token = cookies.getTokenCookie();
    const args = {
      host: auth?.host,
      numeroDocumento: auth?.numeroDocumento || null,
      serial,
      token,
      idPeticion: product?.idPeticion,
    };

    anularPeticionesApi[3]('/api/bar/anular-peticion', 'POST', args);
  };

  useEffect(() => {
    if (anularPeticionesApi[2]) {
      const arg = anularPeticionesApi[2];
      if (arg?.statusDTO?.code !== '00') {
        showErrorMessage(arg?.statusDTO?.message);
      }

      if (arg?.statusDTO?.code === '00') {
        setCancelModal(true);
      }
    }
  }, [anularPeticionesApi[2]]);

  const confirmarPeticion = (idPremio) => {
    const product = listarProductos.find((l) => l?.idPremio === idPremio);
    const auth = cookies.getAuthConfigCookie();
    const serial = cookies.getSerialCookie();
    const localToken = cookies.getTokenCookie();
    const args = {
      host: auth.host,
      numeroDocumento: auth?.numeroDocumento || null,
      serial,
      token: localToken,
      idPeticion: product?.idPeticion,
    };

    confirmarPeticionesApi[3]('/api/bar/confirmar-peticion', 'POST', args);
  };

  useEffect(() => {
    if (confirmarPeticionesApi[2]) {
      const arg = confirmarPeticionesApi[2];
      if (arg?.statusDTO?.code !== '00') {
        showErrorMessage(arg?.statusDTO?.message);
      }

      if (arg?.statusDTO?.code === '00') {
        getListProducts();
      }
    }
  }, [confirmarPeticionesApi[2]]);

  const hasQueque = (idPremio, estado) => {
    const product = listarProductos.find((l) => l?.idPremio === idPremio);

    if (product?.estadoPeticion === estado) {
      return true;
    }
    return false;
  };

  return {
    redimirModal,
    setRedimirModal,
    doRedimir,
    getListProducts,
    pedidos,
    listarProductos,
    doBuy,
    cancelarPeticion,
    confirmarPeticion,
    openError,
    setOpenError,
    messageError,
    handleCloseRedimirModal,
    CloseModalBuy,
    buyModal,
    cancelModal,
    hasQueque,
    loading: listarProductosApi.loading || comprarProductosApi.loading || realizarPeticionApi.loading || anularPeticionesApi.loading || confirmarPeticionesApi.loading,
    error: listarProductosApi.error || comprarProductosApi.error || realizarPeticionApi.error || anularPeticionesApi.error || confirmarPeticionesApi.error,
  };
}
