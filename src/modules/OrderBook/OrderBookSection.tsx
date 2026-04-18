import type { FC } from 'react';
import { OrderRow } from './OrderRow';

type Props = {
  list?: [string, number, string][];
  variant: 'asks' | 'bids';
};

export const OrderBookSection: FC<Props> = ({ list = [], variant }) => {
  return (
    <div style={{ display: 'flex', flexDirection: variant === 'asks' ? 'column-reverse' : 'column', flexGrow: 1 }}>
      {list.map(([price, qty, total]) => (
        <OrderRow key={price} price={price} quantity={qty} total={total} variant={variant} />
      ))}
    </div>
  );
};
