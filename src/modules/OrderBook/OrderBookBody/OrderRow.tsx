import { memo, useEffect, useRef, useState, type FC } from 'react';
import styles from '../Orderbook.module.css';

type Props = {
  price: string;
  quantity: number;
  total: string;
  percentage: number;
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

export const OrderRow: FC<Props> = memo(({ price, quantity, total, percentage }) => {
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
    <div className={`${styles.row} ${flash ? styles.flash : ''}`}>
      <div className={styles.price}>{price}</div>
      <div className={styles.amount}>{quantity}</div>
      <div className={styles.total}>{total}</div>
      <div
        className={styles.depthBar}
        style={{
          width: `${percentage}%`,
        }}
      ></div>
    </div>
  );
});
