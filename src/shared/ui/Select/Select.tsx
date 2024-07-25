import {HTMLAttributes} from 'react';
import css from './Select.module.css';
import clsx from 'clsx';

interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
}

function Select(props: SelectProps) {
  const {
    children,
    className,
    ...restProps
  } = props;

  return (
    <select
      {...restProps}
      className={clsx(className, css.select, 'appearance-none relative outline-none box-border')}
    >
      {children}
    </select>
  );
}

export default Select;