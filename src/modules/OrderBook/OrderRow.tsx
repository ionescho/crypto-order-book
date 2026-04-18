import { memo, useEffect, useEffectEvent, useMemo, useRef, useState, type FC } from 'react';

type Props = {
  price: string;
  quantity: number;
  total: string;
  variant: 'asks' | 'bids';
};

// let livingInstances = 0;
// let componentInstances = 0;
// let totalRenderCycles = 0;

// setInterval(() => {
//     console.log(`=================================================`);
//     console.log(`Total render cycles: ${totalRenderCycles}`);
//     console.log(`Living component instances: ${livingInstances}`);
//     console.log(`Total component instances: ${componentInstances}`);
//     console.log(`Average renders per component instance: ${(totalRenderCycles / componentInstances || 0).toFixed(2)}`);
//     console.log(`=================================================`);
// }, 1000);

export const OrderRow: FC<Props> = memo(({ price, quantity, total, variant }) => {
  // useEffect(() => {
  //     componentInstances++;
  //     livingInstances++;

  //     return () => {
  //         livingInstances--;
  //     };
  // },[])
  // totalRenderCycles++;
  const [flash, setFlash] = useState(false);
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFlash(true);

    const timeoutId = setTimeout(() => {
      setFlash(false);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [quantity]);

  return (
    <div
      style={{
        fontSize: '12px',
        fontFamily: 'monospace',
        display: 'flex',
        justifyContent: 'space-between',
        lineHeight: '20px',
        backgroundColor: flash ? `rgba(${variant === 'asks' ? '255' : '0'}, ${variant === 'bids' ? '255' : '0'}, 0, 0.3)` : 'transparent',
        transition: 'background-color 0.2s ease',
      }}
    >
      <div style={{ color: variant === 'asks' ? 'var(--text-sell)' : 'var(--text-buy)', flex: '1 1 0%', textAlign: 'left' }}>{price}</div>
      <div style={{ color: 'white', flex: '1 1', textAlign: 'right' }}>{quantity}</div>
      <div style={{ color: 'white', flex: '1 1', textAlign: 'right' }}>{total}</div>
    </div>
  );
});
