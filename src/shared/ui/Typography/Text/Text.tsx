import type {HTMLAttributes} from 'react';
import css from './Text.module.css';
import clsx from 'clsx';

interface SubtitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: string;
}

export default function Text(props: SubtitleProps) {
  const {
    children,
    className,
    ...restProps
  } = props;

  return (
    <h4 {...restProps} className={clsx(css.text, className)}>
      {children}
    </h4>
  );
}