import "./App.css";
import React, { useState, useEffect } from "react";
import { connectToBinance } from "./services/binanceWebSocket";
import CandlestickChart from "./components/CandletickChart";
const App = () => {
  const [symbol, setSymbol] = useState("ethusdt");
  const [interval, setInterval] = useState("1m");
  const [chartData, setChartData] = useState([]);

  // Connect to WebSocket for market data
  useEffect(() => {
    const ws = connectToBinance(symbol, interval, (data) => {
      const candlestick = {
        t: data.k.t, // time
        o: data.k.o, // open
        h: data.k.h, // high
        l: data.k.l, // low
        c: data.k.c, // close
      };
      setChartData((prevData) => [...prevData, candlestick]);
    });

    return () => ws.close();
  }, [symbol, interval]);

  // Handle symbol change directly in App.js
  const handleSymbolChange = (e) => setSymbol(e.target.value);

  // Handle interval change directly in App.js
  const handleIntervalChange = (e) => setInterval(e.target.value);

  return (
    <div className="app-container">
      <h1>Cryptocurrency Market Data</h1>

      <div className="controls">
        <select onChange={handleSymbolChange} value={symbol}>
          <option value="ethusdt">ETH/USDT</option>
          <option value="bnbusdt">BNB/USDT</option>
          <option value="dotusdt">DOT/USDT</option>
        </select>

        <select onChange={handleIntervalChange} value={interval}>
          <option value="1m">1 Minute</option>
          <option value="3m">3 Minutes</option>
          <option value="5m">5 Minutes</option>
        </select>
      </div>

      <CandlestickChart data={chartData} symbol={symbol} />
    </div>
  );
};

export default App;
