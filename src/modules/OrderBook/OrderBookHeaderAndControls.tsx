import type { FC } from 'react';
import { Checkbox } from '../../toolkit/Checkbox/Checkbox';
import { Toggle } from '../../toolkit/Toggle/Toggle';
import { Radio } from '../../toolkit/Radio/Radio';

type Props = {};

export const OrderBookHeaderAndControls: FC<Props> = () => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h6 style={{ margin: 0 }}>Order Book</h6>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Checkbox label='Show Depth' onChange={checked => console.log(checked)} />
        <label>
          <Toggle onChange={checked => console.log(checked)} />
          Animations
        </label>
        <Radio defaultChecked name='depthVisualization' value='amount' label='Amount' onChange={value => console.log(value)} />
        <Radio name='depthVisualization' value='cumulative' label='Cumulative' onChange={value => console.log(value)} />
      </div>
      <div
        style={{
          fontSize: '12px',
          fontFamily: 'monospace',
          display: 'flex',
          justifyContent: 'space-between',
          lineHeight: '20px',
          color: 'var(--text-secondary)',
        }}
      >
        <div style={{ flex: '1 1 0%', textAlign: 'left' }}>Price</div>
        <div style={{ flex: '1 1', textAlign: 'right' }}>Amount</div>
        <div style={{ flex: '1 1', textAlign: 'right' }}>Total</div>
      </div>
    </>
  );
};
