import { useState, type FC } from 'react';
import type { OrderBookConfig, OrderBookLayout } from '../types';
import { BetweenHorizonalStart, RectangleVertical } from 'lucide-react';
import styles from './LayoutSelector.module.css';
import { INITIAL_CONFIG } from '../constants';

type Props = {
  onConfigChange: (key: keyof OrderBookConfig, value: boolean | number | string) => void;
};

export const LayoutSelector: FC<Props> = ({ onConfigChange }) => {
  const [selectedLayout, setSelectedLayout] = useState<OrderBookLayout>(INITIAL_CONFIG.layout);
  const handleSelectLayout = (value: OrderBookLayout) => {
    setSelectedLayout(value);
    onConfigChange('layout', value);
  };

  return (
    <div className='d-flex align-items-center'>
      <span title='Order Book'>
        <BetweenHorizonalStart
          className={`${styles.both} ${styles.icon} ${selectedLayout === 'both' ? styles.selected : ''}`}
          onClick={() => handleSelectLayout('both')}
        />
      </span>
      <span title='Buy Order'>
        <RectangleVertical
          className={`${styles.bids} ${styles.icon} ${selectedLayout === 'bids' ? styles.selected : ''}`}
          onClick={() => handleSelectLayout('bids')}
        />
      </span>
      <span title='Sell Order'>
        <RectangleVertical
          className={`${styles.asks} ${styles.icon} ${selectedLayout === 'asks' ? styles.selected : ''}`}
          onClick={() => handleSelectLayout('asks')}
        />
      </span>
    </div>
  );
};
