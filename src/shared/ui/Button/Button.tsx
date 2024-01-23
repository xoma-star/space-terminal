import {ButtonHTMLAttributes, ReactNode} from 'react';
import css from './Button.module.css';
import classNames from '../../lib/classNames.ts';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    before?: ReactNode;
    after?: ReactNode;
}

export default function Button(props: ButtonProps) {
  const {
    children,
    className,
    before,
    after,
    ...restProps
  } = props;

  return (
    <button
      {...restProps}
      className={classNames(className, css.button, 'flex flex-row gap-2 items-center justify-center')}
    >
      {before && <span>{before}</span>}
      <span>{children}</span>
      {after && <span>{after}</span>}
    </button>
  );
}