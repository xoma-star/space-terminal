import css from './Star.module.css';
import classNames from '@/shared/lib/classNames';

interface Props {
  radius: number;
}

const ORBIT_SIZES = [500, 1100, 1400, 2000, 2500, 2900, 3300];

function Orbit(props: Props) {
  const {radius} = props;

  return (
    <div
      className={classNames(css.orbit, 'rounded-full absolute flex items-end justify-center')}
      style={{
        width: ORBIT_SIZES[radius],
        height: ORBIT_SIZES[radius],
        animationDuration: `${(Math.floor((Math.random() + 1) * 5)) * 5}s`
      }}
    >
      <div className="w-32 h-32 bg-amber-600 rounded-full -mb-16" />
    </div>
  );
}

export default Orbit;