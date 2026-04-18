import { type FC } from 'react';
import { Checkbox } from '../../../toolkit/Checkbox/Checkbox';
import { Toggle } from '../../../toolkit/Toggle/Toggle';
import { Radio } from '../../../toolkit/Radio/Radio';
import styles from '../Orderbook.module.css';
import type { OrderBookConfig } from '../types';
import { INITIAL_CONFIG } from '../constants';

type Props = {
  onConfigChange: (key: keyof OrderBookConfig, value: boolean | string) => void;
};

export const OrderBookHeaderConfigMenu: FC<Props> = ({ onConfigChange }) => {
  return (
    <div className={`${styles.configMenu} d-flex flex-column align-items-start`}>
      <div className={`w-100 ${styles.menuSubtitle}`}>Order Book Display</div>
      <div className={`w-100 ${styles.menuItem}`}>
        <Checkbox
          defaultChecked={INITIAL_CONFIG.displaySumAvg}
          label='Display Avg & Sum'
          onChange={checked => onConfigChange('displaySumAvg', checked as boolean)}
        />
      </div>
      <div className={`w-100 ${styles.menuItem}`}>
        <Checkbox
          defaultChecked={INITIAL_CONFIG.showBuySellRatio}
          label='Show Buy/Sell Ratio'
          onChange={checked => onConfigChange('showBuySellRatio', checked as boolean)}
        />
      </div>
      <div className={`w-100 ${styles.menuItem}`}>
        <Checkbox
          defaultChecked={INITIAL_CONFIG.rounding}
          label='Rounding'
          onChange={checked => onConfigChange('rounding', checked as boolean)}
        />
      </div>
      <div className={`${styles.divider}`} />
      <div className={`w-100 ${styles.menuSubtitle}`}>Book Depth Visualization</div>
      <div className={`w-100 ${styles.menuItem}`}>
        <Radio
          defaultChecked={INITIAL_CONFIG.depthVisualization === 'amount'}
          name='depthVisualization'
          value='amount'
          label='Amount'
          onChange={value => onConfigChange('depthVisualization', value as string)}
        />
      </div>
      <div className={`w-100 ${styles.menuItem}`}>
        <Radio
          defaultChecked={INITIAL_CONFIG.depthVisualization === 'cumulative'}
          name='depthVisualization'
          value='cumulative'
          label='Cumulative'
          onChange={value => onConfigChange('depthVisualization', value as string)}
        />
      </div>
      <div className={`${styles.divider}`} />
      <div className={`w-100 ${styles.menuItem}`}>
        <label className='d-flex align-items-center justify-space-between'>
          Animations
          <Toggle defaultChecked={INITIAL_CONFIG.animations} onChange={checked => onConfigChange('animations', checked as boolean)} />
        </label>
      </div>
    </div>
  );
};
