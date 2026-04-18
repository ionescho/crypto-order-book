import { useEffect, useState } from 'react';
import { WebsocketContext, type OrderBookResponse } from './WebSocketContext';

type Props = {
  children: React.ReactNode;
};

const WS_BASE_URL = 'wss://stream.binance.com:9443/ws/';

export const WebsocketProvider = ({ children }: Props) => {
  const [isConnected, setIsConnected] = useState(false);
  const [fetchedFirstMessage, setFetchedFirstMessage] = useState<boolean>(false);
  const [orderBook, setOrderBook] = useState<OrderBookResponse | null>(null);

  const [exchange, setExchange] = useState<string>('btcusdt');
  const [depth, setDepth] = useState<5 | 10 | 20>(20);
  const [speed, setSpeed] = useState<100 | 1000>(1000);

  useEffect(() => {
    const socket = new WebSocket(`${WS_BASE_URL}${exchange}@depth${depth}@${speed}ms`);

    socket.onopen = () => {
      console.log('has Opened');
      setIsConnected(true);
      setFetchedFirstMessage(false);
    };

    socket.onmessage = event => {
      console.log('got message');
      const payload = JSON.parse(event.data);

      setFetchedFirstMessage(true);
      setOrderBook(payload);
    };

    socket.onclose = () => {
      console.log('closing');
      setIsConnected(false);
      setFetchedFirstMessage(false);
    };

    return () => {
      socket.close();
    };
  }, [exchange, depth, speed]);

  return (
    <WebsocketContext.Provider value={{ isConnected, fetchedFirstMessage, orderBook, setExchange, setDepth, setSpeed }}>
      {children}
    </WebsocketContext.Provider>
  );
};
