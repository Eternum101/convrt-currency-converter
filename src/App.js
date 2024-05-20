import React from "react";
import "./main.css";
import { TbTransferVertical } from "react-icons/tb";

function App() {
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
            <div>Circle</div>
            <div className="currency">
              <h2>SGD</h2>
              <p>Singapore Dollar</p>
            </div>
          </div>
        <div className="currency-text">
          <h2>1000.00</h2>
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
            <div>Circle</div>
            <div className="currency">
              <h2>USD</h2>
              <p>United States Dollar</p>
            </div>
          </div>
        <div className="currency-text">
          <h2>736.70</h2>
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
