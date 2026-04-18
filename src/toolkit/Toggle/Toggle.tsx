import React from 'react';
import styles from './Toggle.module.css';

type ToggleProps = {
  onChange: (value: boolean) => void;
} & React.HTMLProps<HTMLInputElement>;

export const Toggle: React.FC<ToggleProps> = ({ onChange, ...rest }) => {
  return (
    <label className={styles.toggle}>
      <input {...rest} type='checkbox' onChange={e => onChange(e.target.checked)} />
      <span className={styles.slider} />
    </label>
  );
};
