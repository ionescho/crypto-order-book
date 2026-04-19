import type { FC } from 'react';
import styles from './OrderbookBody.module.css';

type Props = {
  bidsTotal?: number;
  asksTotal?: number;
};

export const OrderBookRatio: FC<Props> = ({ bidsTotal = 0, asksTotal = 0 }) => {
  const percentBids = (bidsTotal / (bidsTotal + asksTotal)) * 100 || 0;
  const percentAsks = 100 - percentBids;

  return (
    <div className={`d-flex align-items-center ${styles.orderBookRatios}`}>
      <b>B</b>
      <span className={styles.buyLabel}>{percentBids.toFixed(2)}%</span>
      <div className={styles.ratioBar}>
        <div className={styles.buysSegment} style={{ width: `${percentBids}%` }} />
      </div>
      <span className={styles.sellLabel}>{percentAsks.toFixed(2)}%</span>
      <b>S</b>
    </div>
  );
};
