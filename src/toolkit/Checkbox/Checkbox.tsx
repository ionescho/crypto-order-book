import React from 'react';
import styles from './Checkbox.module.css';

type CheckboxProps = {
  label: string;
  onChange: (value: boolean) => void;
} & React.HTMLProps<HTMLInputElement>;

export const Checkbox: React.FC<CheckboxProps> = ({ label, onChange, ...rest }) => {
  return (
    <label className={styles.checkbox}>
      <input {...rest} type='checkbox' onChange={e => onChange(e.target.checked)} />
      <span className={styles.box} />
      {label}
    </label>
  );
};
