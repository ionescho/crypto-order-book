import type { FC } from 'react';
import { useWebsocket, type OrderBookResponse } from '../../providers/WebSocket/WebSocketContext';
import { OrderBookHeaderAndControls } from './OrderBookHeader/OrderBookHeaderAndControls';
import { OrderBookSection } from './OrderBookBody/OrderBookSection';
import { OrderBookRatio } from './OrderBookBody/OrderBookRatio';
import styles from './Orderbook.module.css';

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
  const { isConnected, fetchedFirstMessage, orderBook } = useWebsocket();

  const parsedOrderBook = orderBook ? parseOrderBook(orderBook) : null;

  return (
    <>
      <div className={`${styles.orderBook} ${isConnected && fetchedFirstMessage && parsedOrderBook ? '' : 'hide'}`}>
        <OrderBookHeaderAndControls />
        <div className={`${styles.orderBookBody} d-flex flex-column align-items-stretch`}>
          <OrderBookSection list={parsedOrderBook?.asks} maxQuantity={parsedOrderBook?.maxQuantity} variant='asks' />
          <OrderBookSection list={parsedOrderBook?.bids} maxQuantity={parsedOrderBook?.maxQuantity} variant='bids' />
          <OrderBookRatio asksTotal={parsedOrderBook?.asksTotal} bidsTotal={parsedOrderBook?.bidsTotal} />
        </div>
      </div>
      <p className={isConnected && fetchedFirstMessage && !parsedOrderBook ? '' : 'hide'}>No data available</p>
      <p className={!isConnected ? '' : 'hide'}>Connecting...</p>
      <p className={isConnected && !fetchedFirstMessage ? '' : 'hide'}>Waiting for data...</p>
    </>
  );
};
