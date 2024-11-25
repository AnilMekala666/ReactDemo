import moment from 'moment';

export const getDateFormat_DD_MM_YYYY = (date) => {
  return moment(date).format('DD-MM-YYYY');
};

export function formatUsNumberSystem(value) {
    const cleanedValue = value.replace(/,/g, '');
  
    if (!/^\d*\.?\d*$/.test(cleanedValue)) {
      return value; // Allow the user to continue typing
    }
  
    const number = parseFloat(cleanedValue);
  
    if (isNaN(number) || cleanedValue === '.') {
      return value;
    }
  
    const [integerPart, decimalPart] = cleanedValue.split('.');
  
    const formattedInteger = new Intl.NumberFormat('en-US', {
      useGrouping: true,
    }).format(integerPart);
  
    return decimalPart !== undefined ? `${formattedInteger}.${decimalPart}` : formattedInteger;
  }
  
  
