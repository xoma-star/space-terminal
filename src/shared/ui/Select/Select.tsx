import {HTMLAttributes} from 'react';
import classNames from '@/shared/lib/classNames';
import css from './Select.module.css';

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
      className={classNames(className, css.select, 'appearance-none relative outline-none box-border')}
    >
      {children}
    </select>
  );
}

export default Select;