import { memo, type FC } from 'react';
import { Ellipsis } from 'lucide-react';
import { MenuPopover } from '../../../toolkit/MenuPopover/MenuPopover';
import { OrderBookHeaderConfigMenu } from './OrderBookHeaderConfigMenu';
import styles from '../Orderbook.module.css';
import type { OrderBookConfig } from '../types';

type Props = {
  onConfigChange: (key: keyof OrderBookConfig, value: boolean | string) => void;
};

export const OrderBookHeaderAndControls: FC<Props> = memo(({ onConfigChange }) => {
  return (
    <div className={`d-flex align-items-center justify-space-between ${styles.orderBookHeader}`}>
      <h6>Order Book</h6>
      <MenuPopover control={({ triggerOpen }) => <Ellipsis className={styles.configMenuButton} onClick={triggerOpen} />}>
        <OrderBookHeaderConfigMenu onConfigChange={onConfigChange} />
      </MenuPopover>
    </div>
  );
});
