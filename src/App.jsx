import "./App.css";
import { useEffect, useState } from "react";
import { currencyFetch, getCurrencyFetch } from "./services/currencyFetch";

const App = () => {
  ///States
  const [value, setValue] = useState(1);
  const [curr1, setCurr1] = useState("USD");
  const [curr2, setCurr2] = useState("EUR");
  const [result, setResult] = useState(0);
  const [currency, setCurrency] = useState({});
  ///Functions
  const convertedResults = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: curr2,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const results = convertedResults.format(result);
  ///Handlers Functions
  const handleChangeCurr1 = (e) => {
    setCurr1(e.target.value);
  };

  const handleChangeCurr2 = (e) => {
    setCurr2(e.target.value);
  };

  const handleChangeValue = (e) => {
    setValue(e.target.value);
  };
  ///UseEffect
  useEffect(() => {
    const fetchData = async () => {
      const data = await currencyFetch(value, curr1, curr2);
      setResult(data.rates[curr2]);
    };
    const getCurrency = async () => {
      const data = await getCurrencyFetch();
      setCurrency(data);
    };
    fetchData();
    getCurrency();
  }, [value, curr1, curr2]);

  return (
    <div className="content">
      <h1>Currency Converter</h1>
      <div>
        <input
          type="number"
          placeholder="Enter amount"
          onChange={handleChangeValue}
        />
        <div>
          <select value={curr1} onChange={handleChangeCurr1}>
            {Object.entries(currency).map(([code, name]) => (
              <option disabled={code === curr2} key={code} value={code}>
                {code} - {name}
              </option>
            ))}
          </select>
          <span>To</span>
          <select value={curr2} onChange={handleChangeCurr2}>
            {Object.entries(currency).map(([code, name]) => (
              <option disabled={code === curr1} key={code} value={code}>
                {code} - {name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <p>Result: {results} </p>
      </div>
    </div>
  );
};

export default App;
