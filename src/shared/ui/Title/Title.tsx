import {HTMLAttributes} from 'react';
import css from './Title.module.css';
import classNames from '@/shared/lib/classNames.ts';

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
    <h2 {...restProps} className={classNames(className, props.className)}>
      {children}
    </h2>
  );
}

export default Title;