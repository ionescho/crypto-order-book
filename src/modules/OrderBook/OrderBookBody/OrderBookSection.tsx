import type { FC } from 'react';
import { OrderRow } from './OrderRow';
import styles from '../OrderBook.module.css';
import type { Exchange } from '../types';
import { EXCHANGE_LABELS } from '../constants';

type Props = {
  animations: boolean;
  list?: { price: string; quantity: number; total: string; percentage: number }[];
  variant: 'asks' | 'bids';
  exchange?: Exchange;
};

export const OrderBookSection: FC<Props> = ({ animations, list = [], variant, exchange }) => {
  const [exchangeCrypto, exchangeCurrency] = exchange ? EXCHANGE_LABELS[exchange]?.split('/') || [] : [];

  return (
    <div className={`${styles.section} ${styles[variant]}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.price}>Price{exchangeCurrency && `(${exchangeCurrency})`}</div>
        <div className={styles.amount}>Amount{exchangeCrypto && `(${exchangeCrypto})`}</div>
        <div className={styles.total}>Total</div>
      </div>
      <div className={`${styles.sectionBody} d-flex`}>
        {list.map(({ price, quantity, total, percentage }) => (
          <OrderRow animations={animations} key={price} price={price} quantity={quantity} total={total} percentage={percentage} />
        ))}
      </div>
    </div>
  );
};
