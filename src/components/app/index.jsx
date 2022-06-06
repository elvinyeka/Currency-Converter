import { useState, useEffect } from 'react';
import axios from 'axios';
import CurrencyInput from '../currency-input';
import usdflag from "../../assets/flags/USD.png";
import eurflag from "../../assets/flags/EUR.png";
import './styles.scss';

function App() {
  const [firstAmount, setFirstAmount] = useState(1);
  const [secondAmount, setSecondAmount] = useState(1);
  const [firstCurrency, setFirstCurrency] = useState("USD");
  const [secondCurrency, setSecondCurrency] = useState("UAH");
  const [rates, setRates] = useState([]);

  useEffect(() => {
    axios.get("https://v6.exchangerate-api.com/v6/6492b1d17e7bf8abaae20e52/latest/USD")
      .then(res => {
        setRates(res.data.conversion_rates)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!!rates) {
      handleFirstAmount(1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rates])

  const formatValue = (number) => {
    return number.toFixed(4);
  }

  const handleFirstAmount = (firstAmount) => {
    setSecondAmount(formatValue(firstAmount * rates[secondCurrency] / rates[firstCurrency]))
    setFirstAmount(firstAmount);
  }

  const handleFirstCurrensy = (firstCurrency) => {
    setSecondAmount(formatValue(firstAmount * rates[secondCurrency] / rates[firstCurrency]));
    setFirstCurrency(firstCurrency);
  }

  const handleSecondAmount = (secondAmount) => {
    setFirstAmount(formatValue(secondAmount * rates[firstCurrency] / rates[secondCurrency]));
    setSecondAmount(secondAmount);
  }

  const handleSecondCurrensy = (secondCurrency) => {
    setFirstAmount(formatValue(secondAmount * rates[firstCurrency] / rates[secondCurrency]));
    setSecondCurrency(secondCurrency);
  }

  const handleCurrencyToUAH = (currency) => {
    let ratesUAH = 0;
    Object.keys(rates).forEach((rate, i) => {
      if (rate === currency) {
        ratesUAH = formatValue(rates["UAH"] / rates[currency]);
      }
    })
    return ratesUAH;
  }

  return (
    <div className="container">
      <h1 className="app-header">Конвертер валют</h1>
      <h3 className="app-subheader">Kурс валют по отношению к гривне (UAH)</h3>
      <table className="app-table">
        <thead>
          <tr>
            <th>НАИМЕНОВАНИЕ ВАЛЮТЫ</th>
            <th>UAH</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="app-table__country">
              <img
                className="app-table__img"
                src={usdflag}
                alt="usd flag" />
              1 Доллар США , USD
            </td>
            <td>{handleCurrencyToUAH("USD")}</td>
          </tr>
          <tr>
            <td className="app-table__country">
              <img
                className="app-table__img"
                src={eurflag}
                alt="usd flag" />
              1 Евро , EUR
            </td>
            <td>{handleCurrencyToUAH("EUR")}</td>
          </tr>
        </tbody>
      </table>
      <div className="app-currency">
        <CurrencyInput
          currencies={Object.keys(rates)}
          amount={firstAmount}
          currency={firstCurrency}
          onAmountChanges={handleFirstAmount}
          onCurrencyChanges={handleFirstCurrensy}
        />
        <i class="fa-solid fa-arrow-right-arrow-left"></i>
        <CurrencyInput
          currencies={Object.keys(rates)}
          amount={secondAmount}
          currency={secondCurrency}
          onAmountChanges={handleSecondAmount}
          onCurrencyChanges={handleSecondCurrensy}
        />
      </div>
    </div>
  );
}

export default App;
