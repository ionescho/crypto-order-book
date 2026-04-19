import { memo, useState, type FC } from 'react';
import { Triangle } from 'lucide-react';
import { MenuPopover } from '../../../../toolkit/MenuPopover/MenuPopover';
import styles from './ConfigMenu.module.css';
import type { OrderBookConfig } from '../../types';
import { CONFIG_DECIMALS_OPTIONS, INITIAL_CONFIG } from '../../constants';

type Props = {
  onConfigChange: (key: keyof OrderBookConfig, value: boolean | number | string) => void;
};

export const DecimalsMenuPopover: FC<Props> = memo(({ onConfigChange }) => {
  const [selectedDecimal, setSelectedDecimal] = useState<number>(INITIAL_CONFIG.decimals);
  const handleSelectDecimal = (value: number) => {
    setSelectedDecimal(value);
    onConfigChange('decimals', value);
  };

  return (
    <MenuPopover
      control={({ triggerOpen }) => (
        <div className={`${styles.configMenuButton} d-flex align-items-center`} onClick={triggerOpen}>
          <span>{selectedDecimal}</span>
          <Triangle width={6} />
        </div>
      )}
    >
      <div className={`${styles.configMenu} d-flex flex-column align-items-start`}>
        {CONFIG_DECIMALS_OPTIONS.map((decimalOption: number) => (
          <div
            key={decimalOption}
            onClick={() => handleSelectDecimal(decimalOption)}
            className={`d-flex align-items-center justify-space-between w-100 ${styles.menuItem}`}
          >
            <span>{decimalOption}</span>
            <span>{selectedDecimal === decimalOption && '✔'}</span>
          </div>
        ))}
      </div>
    </MenuPopover>
  );
});
