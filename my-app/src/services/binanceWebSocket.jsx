export const connectToBinance = (symbol, interval, onMessage) => {
  const ws = new WebSocket(
    `wss://stream.binance.com:9443/ws/${symbol}@kline_${interval}`
  );

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  ws.onclose = () => console.log("WebSocket disconnected");

  return ws;
};
