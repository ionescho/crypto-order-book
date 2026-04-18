import { useEffect, useState } from 'react';
import { WebsocketContext, type OrderBookResponse } from './WebSocketContext';

type Props = {
  children: React.ReactNode;
};

const WS_BASE_URL = 'wss://stream.binance.com:9443/ws/';

export const WebsocketProvider = ({ children }: Props) => {
  const [isConnected, setIsConnected] = useState(false);
  const [orderBook, setOrderBook] = useState<OrderBookResponse | null>(null);

  const [exchange, setExchange] = useState<string>('btcusdt');
  const [depth, setDepth] = useState<5 | 10 | 20>(20);
  const [speed, setSpeed] = useState<100 | 1000>(1000);

  useEffect(() => {
    const socket = new WebSocket(`${WS_BASE_URL}${exchange}@depth${depth}@${speed}ms`);

    socket.onopen = () => {
      setIsConnected(true);
    };

    socket.onmessage = event => {
      const payload = JSON.parse(event.data);
      setOrderBook(payload);
    };

    socket.onclose = () => {
      setIsConnected(false);
    };

    return () => {
      socket.close();
    };
  }, [exchange, depth, speed]);

  return (
    <WebsocketContext.Provider value={{ isConnected, orderBook, setExchange, setDepth, setSpeed }}>{children}</WebsocketContext.Provider>
  );
};
