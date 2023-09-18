import { useEffect, useState } from 'react';

export default function useOnline() {
  const [isOnline, setIsOnline] = useState(true); // Assume the user is initially online

  const checkOnlineStatus = () => {
    setIsOnline(navigator.onLine);
  };

  useEffect(() => {
    checkOnlineStatus(); // Check the online status when the component mounts

    const interval = setInterval(checkOnlineStatus, 1000 * 60 * 5); // Check the online status every 5 minutes

    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };
  }, []);

  return { isOnline, setIsOnline };
}
