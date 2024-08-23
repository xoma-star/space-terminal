import {BlackHoleType, StarType, type SystemData} from '@xoma_star/shared-stellar-goose';
import BaseStar from './BaseStar';
import css from './Star.module.css';

const BLACK_HOLE_SIZE: Record<BlackHoleType, number> = {
  [BlackHoleType.SUPERMASSIVE]: 128,
  [BlackHoleType.INTERMEDIATE]: 64,
  [BlackHoleType.STELLAR]: 56,
  [BlackHoleType.MICRO]: 32
};

type BlackHoleProps = SystemData<StarType.BLACK_HOLE>;

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
    />
  );
}

export default BlackHole;