import { useCallback, useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { authenticate } from '@utils/authenticate';
import useApi from './useApi';

export default function useProduct() {
  const [categorias, setCategorias] = useState([]);
  const [openError, setOpenError] = useState(false);
  const [messageError, setMessageError] = useState('');

  const [loadingDataBar, errorDataBar, apiDataBar, fetchDataBar]  = useApi();

  const saveProduct = (products) => {
    const newSet = new Set();
    products.forEach((product) => {
      return newSet.add(product.categoriaPremio);
    });
    const uniq = [...newSet];
    const categoriasTmp = uniq.map((categoria) => {
      const productosPorCategoria = products.filter(
        (producto) => producto.categoriaPremio === categoria
      );
      const imagenDeCategoria =
        productosPorCategoria.length > 0
          ? productosPorCategoria[0].imagenCategoria
          : null;
      return {
        categoria,
        imagenCategoria: imagenDeCategoria,
      };
    });
    setCategorias(categoriasTmp);
  };

  const getBar = async () => {
    const authConfig = getCookie('authConfig') ? JSON.parse(getCookie('authConfig')) : null;
    const codigoCasino = getCookie('codigoCasino');
    const token = getCookie('token');

    if (authConfig && codigoCasino && token) {
      try {
        await authenticate(authConfig);
        const url = '/api/bar/visualizar-premios-bar';
        const method = 'POST';
        const requestBody = {
          host: authConfig.host,
          codigoCasino,
          token,
        };

        fetchDataBar(url, method, requestBody);
      } catch (err) {
        setMessageError(err.statusDTO.message);
        setOpenError(true);
      }
    } else {
      setMessageError('Cookies no encontradas');
      setOpenError(true);
    }
  };

  useEffect(() => {
    if (apiDataBar) {
      if (apiDataBar.error) {
        setMessageError(apiDataBar.error);
        setOpenError(true);
      } else if (apiDataBar.statusDTO?.code !== '00') {
        setMessageError(apiDataBar.statusDTO?.message);
        setOpenError(true);
      } else if (apiDataBar.statusDTO?.code === '00') {
        const premiosCookie = apiDataBar.listaVisualizarPremiosDTO
        const cookieValue = JSON.stringify(premiosCookie);
        localStorage.setItem("bar", cookieValue);
        saveProduct(apiDataBar.listaVisualizarPremiosDTO);
      }
    }
  }, [apiDataBar]);

  const callBackGetBar = useCallback(getBar, []);

  useEffect(() => {
    callBackGetBar();
    return () => setCategorias([]);
  }, [callBackGetBar]);

  return {
    categorias,
    openError,
    messageError,
    setOpenError,
    loadingDataBar,
    errorDataBar,
  };
}
