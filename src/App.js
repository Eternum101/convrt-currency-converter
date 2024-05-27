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
  const [fromCurrencyArrowRotation, setFromCurrencyArrowRotation] = useState(0);
  const [toCurrencyArrowRotation, setToCurrencyArrowRotation] = useState(0);
  const [currencyNames, setCurrencyNames] = useState({});
  const [currenciesWithFlags, setCurrenciesWithFlags] = useState([]);
  const [searchCurrencies, setSearchCurrencies] = useState([]);

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json')
      .then(response => response.json())
      .then(data => {
        let currencyCodes = Object.keys(data);
        const currencyNameMap = {};

        currencyCodes.forEach(currencyCode => {
          currencyNameMap[currencyCode] = data[currencyCode];
          const img = new Image();
          img.src = `/flags/${currencyCode.toLowerCase()}.png`;
          img.onload = () => setCurrenciesWithFlags(oldCurrencies => [...oldCurrencies, currencyCode]);
        });

        Promise.all(currencyCodes.map(currencyCode => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = `/flags/${currencyCode.toLowerCase()}.png`;
            img.onload = () => resolve(currencyCode);
            img.onerror = () => resolve(null);
          });
        })).then(currenciesWithFlags => {
          currenciesWithFlags = currenciesWithFlags.filter(currency => currency !== null);
          setCurrenciesWithFlags(currenciesWithFlags);
          currencyCodes.sort((a, b) => {
            const aHasFlag = currenciesWithFlags.includes(a);
            const bHasFlag = currenciesWithFlags.includes(b);
            if (aHasFlag && !bHasFlag) {
              return -1;
            } else if (!aHasFlag && bHasFlag) {
              return 1;
            } else {
              return a.localeCompare(b);
            }
          });
          setCurrencies(currencyCodes);
          setCurrencyNames(currencyNameMap);
          setFromCurrencyName(data[fromCurrency.toLowerCase()] || '');
          setToCurrencyName(data[toCurrency.toLowerCase()] || '');
        });
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

  const toggleFromCurrencyDropdown = () => {
    setIsFromOpen(!isFromOpen);
    setFromCurrencyArrowRotation(fromCurrencyArrowRotation === 0 ? 180 : 0);
    setIsToOpen(false);
    setToCurrencyArrowRotation(0);
  };

  const toggleToCurrencyDropdown = () => {
    setIsToOpen(!isToOpen);
    setToCurrencyArrowRotation(toCurrencyArrowRotation === 0 ? 180 : 0);
    setIsFromOpen(false);
    setFromCurrencyArrowRotation(0);
  };

  const handleFromCurrencySearch = (event) => {
    const searchValue = event.target.value.toUpperCase();
    setFromCurrency(searchValue);
    
    const filteredCurrencies = currencies.filter(currency => 
      currency.startsWith(searchValue) || 
      (currencyNames[currency] && currencyNames[currency].toUpperCase().startsWith(searchValue))
    );
    
    setSearchCurrencies(filteredCurrencies);
  };
  
  const handleToCurrencySearch = (event) => {
    const searchValue = event.target.value.toUpperCase();
    setToCurrency(searchValue);
    
    const filteredCurrencies = currencies.filter(currency => 
      currency.startsWith(searchValue) || 
      (currencyNames[currency] && currencyNames[currency].toUpperCase().startsWith(searchValue))
    );
    
    setSearchCurrencies(filteredCurrencies);
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
          <img className="currency-flag" src={`/flags/${fromCurrency.toLowerCase()}.png`} alt={`${fromCurrency} flag`} onError={(e) => {e.target.onerror = null; e.target.style.display='none'}} onLoad={(e) => {e.target.style.display=''}} />
            <div className="currency">
              <div className="currency-icon-container">
                {isFromOpen ? (
                  <input type="text" onChange={handleFromCurrencySearch} value={fromCurrency}/>
                ) : (
                  <h2>{fromCurrency}</h2>
                )}
                <MdOutlineKeyboardArrowDown onClick={toggleFromCurrencyDropdown} style={{ transform: `rotate(${fromCurrencyArrowRotation}deg)` }} />
              </div>
              <p>{fromCurrencyName}</p>
              {isFromOpen && (
                <div className="currency-dropdown">
                  {currencies.map((currency) => (
                    <div className="dropdown-list" key={currency} onClick={() => handleFromCurrencyChange(currency)}>
                      <img className="dropdown-flag" src={`/flags/${currency.toLowerCase()}.png`} alt={`${currency} flag`} onError={(e) => {e.target.onerror = null; e.target.style.display='none'}} onLoad={(e) => {e.target.style.display=''}} />
                      {currencyNames[currency] ? `${currency.toUpperCase()} - ${currencyNames[currency]}` : currencyNames[currency] === '' ? currency.toUpperCase() : null}
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
        <img className="currency-flag" src={`/flags/${toCurrency.toLowerCase()}.png`} alt={`${toCurrency} flag`} onError={(e) => {e.target.onerror = null; e.target.style.display='none'}} onLoad={(e) => {e.target.style.display=''}} />
            <div className="currency">
              <div className="currency-icon-container">
                {isToOpen ? (
                  <input type="text" onChange={handleToCurrencySearch} value={toCurrency} />
                ) : (
                  <h2>{toCurrency}</h2>
                )}
                <MdOutlineKeyboardArrowDown onClick={toggleToCurrencyDropdown} style={{ transform: `rotate(${toCurrencyArrowRotation}deg)` }} />
              </div>
              <p>{toCurrencyName}</p>
              {isToOpen && (
                <div className="currency-dropdown">
                  {currencies.map((currency) => (
                    <div className="dropdown-list" key={currency} onClick={() => handleToCurrencyChange(currency)}>
                      <img className="dropdown-flag" src={`/flags/${currency.toLowerCase()}.png`} alt={`${currency} flag`} onError={(e) => {e.target.onerror = null; e.target.style.display='none'}} onLoad={(e) => {e.target.style.display=''}} />
                      {currencyNames[currency] ? `${currency.toUpperCase()} - ${currencyNames[currency]}` : currencyNames[currency] === '' ? currency.toUpperCase() : null}
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
