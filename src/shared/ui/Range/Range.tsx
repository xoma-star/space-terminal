import {InputHTMLAttributes, ReactNode} from 'react';
import css from './Range.module.css';
import clsx from 'clsx';

interface RangeProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: 'range';
  leftLabel?: ReactNode;
  rightLabel?: ReactNode;
}

function Range(props: RangeProps) {
  const {
    className,
    rightLabel,
    leftLabel,
    ...restProps
  } = props;

  return (
    <div className={clsx(className, 'flex flex-row items-center gap-2xs')}>
      {leftLabel && <span>{leftLabel}</span>}
      <input
        {...restProps}
        type="range"
        className={clsx('appearance-none focus:outline-none bg-transparent w-full', css.range)}
      />
      {rightLabel && <span>{rightLabel}</span>}
    </div>
  );
}

export default Range;