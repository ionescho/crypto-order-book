import type { FC } from 'react';
import { OrderRow } from './OrderRow';
import styles from '../Orderbook.module.css';

type Props = {
  list?: [string, number, string][];
  maxQuantity?: number;
  variant: 'asks' | 'bids';
};

export const OrderBookSection: FC<Props> = ({ list = [], maxQuantity, variant }) => {
  return (
    <div className={`${styles.section} ${styles[variant]}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.price}>Price</div>
        <div className={styles.amount}>Amount</div>
        <div className={styles.total}>Total</div>
      </div>
      <div className={`${styles.sectionBody} d-flex`}>
        {list.map(([price, quantity, total]) => (
          <OrderRow key={price} price={price} quantity={quantity} total={total} maxQuantity={maxQuantity} />
        ))}
      </div>
    </div>
  );
};
