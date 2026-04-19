import { useCallback, useState, type FC } from 'react';
import { useWebsocket } from '../../websocket/WebSocketContext';
import { OrderBookHeaderAndControls } from './OrderBookHeader/OrderBookHeaderAndControls';
import { OrderBookSection } from './OrderBookBody/OrderBookSection';
import { OrderBookRatio } from './OrderBookBody/OrderBookRatio';
import styles from './OrderBook.module.css';
import { DUMMY_ORDER_BOOK_DATA, INITIAL_CONFIG } from './constants';
import { ROUTES } from '../../websocket/constants';
import type { OrderBookConfig, OrderBookResponse } from './types';
import { useOrderBookParser } from './useOrderBookParser';
import { Loader } from 'lucide-react';

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

  let parsedOrderBook = useOrderBookParser(orderBook as OrderBookResponse, dataConfig);

  // console.log(parsedOrderBook);
  const isWaiting = !isConnected || !fetchedFirstMessage || !parsedOrderBook;
  if (isWaiting) {
    parsedOrderBook = DUMMY_ORDER_BOOK_DATA;
  }

  const showAsks = layout === 'both' || layout === 'asks';
  const showBids = layout === 'both' || layout === 'bids';

  return (
    <>
      <div className={`${styles.orderBook}`}>
        <OrderBookHeaderAndControls onConfigChange={handleConfigChange} />
        <div className={`${styles.orderBookBody} d-flex flex-column align-items-stretch`}>
          {showAsks && <OrderBookSection exchange={exchange} list={parsedOrderBook?.asks} animations={animations} variant='asks' />}
          {showBids && <OrderBookSection list={parsedOrderBook?.bids} animations={animations} variant='bids' />}
          <div style={{ visibility: showBuySellRatio ? 'visible' : 'hidden' }}>
            <OrderBookRatio asksTotal={parsedOrderBook?.asksTotal} bidsTotal={parsedOrderBook?.bidsTotal} />
          </div>
        </div>
        <div className={`d-flex align-items-center justify-center ${styles.waitingOverlay} ${isWaiting ? styles.show : ''}`}>
          {isConnected && fetchedFirstMessage && !parsedOrderBook && <div>No data available</div>}
          {!isConnected && (
            <div className='d-flex align-items-center'>
              <Loader />
              &nbsp;&nbsp;&nbsp; Connecting...
            </div>
          )}
          {isConnected && !fetchedFirstMessage && (
            <div className='d-flex align-items-center'>
              <Loader />
              &nbsp;&nbsp;&nbsp; Waiting for data...
            </div>
          )}
        </div>
      </div>
    </>
  );
};
