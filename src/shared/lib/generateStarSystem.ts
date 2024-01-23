import {weightRandom} from '@/shared/lib/pseudoRandom.ts';
import {
  BLACK_HOLE_TYPE_FREQUENCY,
  STAR_TYPE_PROBABILITY, StarLuminosityClass,
  STARS_DISTRIBUTION,
  StarSpectralClass,
  StarType
} from '@/shared/constants.ts';
import seedrandom from 'seedrandom';
import {BlackHoleSystemData, StarSystemData, SystemData} from '@/shared/types.ts';

function generateStarSystem(seed: string): StarSystemData {
  const spectralClass = weightRandom((Object.keys(STARS_DISTRIBUTION) as StarSpectralClass[])
    .reduce((acc, key) => {
      acc[key] = STARS_DISTRIBUTION[key].frequency;
      return acc;
    }, {} as Record<StarSpectralClass, number>), seed);
  const luminosityProbability = STARS_DISTRIBUTION[spectralClass].luminosityClasses as Record<StarLuminosityClass, number>;
  const luminosityClass = weightRandom(luminosityProbability, seed);

  return {
    starType: StarType.STAR,
    luminosityClass,
    spectralClass
  };
}

function generateBlackHoleSystem(seed: string): BlackHoleSystemData {
  return {
    starType: StarType.BLACK_HOLE,
    blackHoleType: weightRandom(BLACK_HOLE_TYPE_FREQUENCY, seed)
  };
}

/**
 * Г
 * @param seed
 */
export default function generateSystem(seed: string): SystemData | null {
  const baseRandom = seedrandom(`${seed} basfrcds`)();
  if (baseRandom > 0.3) {
    return null;
  }

  const starType = weightRandom(STAR_TYPE_PROBABILITY, seed);

  switch (starType) {
    case StarType.STAR: return generateStarSystem(seed);
    case StarType.BLACK_HOLE: return generateBlackHoleSystem(seed);
    default: return null;
  }
}