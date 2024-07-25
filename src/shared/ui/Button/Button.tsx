import type {ButtonHTMLAttributes, ReactNode} from 'react';
import css from './Button.module.css';
import clsx from 'clsx';

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
      className={clsx(className, css.button, 'flex flex-row gap-2xs items-center justify-center')}
    >
      {before && <span>{before}</span>}
      <span>{children}</span>
      {after && <span>{after}</span>}
    </button>
  );
}