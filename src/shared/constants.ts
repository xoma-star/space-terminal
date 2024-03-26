import type {ApplicationData} from './types';

/** список приложений */
export enum Application {
  TERMINAL = 'terminal',
  MARKET = 'market',
  MAP = 'map',
  WELCOME = 'welcome'
}

/** информация о приложениях */
export const APPLICATION_DATA: Record<Application, ApplicationData> = {
  [Application.TERMINAL]: {
    name: 'Терминал',
    icon: '/desktop-icons/computer-4.png',
    availableOnDesktop: true
  },
  [Application.MARKET]: {
    name: 'Торговая площадка',
    icon: '/desktop-icons/shell_window4.png',
    availableOnDesktop: true
  },
  [Application.MAP]: {
    name: 'Карта',
    icon: '/desktop-icons/globe_map-0.png',
    availableOnDesktop: true
  },
  [Application.WELCOME]: {
    name: 'Добро пожаловать',
    icon: '/desktop-icons/channels-2.png'
  }
};

export const SERVER_URL = 'http://localhost:3000';