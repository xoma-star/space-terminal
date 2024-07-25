import type {HTMLAttributes} from 'react';
import css from './Title.module.css';
import clsx from 'clsx';

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: string;
  level?: 1 | 2 | 3;
}

function Title(props: TitleProps) {
  const {
    children,
    level = 2,
    ...restProps
  } = props;

  let className;
  switch (level) {
    case 1:
      className = css.small;
      break;
    case 2:
      className = css.medium;
      break;
    case 3:
      className = css.large;
  }

  return (
    <h2 {...restProps} className={clsx(className, props.className)}>
      {children}
    </h2>
  );
}

export default Title;