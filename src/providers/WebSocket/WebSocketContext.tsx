import { createContext, useContext, type Dispatch, type SetStateAction } from 'react';
export type OrderTuple = [string, string];
export type OrderBookResponse = {
  asks: OrderTuple[]; // Array of [price, quantity] tuples
  bids: OrderTuple[]; // Array of [price, quantity] tuples
  lastUpdateId: number;
};

export const WebsocketContext = createContext<{
  isConnected: boolean;
  fetchedFirstMessage: boolean;
  orderBook: OrderBookResponse | null;
  setExchange: Dispatch<SetStateAction<string>>;
  setDepth: Dispatch<SetStateAction<5 | 10 | 20>>;
  setSpeed: Dispatch<SetStateAction<100 | 1000>>;
}>({
  isConnected: false,
  fetchedFirstMessage: false,
  orderBook: null,
  setExchange: () => {},
  setDepth: () => {},
  setSpeed: () => {},
});

export const useWebsocket = () => {
  const context = useContext(WebsocketContext);
  if (!context) {
    throw new Error('useWebsocket must be used within a WebsocketProvider');
  }
  return context;
};
