import type {HTMLAttributes} from 'react';
import css from './Subtitle.module.css';
import clsx from 'clsx';

interface SubtitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: string;
}

export default function Subtitle(props: SubtitleProps) {
  const {
    children,
    className,
    ...restProps
  } = props;

  return (
    <h4 {...restProps} className={clsx(css.subtitle, className)}>
      {children}
    </h4>
  );
}