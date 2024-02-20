import {weightRandom} from '@/shared/lib/pseudoRandom.ts';
import {
  BASE_SYSTEM_APPEAR_PROBABILITY,
  BLACK_HOLE_TYPE_FREQUENCY,
  STAR_TYPE_PROBABILITY,
  StarLuminosityClass,
  STARS_DISTRIBUTION,
  StarSpectralClass,
  StarType
} from '@/shared/constants.ts';
import seedrandom from 'seedrandom';
import {BlackHoleSystemData, StarSystemData, SystemData} from '@/shared/types.ts';

// Список слогов.
const SYLLABLES = ['ra', 'ta', 'ni', 'ha', 'ku', 'mi', 'fu', 'zi', 'la', 'te', 'si', 'va', 'pe', 'do', 'gi', 'ke', 'lu', 'po', 'ri', 'so', 'qu', 'le', 've', 'co', 'ma', 'pa', 'ne', 'di', 'tu', 'mo', 'cha', 'be', 'na', 'me', 'sa', 'ka', 'lo', 'de', 'fi', 'ze'];

/**
 * Функция для конвертации арабского числа в римское.
 */
function arabicToRoman(num: number): string {
  const romanNumerals = [
    ['L', 50], ['XL', 40], ['X', 10], ['IX', 9],
    ['V', 5], ['IV', 4], ['I', 1]];
  let roman = '';
  for (const [key, value] of romanNumerals) {
    while (num >= value) {
      roman += key;
      num -= value;
    }
  }
  return roman;
}

// Функция для случайной генерации части названия из слогов.
function generateNamePart(random: () => number) {
  const index = Math.floor(random() * SYLLABLES.length);
  return SYLLABLES[index];
}

// Функция для генерации имени звездной системы.
function generateStarSystemName(seed: string): string {
  const random = seedrandom(seed);

  // Случайно определяем количество слов: 1 или 2.
  const partsCount = Math.floor(random() * 2) + 1;

  const nameParts = [];
  for (let i = 0; i < partsCount; i++) {
    nameParts.push(generateNamePart(random));
  }

  // Добавляем римское число, отделенное дефисом.
  const romanNumber = arabicToRoman(Math.floor(random() * 49) + 1);
  return `${nameParts.join('')}-${romanNumber}`;
}

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
  if (baseRandom < (1 - BASE_SYSTEM_APPEAR_PROBABILITY)) {
    return null;
  }

  const starType = weightRandom(STAR_TYPE_PROBABILITY, seed);
  const baseProperties = {
    name: generateStarSystemName(seed)
  };

  switch (starType) {
    case StarType.STAR: return {...baseProperties, ...generateStarSystem(seed)};
    case StarType.BLACK_HOLE: return {...baseProperties, ...generateBlackHoleSystem(seed)};
    default: return null;
  }
}