import React, { useState, useEffect } from "react";
import "./main.css";
import { TbTransferVertical } from "react-icons/tb";

function App() {
  const [fromCurrency, setFromCurrency] = useState("SGD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState(null);
  
  useEffect(() => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then(response => response.json())
      .then(data => {
        setExchangeRate(data.rates[toCurrency]);
      });
  }, [fromCurrency, toCurrency]);
  
  return (
    <main className="layout">
      <section className="header-section">
        <div className="header-title">
          <h1>CONVRT</h1>
        </div>
        <div className="header-subtitle">
          <h2>Hi, Welcome! 👋</h2>
          <h3>Exchange Globally, Instantly!</h3>
        </div>
      </section>
      <section className="converter-section">
        <div className="converting-box">
          <div className="converting-title">
            <p>Amount</p>
          </div>
        <div className="currency-container">
          <div className="currency-box">
            <img src={`/flags/${fromCurrency.slice(0, 2).toLowerCase()}.png`} alt={`${fromCurrency} flag`} />
            <div className="currency">
              <h2>{fromCurrency}</h2>
              <p>Singapore Dollar</p>
            </div>
          </div>
        <div className="currency-text">
          <input type="number"></input>
        </div>
        </div>
        <div className="icon-container">
          <div className="line"></div>
          <div className="ellipse">
            <TbTransferVertical />
          </div>
        </div>
        <div className="converting-title">
            <p>Converted Amount</p>
        </div>
      <div className="currency-container">
        <div className="currency-box">
        <img src={`/flags/${toCurrency.slice(0, 2).toLowerCase()}.png`} alt={`${toCurrency} flag`} />
            <div className="currency">
              <h2>{toCurrency}</h2>
              <p>United States Dollar</p>
            </div>
          </div>
        <div className="currency-text">
          <input type="number"></input>
        </div>
        </div>
      </div>
      </section>
      <section className="exchange-rate-section">
        <div className="exchange-rate-container">
          <p>Today</p>
        <div className="exchange-rate">
          <p>1 SGD = 0.7367 USD</p>
        </div>
        </div>
      </section>
    </main>
  );
}

export default App;
