import {InputHTMLAttributes} from 'react';
import css from './Input.module.css';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'password' | 'number';
}

function Input(props: InputProps) {
  const {
    ...restProps
  } = props;

  return (
    <input
      {...restProps}
      className={clsx(css.input, 'appearance-none border-none focus:outline-none')}
    />
  );
}

export default Input;