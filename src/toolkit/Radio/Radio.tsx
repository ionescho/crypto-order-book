import React from 'react';
import styles from './Radio.module.css';

type RadioProps = {
  onChange: (value: string) => void;
} & React.HTMLProps<HTMLInputElement>;

export const Radio: React.FC<RadioProps> = ({ label, onChange, ...rest }) => {
  return (
    <label className={styles.radio}>
      <input {...rest} type='radio' onChange={e => onChange(e.target.value)} />
      <span className={styles.dot} />
      {label}
    </label>
  );
};
