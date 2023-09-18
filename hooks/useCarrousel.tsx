import { useEffect, useState } from 'react';

export default function useCarrousel(carouselItems: string[]) {
  const [active, setActive] = useState(0);

  useEffect(() => {
   const scrollInterval = setTimeout(() => {
      if (active >= carouselItems.length - 1) {
        setActive(0);
      } else {
        setActive(active + 1);
      }
    }, 1000 * 60);
      return () => clearTimeout(scrollInterval); 
  }, [active, carouselItems.length]);

  return { active };
}
