import {BlackHoleType} from '@/shared/constants';
import {BaseProps} from './Star';
import BaseStar from './BaseStar';
import css from './Star.module.css';

const BLACK_HOLE_SIZE: Record<BlackHoleType, number> = {
  [BlackHoleType.SUPERMASSIVE]: 128,
  [BlackHoleType.INTERMEDIATE]: 64,
  [BlackHoleType.STELLAR]: 56,
  [BlackHoleType.MICRO]: 32
};

interface BlackHoleProps extends BaseProps {
  blackHoleType: BlackHoleType;
}

function BlackHole(props: BlackHoleProps) {
  const {
    blackHoleType,
    ...restProps
  } = props;

  return (
    <BaseStar
      {...restProps}
      className={css.blackHole}
      size={BLACK_HOLE_SIZE[blackHoleType]}
      style={{animationDuration: `${Math.random() * 10 + 5}s`}}
    />
  );
}

export default BlackHole;