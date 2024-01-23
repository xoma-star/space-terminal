import {createNoise2D} from 'simplex-noise';
import {pseudoRandom, pseudoRandomFloat, pseudoRandomInt, pseudoRandomNormal} from '@/shared/lib/pseudoRandom.ts';
import {BIOME_DATA, BiomeType} from '@/shared/constants.ts';
import alea from 'alea';

function generateLayer(seed: string, width: number, height: number, depth: number): number[][] {
  const prng = alea(seed);
  const noise = createNoise2D(prng);
  const map: number[][] = [];
  for (let x = 0; x < width; x++) {
    map[x] = [];
    for (let y = 0; y < height; y++) {
      map[x][y] = Math.round((noise(x / depth, y / depth) + 1) / 2 * 5);
    }
  }

  return map;
}

export default function generateSurface(
  seed: string,
  width: number,
  height: number,
  biome: BiomeType
): number[][] {
  const biomeData = BIOME_DATA[biome];
  const firstLayer = generateLayer(seed, width, height, 100);
  const secondLayer = generateLayer(seed, width, height, 50);
  const finalLayer = generateLayer(seed, width, height, 10);

  return finalLayer.map((row, x) => row.map((cell, y) => {
    return Math.round(
      (firstLayer[x][y] + secondLayer[x][y] + cell) / 3
    );
  }));
}