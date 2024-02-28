import {
  BiomeType,
  BlackHoleType,
  StarLuminosityClass,
  StarSpectralClass,
  StarType,
  SurfaceType
} from '@/shared/constants';

export interface ApplicationData {
  name: string;
  icon: string;
  availableOnDesktop?: boolean;
}

export type BiomeData = Record<BiomeType, {
  temperature: {
    min: number,
    max: number,
    average: number
  },
  humidity: {
    min: number,
    max: number,
    average: number
  },
  height: {
    min: number,
    max: number,
    average: number
  },
  surfaceFrequency: Partial<Record<SurfaceType, number>>
}>;

export interface BaseSystemData {
  name: string;
}

export interface StarSystemData {
  starType: StarType.STAR;
  luminosityClass: StarLuminosityClass;
  spectralClass: StarSpectralClass;
}

export interface BlackHoleSystemData {
  starType: StarType.BLACK_HOLE;
  blackHoleType: BlackHoleType;
}

export interface NeutronStarSystemData {
  starType: StarType.NEUTRON_STAR;
}

export type SystemData = (StarSystemData | BlackHoleSystemData | NeutronStarSystemData)
  & BaseSystemData;

export type Chunk = `${string}:${string}`;