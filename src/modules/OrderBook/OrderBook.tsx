import type { FC } from 'react';
import { useWebsocket, type OrderBookResponse } from '../../providers/WebSocket/WebSocketContext';
import { OrderBookSection } from './OrderBookSection';
import { OrderBookRatio } from './OrderBookRatio';
import { OrderBookHeaderAndControls } from './OrderBookHeaderAndControls';

const parseSection: (section: [string, string][]) => [string, number, string][] = section =>
  section.map(([price, qty]) => [Number(price).toFixed(2), Number(qty), (Number(price) * Number(qty)).toFixed(6)]);

const parseOrderBook = (orderBook: OrderBookResponse) => {
  const asks = parseSection(orderBook.asks);
  const bids = parseSection(orderBook.bids);

  const asksQuantities = asks.map(([_, qty]) => qty);
  const bidsQuantities = bids.map(([_, qty]) => qty);

  return {
    asks,
    bids,
    bidsTotal: asksQuantities.reduce((acc, qty) => acc + qty, 0),
    asksTotal: bidsQuantities.reduce((acc, qty) => acc + qty, 0),
    maxQuantity: Math.max(...asksQuantities, ...bidsQuantities),
  };
};

export const OrderBook: FC = () => {
  const { isConnected, orderBook } = useWebsocket();

  const parsedOrderBook = orderBook ? parseOrderBook(orderBook) : null;

  return (
    <>
      <div style={{ display: isConnected ? 'block' : 'none', backgroundColor: 'var(--bg-card)', padding: 20, borderRadius: 8 }}>
        <div
          style={{ display: parsedOrderBook ? 'flex' : 'none', flexDirection: 'column', alignItems: 'stretch', gap: '20px', width: 320 }}
        >
          <OrderBookHeaderAndControls />
          <OrderBookSection list={parsedOrderBook?.asks} maxQuantity={parsedOrderBook?.maxQuantity} variant='asks' />
          <OrderBookSection list={parsedOrderBook?.bids} maxQuantity={parsedOrderBook?.maxQuantity} variant='bids' />
          <OrderBookRatio asksTotal={parsedOrderBook?.asksTotal} bidsTotal={parsedOrderBook?.bidsTotal} />
        </div>
        <p style={{ display: parsedOrderBook ? 'none' : 'block' }}>No data available</p>
      </div>
      <p style={{ display: !isConnected ? 'block' : 'none' }}>Connecting...</p>
    </>
  );
};
