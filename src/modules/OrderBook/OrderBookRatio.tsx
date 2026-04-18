import type { FC } from 'react';

type Props = {
  bidsTotal?: number;
  asksTotal?: number;
};

export const OrderBookRatio: FC<Props> = ({ bidsTotal = 0, asksTotal = 0 }) => {
  const percentBids = (bidsTotal / (bidsTotal + asksTotal)) * 100 || 0;
  const percentAsks = 100 - percentBids;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 12 }}>
      <b>B</b>
      <span style={{ color: 'var(--text-buy)' }}>{percentBids.toFixed(2)}%</span>
      <div style={{ flexGrow: 1, height: 4, backgroundColor: 'var(--text-sell)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ width: `${percentBids}%`, height: '100%', backgroundColor: 'var(--text-buy)' }}></div>
      </div>
      <span style={{ color: 'var(--text-sell)' }}>{percentAsks.toFixed(2)}%</span>
      <b>S</b>
    </div>
  );
};
