import { type FC } from 'react';
import styles from './OrderBook.module.css';
import { Bug, Loader } from 'lucide-react';

type Props = {
  show: boolean;
  isConnected: boolean;
  fetchedFirstMessage: boolean;
  hasOrderBook: boolean;
  hasError: boolean;
};

export const OrderBookLoader: FC<Props> = ({ show, isConnected, fetchedFirstMessage, hasOrderBook, hasError }) => {
  return (
    <div className={`d-flex align-items-center justify-center ${styles.waitingOverlay} ${show ? styles.show : ''}`}>
      {isConnected && fetchedFirstMessage && !hasOrderBook && <div>No data available</div>}
      {!isConnected && !hasError && (
        <div className='d-flex align-items-center'>
          <Loader className={styles.loader} />
          &nbsp;&nbsp;&nbsp; Connecting...
        </div>
      )}
      {isConnected && !hasError && !fetchedFirstMessage && (
        <div className='d-flex align-items-center'>
          <Loader className={styles.loader} />
          &nbsp;&nbsp;&nbsp; Waiting for data...
        </div>
      )}
      {hasError && (
        <div className='d-flex align-items-center'>
          <Bug stroke='var(--text-sell)' />
          &nbsp; &nbsp; &nbsp; Stream Error
        </div>
      )}
    </div>
  );
};
