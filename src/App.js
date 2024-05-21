import React, { useState, useEffect } from "react";
import "./main.css";
import { TbTransferVertical } from "react-icons/tb";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

function App() {
  const [currency, setCurrency] = useState('AUD');
  const [currencyName, setCurrencyName] = useState('');
  const [currencies, setCurrencies] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json')
      .then(response => response.json())
      .then(data => {
        setCurrencies(Object.keys(data));
        setCurrencyName(data[currency.toLowerCase()] || '');
      })
      .catch(error => console.error(error));
  }, [currency]);

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency.toUpperCase());
    setIsOpen(false);
  };

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
            <img src={`/flags/${currency.slice(0, 2).toLowerCase()}.png`} alt={`${currency} flag`} />
            <div className="currency">
              <div className="currency-icon-container">
                <h2>{currency}</h2>
                <MdOutlineKeyboardArrowDown onClick={() => setIsOpen(!isOpen)}/>
              </div>
              <p>{currencyName}</p>
              {isOpen && (
                <div className="currency-dropdown">
                  {currencies.map((currency) => (
                    <div key={currency} onClick={() => handleCurrencyChange(currency)}>
                      {currency.toUpperCase()}
                    </div>
                  ))}
                </div>
              )}
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
       {/*<img src={`/flags/${toCurrency.slice(0, 2).toLowerCase()}.png`} alt={`${toCurrency} flag`} />*/}
          <div className="currency">
            <div className="currency-icon-container">
                <h2>USD</h2>
                <MdOutlineKeyboardArrowDown />
              </div>
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
