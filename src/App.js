// import axios from "axios";
import react from "react";
import { useState, useEffect } from "react";

export default function App() {
  const [base, setBase] = useState("INR");
  const [amount, setAmount] = useState("1");
  const [currencies, setCurrency] = useState("INR");
  const [result, setResult] = useState();

  useEffect(() => {
    fetch(
      `https://api.forexrateapi.com/v1/latest?api_key=5dfbd4430f2c97249154924c90d07bf4` +
        `&base=${base}&currencies=${currencies}`
    )
      .then((res) => res.json())
      .then((data) => {
        data = JSON.stringify(data);
        setResult(JSON.parse(data));
      })
      .catch((err) => console.log(err));
  }, [(base, currencies)]);
  function convertCurrency(e) {
    e.preventDefault();
    const amountReq = Number(amount) * Number(result["rates"][currencies]);
    document.getElementById(
      "result"
    ).innerText = `${amount} ${base} is equal to ${amountReq} ${currencies}`;
  }
  return (
    <div className="container">
      <h1>Currency Converter</h1>

      <label htmlFor="fromCurrency">From Currency:</label>
      <select
        id="fromCurrency"
        value={base}
        onInput={(e) => {
          setBase(e.target.value);
        }}
      >
        <option value="INR">INR</option>
        <option value="CNY">CNY</option>
        <option value="RUB">RUB</option>
        <option value="CAD">CAD</option>
        <option value="AUD">AUD</option>
        <option value="ZAR">ZAR</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </select>

      <br />

      <label htmlFor="amount">Amount:</label>
      <input
        type="number"
        id="amount"
        placeholder="Enter amount"
        value={amount}
        onInput={(e) => {
          setAmount(e.target.value);
        }}
      />

      <br />

      <label htmlFor="toCurrency">To Currency:</label>
      <select
        id="toCurrency"
        value={currencies}
        onInput={(e) => {
          setCurrency(e.target.value);
        }}
      >
        <option value="INR">INR</option>
        <option value="CNY">CNY</option>
        <option value="RUB">RUB</option>
        <option value="CAD">CAD</option>
        <option value="AUD">AUD</option>
        <option value="ZAR">ZAR</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </select>

      <br />

      <button onClick={convertCurrency}>Convert</button>

      <div id="result"></div>
    </div>
  );
}
