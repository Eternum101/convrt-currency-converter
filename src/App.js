import React, { useState, useEffect } from "react";
import "./main.css";
import { TbTransferVertical } from "react-icons/tb";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

function App() {
  const [fromCurrency, setFromCurrency] = useState('AUD');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromCurrencyName, setFromCurrencyName] = useState('');
  const [toCurrencyName, setToCurrencyName] = useState('');
  const [currencies, setCurrencies] = useState([]);
  const [isFromOpen, setIsFromOpen] = useState(false);
  const [isToOpen, setIsToOpen] = useState(false);
  
  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json')
      .then(response => response.json())
      .then(data => {
        let currencyCodes = Object.keys(data);

        currencyCodes.sort((a, b) => {
          const regex = /^[a-zA-Z]/;
          if (regex.test(a) && regex.test(b)) {
            return a.localeCompare(b);
          } else if (regex.test(a)) {
            return -1;
          } else if (regex.test(b)) {
            return 1;
          } else {
            return a.localeCompare(b);
          }
        });

        setCurrencies(currencyCodes);
        setFromCurrencyName(data[fromCurrency.toLowerCase()] || '');
        setToCurrencyName(data[toCurrency.toLowerCase()] || '');
      })
      .catch(error => console.error(error));
  }, [fromCurrency, toCurrency]);

  const handleFromCurrencyChange = (newCurrency) => {
    setFromCurrency(newCurrency.toUpperCase());
    setIsFromOpen(false);
    setIsToOpen(false);
  };

  const handleToCurrencyChange = (newCurrency) => {
    setToCurrency(newCurrency.toUpperCase());
    setIsToOpen(false);
    setIsFromOpen(false);
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
          <img src={`/flags/${fromCurrency.toLowerCase()}.png`} alt={`${fromCurrency} flag`} onError={(e) => {e.target.onerror = null; e.target.style.display='none'}} onLoad={(e) => {e.target.style.display=''}} />
            <div className="currency">
              <div className="currency-icon-container">
                <h2>{fromCurrency}</h2>
                <MdOutlineKeyboardArrowDown onClick={() => {setIsFromOpen(!isFromOpen); setIsToOpen(false);}}/>
              </div>
              <p>{fromCurrencyName}</p>
              {isFromOpen && (
                <div className="currency-dropdown">
                  {currencies.map((currency) => (
                    <div key={currency} onClick={() => handleFromCurrencyChange(currency)}>
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
        <img src={`/flags/${toCurrency.toLowerCase()}.png`} alt={`${toCurrency} flag`} onError={(e) => {e.target.onerror = null; e.target.style.display='none'}} onLoad={(e) => {e.target.style.display=''}} />
            <div className="currency">
              <div className="currency-icon-container">
                <h2>{toCurrency}</h2>
                <MdOutlineKeyboardArrowDown onClick={() => {setIsToOpen(!isToOpen); setIsFromOpen(false);}}/>
              </div>
              <p>{toCurrencyName}</p>
              {isToOpen && (
                <div className="currency-dropdown">
                  {currencies.map((currency) => (
                    <div key={currency} onClick={() => handleToCurrencyChange(currency)}>
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
