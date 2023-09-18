import { useState, useEffect } from 'react';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiData, setApiData] = useState(null);

  const fetchData = async (url, method, queryParams = null) => {
    try {
      setLoading(true);
      setError(null);
      setApiData(null);

      const requestOptions = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (method !== 'GET') {
        requestOptions.body = JSON.stringify(queryParams);
      }

      const response = await fetch(url, requestOptions);
      
      if (response.ok) {
        const data = await response.json();
        setApiData(data);
      } else {
        throw new Error('Request failed');
      }
    } catch (error) {
      setError('Error al obtener los datos de la API');
    } finally {
      setLoading(false);
    }
  };

  return [loading, error, apiData, fetchData];
};

export default useApi;
