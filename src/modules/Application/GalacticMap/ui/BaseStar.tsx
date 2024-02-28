import {CSSProperties} from 'react';
import classNames from '@/shared/lib/classNames';

interface Props {
  className: string;
  color?: string;
  size: number;
  style?: CSSProperties;

  onClick(): void;
}

function BaseStar(props: Props) {
  const {
    className,
    color,
    size,
    style = {},
    onClick
  } = props;

  return (
    <button
      onClick={onClick}
      type="button"
      className={classNames(className, 'rounded-full m-auto')}
      style={{
        ...style,
        transform: `translate(${(Math.random() - 0.5) * 50}px, ${(Math.random() - 0.5) * 50}px)`,
        '--star-color': color,
        width: size,
        height: size
      } as CSSProperties}
    />
  );
}

export default BaseStar;