import {create} from 'zustand';
import {Application} from '@/shared/constants';
import type {PopupData} from '@/shared/types';
import type {ReactNode} from 'react';
import {v7 as generateId} from 'uuid';

interface WindowData extends PopupData {
  /** id приложения */
  id: string,
  /** свернуто ли оно */
  minified: boolean
  zIndex: number;
}

interface Store {
  /** активное окно */
  activeWindow: string | null;
  /** открытые окна */
  windows: WindowData[];

  /** установить активное окно */
  setActiveWindow(id: string | null): void;

  /**
   * открыть приложение
   * @param payload конфиг окна
   * @param shouldRestore стоит ли развернуть окно вместо открытия нового (если оно уже открыто).
   * при этом подразумевается, что иконка и имя будут те же самые
   */
  openWindow(payload: PopupData, shouldRestore?: boolean): void;

  /** закрыть приложение */
  closeWindow(id: string): void;

  minifyWindow(id: string): void;

  restoreWindow(id: string): void;
}

const useStore = create<Store>((setState, getState) => ({
  activeWindow: null,
  windows: [],
  setActiveWindow(id: string | null) {
    setState({activeWindow: id});
  },
  openWindow(payload: PopupData, shouldRestore) {
    const {
      content,
      name,
      icon
    } = payload;
    const {windows, restoreWindow} = getState();

    if (shouldRestore) {
      const window = windows.find(x => x.icon === icon && x.name === name);
      if (window) {
        return restoreWindow(window.id);
      }
    }

    const id = generateId();
    let maxZIndex = 0;
    const newWindows = windows
      .map((x) => {
        if (maxZIndex < x.zIndex) {
          maxZIndex = x.zIndex;
        }

        return x;
      });

    newWindows.push({content, minified: false, zIndex: maxZIndex + 1, id, icon, name});

    setState({
      windows: newWindows,
      activeWindow: id
    });
  },
  closeWindow(id: string) {
    const {activeWindow} = getState();
    setState({
      windows: getState().windows.filter((x) => x.id !== id),
      activeWindow: activeWindow === id ? null : activeWindow
    });
  },
  minifyWindow(id: string) {
    setState({
      windows: getState().windows.map((x) => ({
        ...x,
        minified: x.id === id ? true : x.minified
      })),
      activeWindow: null
    });
  },
  restoreWindow(id: string) {
    const {windows} = getState();
    const maxZIndex = windows.reduce((acc, curr) => (curr.zIndex > acc
      ? curr.zIndex
      : acc), 0);

    setState({
      windows: windows.map((x) => ({
        ...x,
        minified: x.id === id ? false : x.minified,
        zIndex: x.id === id ? maxZIndex + 1 : x.zIndex
      })),
      activeWindow: id
    });
  }
}));

export default useStore;