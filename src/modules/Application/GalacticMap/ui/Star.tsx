import css from './Star.module.css';
import {STAR_COLOR_BY_SPECTRAL_CLASS, StarLuminosityClass, StarSpectralClass} from '@xoma_star/shared-stellar-goose';
import BaseStar, {type BaseStarProps} from './BaseStar';
import {useEffect} from 'react';

export interface BaseProps extends BaseStarProps{
  onClick(): void;
}

interface StarProps extends BaseProps {
  spectralClass: StarSpectralClass;
  luminosityClass: StarLuminosityClass;
}

const STAR_SIZE_BY_LUMINOSITY_CLASS: Record<StarLuminosityClass, number> = {
  [StarLuminosityClass.I]: 64,
  [StarLuminosityClass.II]: 56,
  [StarLuminosityClass.III]: 48,
  [StarLuminosityClass.IV]: 32,
  [StarLuminosityClass.V]: 20,
  [StarLuminosityClass.VI]: 16,
  [StarLuminosityClass.VII]: 8

};

function Star(props: StarProps) {
  const {
    spectralClass,
    luminosityClass,
    ...restProps
  } = props;

  useEffect(() => {
    setInterval(() => console.log(3), 1000)
  }, [])

  return (
    <BaseStar
      {...restProps}
      className={css.star}
      size={STAR_SIZE_BY_LUMINOSITY_CLASS[luminosityClass]}
      color={STAR_COLOR_BY_SPECTRAL_CLASS[spectralClass].hex}
    />
  );
}

export default Star;