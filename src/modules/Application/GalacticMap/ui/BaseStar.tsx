import {CSSProperties, HTMLAttributes} from 'react';
import classNames from '@/shared/lib/classNames';

interface BaseStarProps extends HTMLAttributes<HTMLButtonElement>{
  color?: string;
  size: number;
}

/**
 * базовый компонент главного тела звездной системы
 * ничего не знает о своем типе, но принимает стили для отображения
 */
function BaseStar(props: BaseStarProps) {
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
        '--star-color': color,
        width: size,
        height: size
      } as CSSProperties}
    />
  );
}

export default BaseStar;