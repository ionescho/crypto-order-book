import { memo, type FC } from 'react';
import styles from '../Orderbook.module.css';
import type { OrderBookConfig } from '../types';
import { DecimalsMenuPopover } from './ConfigMenus/DecimalsMenuPopover';
import { LayoutSelector } from './LayoutSelector';
import { ConfigMenuPopover } from './ConfigMenus/ConfigMenuPopover';
import { ExchangeMenuPopover } from './ConfigMenus/ExchangeMenuPopover';

type Props = {
  onConfigChange: (key: keyof OrderBookConfig, value: boolean | number | string) => void;
};

export const OrderBookHeaderAndControls: FC<Props> = memo(({ onConfigChange }) => {
  return (
    <div className={`d-flex flex-column align-items-stretch justify-space-between ${styles.orderBookHeader}`}>
      <div className='d-flex align-items-center justify-space-between'>
        <h6>Order Book</h6>
        <ExchangeMenuPopover onConfigChange={onConfigChange} />
        <ConfigMenuPopover onConfigChange={onConfigChange} />
      </div>
      <div className={`${styles.headerDivider} w-100`} />
      <div className='d-flex align-items-center justify-space-between'>
        <LayoutSelector onConfigChange={onConfigChange} />
        <DecimalsMenuPopover onConfigChange={onConfigChange} />
      </div>
    </div>
  );
});
