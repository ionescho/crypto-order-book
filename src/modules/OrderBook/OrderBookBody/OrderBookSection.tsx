import type { FC } from 'react';
import { OrderRow } from './OrderRow';
import styles from './OrderbookBody.module.css';
import type { Exchange, ParsedGroupedOrder } from '../types';
import { EXCHANGE_LABELS } from '../constants';

type Props = {
  animations: boolean;
  displaySumAvg: boolean;
  list?: ParsedGroupedOrder[];
  variant: 'asks' | 'bids';
  exchange?: Exchange;
};

export const OrderBookSection: FC<Props> = ({ animations, displaySumAvg, list = [], variant, exchange }) => {
  const [exchangeCrypto, exchangeCurrency] = exchange ? EXCHANGE_LABELS[exchange]?.split('/') || [] : [];

  return (
    <div className={`${styles.section} ${styles[variant]}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.price}>Price{exchangeCurrency && `(${exchangeCurrency})`}</div>
        <div className={styles.amount}>Amount{exchangeCrypto && `(${exchangeCrypto})`}</div>
        <div className={styles.total}>Total</div>
      </div>
      <div className={`${styles.sectionBody} d-flex`}>
        {list.map(({ price, quantity, total, sumCurrency, sumCrypto, percentage }) => (
          <OrderRow
            animations={animations}
            displaySumAvg={displaySumAvg}
            key={price}
            price={price}
            quantity={quantity}
            total={total}
            sumCurrency={sumCurrency}
            sumCrypto={sumCrypto}
            percentage={percentage}
          />
        ))}
      </div>
    </div>
  );
};
