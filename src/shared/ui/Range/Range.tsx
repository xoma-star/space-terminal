import {InputHTMLAttributes, ReactNode} from 'react';
import classNames from '@/shared/lib/classNames';
import css from './Range.module.css';

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
    <div className={classNames(className, 'flex flex-row items-center gap-2')}>
      {leftLabel && <span>{leftLabel}</span>}
      <input
        {...restProps}
        type="range"
        className={classNames('appearance-none focus:outline-none bg-transparent w-full', css.range)}
      />
      {rightLabel && <span>{rightLabel}</span>}
    </div>
  );
}

export default Range;