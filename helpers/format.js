export const formatNumber = (number) => {
    return new Intl.NumberFormat('es-CO').format(Number(number));
  };
  
  export const FormatDay = (date) => {
    const newDate = new Date(date);
    return new Intl.DateTimeFormat('en-US').format(newDate);
  };
  
  export const formatMoney = (number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    }).format(Number(number));
  };
  
  export function shortName(name) {
    const ArrName = name.split(' ');
    if (ArrName.length > 1) {
      return `${ArrName[0]} ${ArrName[1].slice(0, 1)}`;
    }
    return ArrName[0];
  }