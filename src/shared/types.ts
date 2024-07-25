import {ReactNode} from 'react';

/**
 * свойства открытия окна
 */
export interface PopupData {
  content: ReactNode;
  icon?: string;
  name?: string;
  /** нужно ли растягивать окно под видимую область */
  shouldStretch?: boolean | {x?: boolean, y?: boolean};
}