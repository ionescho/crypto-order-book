import type { FC } from 'react';
import { useWebsocket, type OrderBookResponse } from '../../providers/WebSocket/WebSocketContext';
import { OrderBookSection } from './OrderBookSection';
import { OrderBookRatio } from './OrderBookRatio';
import { OrderBookControls } from './OrderBookControls';

const parseSection: (section: [string, string][]) => [string, number, string][] = section =>
  section.map(([price, qty]) => [Number(price).toFixed(2), Number(qty), (Number(price) * Number(qty)).toFixed(6)]);

const parseOrderBook = (orderBook: OrderBookResponse) => {
  const asks = parseSection(orderBook.asks);
  const bids = parseSection(orderBook.bids);

  return {
    asks,
    bids,
    bidsTotal: bids.reduce((acc, [_, qty]) => acc + qty, 0),
    asksTotal: asks.reduce((acc, [_, qty]) => acc + qty, 0),
  };
};

export const OrderBook: FC = () => {
  const { isConnected, orderBook } = useWebsocket();

  const parsedOrderBook = orderBook ? parseOrderBook(orderBook) : null;

  return (
    <div>
      <h2>Order Book</h2>
      <div style={{ display: isConnected ? 'block' : 'none' }}>
        <div
          style={{ display: parsedOrderBook ? 'flex' : 'none', flexDirection: 'column', alignItems: 'stretch', gap: '20px', width: 320 }}
        >
          <OrderBookControls />
          <OrderBookSection list={parsedOrderBook?.asks} variant='asks' />
          <OrderBookSection list={parsedOrderBook?.bids} variant='bids' />
          <OrderBookRatio asksTotal={parsedOrderBook?.asksTotal} bidsTotal={parsedOrderBook?.bidsTotal} />
        </div>
        <p style={{ display: parsedOrderBook ? 'none' : 'block' }}>No data available</p>
      </div>
      <p style={{ display: !isConnected ? 'block' : 'none' }}>Connecting...</p>
    </div>
  );
};
