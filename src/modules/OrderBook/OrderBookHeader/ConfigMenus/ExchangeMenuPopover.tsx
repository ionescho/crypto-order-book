import { useState, type FC } from 'react';
import { Triangle } from 'lucide-react';
import { MenuPopover } from '../../../../toolkit/MenuPopover/MenuPopover';
import styles from './ConfigMenu.module.css';
import type { Exchange, OrderBookConfig } from '../../types';
import { CONFIG_EXCHANGE_OPTIONS, EXCHANGE_LABELS, INITIAL_CONFIG } from '../../constants';

type Props = {
  onConfigChange: (key: keyof OrderBookConfig, value: boolean | number | string) => void;
};

export const ExchangeMenuPopover: FC<Props> = ({ onConfigChange }) => {
  const [selectedExchange, setSelectedExchange] = useState<Exchange>(INITIAL_CONFIG.exchange);
  const handleSelectExchange = (value: Exchange) => {
    setSelectedExchange(value);
    onConfigChange('exchange', value);
  };

  return (
    <MenuPopover
      control={({ triggerOpen }) => (
        <div className={`${styles.configMenuButton} d-flex align-items-center`} onClick={triggerOpen}>
          <span>{EXCHANGE_LABELS[selectedExchange] || selectedExchange}</span>
          <Triangle width={6} className={styles.ExchangesMenuButton} />
        </div>
      )}
    >
      <div className={`${styles.configMenu} d-flex flex-column align-items-start`}>
        {CONFIG_EXCHANGE_OPTIONS.map((exchange: Exchange) => (
          <div
            key={exchange}
            onClick={() => handleSelectExchange(exchange)}
            className={`d-flex align-items-center justify-space-between w-100 ${styles.menuItem}`}
          >
            <span>{EXCHANGE_LABELS[exchange] || exchange}</span>
            &nbsp; &nbsp; &nbsp;
            <span>{selectedExchange === exchange && '✔'}</span>
          </div>
        ))}
      </div>
    </MenuPopover>
  );
};
