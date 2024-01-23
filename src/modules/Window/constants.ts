import {ReactNode} from 'react';
import {Application} from '@/shared/constants.ts';
import Welcome from '../Application/Welcome.tsx';
import Map from '../Application/Map.tsx';

export const APPLICATION_CONTENT: Record<Application, () => ReactNode> = {
  [Application.WELCOME]: Welcome,
  [Application.MAP]: Map,
  [Application.TERMINAL]: () => null,
  [Application.MARKET]: () => null
};