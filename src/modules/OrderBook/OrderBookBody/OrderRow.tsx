import { memo, useEffect, useRef, useState, type FC } from 'react';
import styles from './OrderbookBody.module.css';

type Props = {
  animations: boolean;
  price: string;
  quantity: string;
  total: string;
  percentage: number;
};

// let componentInstances = 0;
// let totalRenderCycles = 0;

// setInterval(() => {
//     console.log(`=================================================`);
//     console.log(`Total render cycles: ${totalRenderCycles}`);
//     console.log(`Total component instances: ${componentInstances}`);
//     console.log(`Average renders per component instance: ${(totalRenderCycles / componentInstances || 0).toFixed(2)}`);
//     console.log(`=================================================`);
// }, 1000);

export const OrderRow: FC<Props> = memo(({ animations, price, quantity, total, percentage }) => {
  // totalRenderCycles++;
  const [flash, setFlash] = useState(false);
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      //     componentInstances++;
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
    <div className={`${styles.row} ${animations && flash ? styles.flash : ''}`}>
      <div className={styles.hoverHighlight} />
      <div
        className={styles.depthBar}
        style={{
          width: `${percentage}%`,
        }}
      />
      <div className={`w-100 d-flex justify-space-between ${styles.contentContainer}`}>
        <div className={styles.price}>{price}</div>
        <div className={styles.amount}>{quantity}</div>
        <div className={styles.total}>{total}</div>
      </div>
    </div>
  );
});
