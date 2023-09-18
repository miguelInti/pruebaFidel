/* eslint-disable promise/always-return */
/* eslint-disable promise/no-nesting */
/* eslint-disable promise/catch-or-return */
import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import fs from 'fs';
import os from 'os';
import path from 'path';

const ipc = ipcRenderer;

export default function useListVideos(
  // eslint-disable-next-line @typescript-eslint/ban-types
  setIsVideoPlay: Function,
  isVideoPlay: boolean
) {
  const [listPromocional, setListPromocional] = useState<string[]>([]);
  const [error, setError] = useState('');

  const getListVideos = () => {
    const localToken = localStorage.getItem('token');
    const authConfig = JSON.parse(localStorage.getItem('authConfig'));

    const args = {
      host: authConfig?.host,
      token: localToken,
    };

    ipc
      .invoke('imagenes-publicidad', args)
      .then((res) => {
        setListPromocional(res?.imagenes);
      })
      // eslint-disable-next-line no-console
      .catch((err) => {
        setError('Volviendo a buscar videos');
      });
  };

  useEffect(() => {
    getListVideos()
  }, []);

  const OnClickHiddenVideo = () => {
    setIsVideoPlay(!isVideoPlay);
  };

  return { listPromocional, error, OnClickHiddenVideo };
}
