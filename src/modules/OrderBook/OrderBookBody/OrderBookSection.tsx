import type { FC } from 'react';
import { OrderRow } from './OrderRow';
import styles from '../Orderbook.module.css';

type Props = {
  animations: boolean;
  list?: { price: string; quantity: number; total: string; percentage: number }[];
  variant: 'asks' | 'bids';
};

export const OrderBookSection: FC<Props> = ({ animations, list = [], variant }) => {
  return (
    <div className={`${styles.section} ${styles[variant]}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.price}>Price</div>
        <div className={styles.amount}>Amount</div>
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
