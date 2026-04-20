import { memo, type FC } from 'react';
import { Ellipsis } from 'lucide-react';
import { Radio } from '@toolkit/Radio/Radio';
import { Toggle } from '@toolkit/Toggle/Toggle';
import { Checkbox } from '@toolkit/Checkbox/Checkbox';
import { MenuPopover } from '@toolkit/MenuPopover/MenuPopover';
import type { OrderBookConfig } from '../../types';
import { INITIAL_CONFIG } from '../../constants';
import styles from './ConfigMenu.module.css';

type Props = {
  onConfigChange: (key: keyof OrderBookConfig, value: boolean | number | string) => void;
};

export const ConfigMenuPopover: FC<Props> = memo(({ onConfigChange }) => {
  return (
    <MenuPopover control={({ triggerOpen }) => <Ellipsis className={styles.configMenuButton} onClick={triggerOpen} />}>
      <div className={`${styles.configMenu} d-flex flex-column align-items-stretch`}>
        <div className={`${styles.menuSubtitle}`}>Order Book Display</div>
        <div className={`${styles.menuItem}`}>
          <Checkbox
            defaultChecked={INITIAL_CONFIG.displaySumAvg}
            label='Display Avg & Sum'
            onChange={checked => onConfigChange('displaySumAvg', checked as boolean)}
          />
        </div>
        <div className={`${styles.menuItem}`}>
          <Checkbox
            defaultChecked={INITIAL_CONFIG.showBuySellRatio}
            label='Show Buy/Sell Ratio'
            onChange={checked => onConfigChange('showBuySellRatio', checked as boolean)}
          />
        </div>
        <div className={`${styles.menuItem}`}>
          <Checkbox
            defaultChecked={INITIAL_CONFIG.rounding}
            label='Rounding'
            onChange={checked => onConfigChange('rounding', checked as boolean)}
          />
        </div>
        <div className={`${styles.divider}`} />
        <div className={`${styles.menuSubtitle}`}>Book Depth Visualization</div>
        <div className={`${styles.menuItem}`}>
          <Radio
            defaultChecked={INITIAL_CONFIG.depthVisualization === 'amount'}
            name='depthVisualization'
            value='amount'
            label='Amount'
            onChange={value => onConfigChange('depthVisualization', value as string)}
          />
        </div>
        <div className={`${styles.menuItem}`}>
          <Radio
            defaultChecked={INITIAL_CONFIG.depthVisualization === 'cumulative'}
            name='depthVisualization'
            value='cumulative'
            label='Cumulative'
            onChange={value => onConfigChange('depthVisualization', value as string)}
          />
        </div>
        <div className={`${styles.divider}`} />
        <div className={`${styles.menuItem}`}>
          <label className='d-flex align-items-center justify-space-between'>
            Animations
            <Toggle defaultChecked={INITIAL_CONFIG.animations} onChange={checked => onConfigChange('animations', checked as boolean)} />
          </label>
        </div>
      </div>
    </MenuPopover>
  );
});
