import { type FC } from 'react';
import { Checkbox } from '../../../toolkit/Checkbox/Checkbox';
import { Toggle } from '../../../toolkit/Toggle/Toggle';
import { Radio } from '../../../toolkit/Radio/Radio';
import styles from '../Orderbook.module.css';

type Props = {};

export const OrderBookHeaderConfigMenu: FC<Props> = () => {
  return (
    <div className={`${styles.configMenu} d-flex flex-column align-items-start`}>
      <div className={`w-100 ${styles.menuSubtitle}`}>Order Book Display</div>
      <div className={`w-100 ${styles.menuItem}`}>
        <Checkbox label='Display Avg & Sum' onChange={checked => console.log(checked)} />
      </div>
      <div className={`w-100 ${styles.menuItem}`}>
        <Checkbox label='Show Buy/Sell Ratio' onChange={checked => console.log(checked)} />
      </div>
      <div className={`w-100 ${styles.menuItem}`}>
        <Checkbox label='Rounding' onChange={checked => console.log(checked)} />
      </div>
      <div className={`${styles.divider}`} />
      <div className={`w-100 ${styles.menuSubtitle}`}>Book Depth Visualization</div>
      <div className={`w-100 ${styles.menuItem}`}>
        <Radio defaultChecked name='depthVisualization' value='amount' label='Amount' onChange={value => console.log(value)} />
      </div>
      <div className={`w-100 ${styles.menuItem}`}>
        <Radio name='depthVisualization' value='cumulative' label='Cumulative' onChange={value => console.log(value)} />
      </div>
      <div className={`${styles.divider}`} />
      <div className={`w-100 ${styles.menuItem}`}>
        <label className='d-flex align-items-center justify-space-between'>
          Animations
          <Toggle onChange={checked => console.log(checked)} />
        </label>
      </div>
    </div>
  );
};
