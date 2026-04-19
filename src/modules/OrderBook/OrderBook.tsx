import { useCallback, useState, type FC } from 'react';
import { useWebsocket } from '../../websocket/WebSocketContext';
import { OrderBookHeaderAndControls } from './OrderBookHeader/OrderBookHeaderAndControls';
import { OrderBookSection } from './OrderBookBody/OrderBookSection';
import { OrderBookRatio } from './OrderBookBody/OrderBookRatio';
import styles from './OrderBook.module.css';
import { INITIAL_CONFIG } from './constants';
import { ROUTES } from '../../websocket/constants';
import type { OrderBookConfig, OrderBookResponse } from './types';
import { useOrderBookParser } from './useOrderBookParser';

export const OrderBook: FC = () => {
  const [config, setConfig] = useState<OrderBookConfig>(INITIAL_CONFIG);
  const handleConfigChange = useCallback((key: string, value: boolean | number | string) => {
    setConfig(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);
  const { animations, showBuySellRatio, layout, exchange, ...dataConfig } = config;

  const {
    isConnected,
    fetchedFirstMessage,
    message: orderBook,
  } = useWebsocket(`${ROUTES.partialBookDepthStreamBaseUrl}${exchange}@depth20@1000ms`);

  const showAsks = layout === 'both' || layout === 'asks';
  const showBids = layout === 'both' || layout === 'bids';

  const parsedOrderBook = useOrderBookParser(orderBook as OrderBookResponse, dataConfig);

  return (
    <>
      <div className={`${styles.orderBook} ${isConnected && fetchedFirstMessage && parsedOrderBook ? '' : 'hide'}`}>
        <OrderBookHeaderAndControls onConfigChange={handleConfigChange} />
        <div className={`${styles.orderBookBody} d-flex flex-column align-items-stretch`}>
          {showAsks && <OrderBookSection exchange={exchange} list={parsedOrderBook?.asks} animations={animations} variant='asks' />}
          {showBids && <OrderBookSection list={parsedOrderBook?.bids} animations={animations} variant='bids' />}
          <div style={{ visibility: showBuySellRatio ? 'visible' : 'hidden' }}>
            <OrderBookRatio asksTotal={parsedOrderBook?.asksTotal} bidsTotal={parsedOrderBook?.bidsTotal} />
          </div>
        </div>
      </div>
      <p className={isConnected && fetchedFirstMessage && !parsedOrderBook ? '' : 'hide'}>No data available</p>
      <p className={!isConnected ? '' : 'hide'}>Connecting...</p>
      <p className={isConnected && !fetchedFirstMessage ? '' : 'hide'}>Waiting for data...</p>
    </>
  );
};
