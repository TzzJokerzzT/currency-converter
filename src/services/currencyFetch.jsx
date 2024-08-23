import { urlCurrency } from "./data";
export const currencyFetch = async (value, cur1, cur2) => {
  const response = await fetch(
    `${urlCurrency}latest?amount=${value}&from=${cur1}&to=${cur2}`
  );
  const data = await response.json();
  return data;
};

export const getCurrencyFetch = async () => {
  const response = await fetch(`${urlCurrency}currencies`);
  const data = await response.json();
  return data;
};
