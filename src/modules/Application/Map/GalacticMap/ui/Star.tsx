import {CSSProperties} from 'react';
import css from './Star.module.css';
import classNames from '@/shared/lib/classNames.ts';
import {
  BlackHoleType,
  STAR_COLOR_BY_SPECTRAL_CLASS,
  StarLuminosityClass,
  StarSpectralClass,
  StarType
} from '@/shared/constants.ts';

interface BaseProps {
  type: StarType;
}

interface StarProps extends BaseProps {
  type: StarType.STAR;
  spectralClass: StarSpectralClass;
  luminosityClass: StarLuminosityClass;
}

interface BlackHoleProps extends BaseProps {
  type: StarType.BLACK_HOLE;
  blackHoleType: BlackHoleType;
}

type CombinedProps = StarProps | BlackHoleProps;

const STAR_SIZE_BY_LUMINOSITY_CLASS: Record<StarLuminosityClass | BlackHoleType, number> = {
  [StarLuminosityClass.I]: 64,
  [StarLuminosityClass.II]: 56,
  [StarLuminosityClass.III]: 48,
  [StarLuminosityClass.IV]: 32,
  [StarLuminosityClass.V]: 20,
  [StarLuminosityClass.VI]: 16,
  [StarLuminosityClass.VII]: 8,
  [BlackHoleType.SUPERMASSIVE]: 128,
  [BlackHoleType.INTERMEDIATE]: 64,
  [BlackHoleType.STELLAR]: 56,
  [BlackHoleType.MICRO]: 32
};

function Star(props: CombinedProps) {
  const {
    type
  } = props;

  let style: CSSProperties = {transform: `translate(${(Math.random() - 0.5) * 50}px, ${(Math.random() - 0.5) * 50}px)`};
  let primaryClassName;
  if (type === StarType.BLACK_HOLE) {
    const {blackHoleType} = props;
    style = {
      ...style,
      width: STAR_SIZE_BY_LUMINOSITY_CLASS[blackHoleType],
      height: STAR_SIZE_BY_LUMINOSITY_CLASS[blackHoleType],
      animationDuration: `${Math.random() * 10 + 5}s`
    };
    primaryClassName = css.blackHole;
  } else if (type === StarType.STAR) {
    const {spectralClass, luminosityClass} = props;
    style = {
      ...style,
      '--star-color': STAR_COLOR_BY_SPECTRAL_CLASS[spectralClass].hex,
      width: STAR_SIZE_BY_LUMINOSITY_CLASS[luminosityClass],
      height: STAR_SIZE_BY_LUMINOSITY_CLASS[luminosityClass]
    };
    primaryClassName = css.star;
  }

  return (
    <div
      className={classNames(primaryClassName, 'rounded-full m-auto')}
      style={style as CSSProperties}
    />
  );
}

export default Star;