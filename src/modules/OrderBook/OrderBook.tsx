import { useCallback, useMemo, useState, type FC } from 'react';
import { useWebsocket, type OrderBookResponse } from '../../providers/WebSocket/WebSocketContext';
import { OrderBookHeaderAndControls } from './OrderBookHeader/OrderBookHeaderAndControls';
import { OrderBookSection } from './OrderBookBody/OrderBookSection';
import { OrderBookRatio } from './OrderBookBody/OrderBookRatio';
import styles from './Orderbook.module.css';
import { INITIAL_CONFIG } from './constants';
import type { OrderBookConfig } from './types';

const parseSection: (
  section: [string, string][],
  percentages: number[],
  config: OrderBookConfig,
) => { price: string; quantity: number; total: string; percentage: number }[] = (section, percentages, config) =>
  section.map(([price, qty], i) => {
    const total = Number(price) * Number(qty);
    let formattedTotal: string;
    if (config.rounding && total > 1000) {
      formattedTotal = `${((Number(price) * Number(qty)) / 1000).toFixed(2)}K`;
    } else {
      formattedTotal = (Number(price) * Number(qty)).toFixed(6);
    }

    return {
      price: Number(price).toFixed(2),
      quantity: Number(qty),
      total: formattedTotal,
      percentage: percentages[i],
    };
  });

const parseOrderBook = (orderBook: OrderBookResponse, config: OrderBookConfig) => {
  const asksQuantities = orderBook.asks.map(([_, qty]) => Number(qty));
  const bidsQuantities = orderBook.bids.map(([_, qty]) => Number(qty));

  const asksTotal = asksQuantities.reduce((acc, qty) => acc + qty, 0);
  const bidsTotal = bidsQuantities.reduce((acc, qty) => acc + qty, 0);

  const maxTotal = Math.max(...asksQuantities, ...bidsQuantities);

  let asksBarPercentages: number[];
  let bidsBarPercentages: number[];

  if (config.depthVisualization === 'amount') {
    asksBarPercentages = asksQuantities.map(qty => (qty / maxTotal) * 100);
    bidsBarPercentages = bidsQuantities.map(qty => (qty / maxTotal) * 100);
  } else {
    const maxRunningTotal = Math.max(asksTotal, bidsTotal);
    let sum = 0;
    asksBarPercentages = asksQuantities.map(qty => {
      sum += qty;
      return (sum / maxRunningTotal) * 100;
    });
    sum = 0;
    bidsBarPercentages = bidsQuantities.map(qty => {
      sum += qty;
      return (sum / maxRunningTotal) * 100;
    });
  }

  const asks = parseSection(orderBook.asks, asksBarPercentages, config);
  const bids = parseSection(orderBook.bids, bidsBarPercentages, config);

  return {
    asks,
    bids,
    asksTotal,
    bidsTotal,
    asksBarPercentages,
    bidsBarPercentages,
  };
};

export const OrderBook: FC = () => {
  const { isConnected, fetchedFirstMessage, orderBook } = useWebsocket();

  const [config, setConfig] = useState<OrderBookConfig>(INITIAL_CONFIG);
  const handleConfigChange = useCallback((key: string, value: boolean | string) => {
    setConfig(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const parsedOrderBook = useMemo(() => {
    return orderBook ? parseOrderBook(orderBook, config) : null;
  }, [orderBook, config]);

  return (
    <>
      <div className={`${styles.orderBook} ${isConnected && fetchedFirstMessage && parsedOrderBook ? '' : 'hide'}`}>
        <OrderBookHeaderAndControls onConfigChange={handleConfigChange} />
        <div className={`${styles.orderBookBody} d-flex flex-column align-items-stretch`}>
          <OrderBookSection list={parsedOrderBook?.asks} variant='asks' />
          <OrderBookSection list={parsedOrderBook?.bids} variant='bids' />
          <OrderBookRatio asksTotal={parsedOrderBook?.asksTotal} bidsTotal={parsedOrderBook?.bidsTotal} />
        </div>
      </div>
      <p className={isConnected && fetchedFirstMessage && !parsedOrderBook ? '' : 'hide'}>No data available</p>
      <p className={!isConnected ? '' : 'hide'}>Connecting...</p>
      <p className={isConnected && !fetchedFirstMessage ? '' : 'hide'}>Waiting for data...</p>
    </>
  );
};
