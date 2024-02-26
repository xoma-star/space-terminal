import {create} from 'zustand';
import {Application} from '@/shared/constants.ts';

interface Store {
  /** активное окно */
  activeWindow: Application | null;
  /** открытые окна */
  windows: {
    /** id приложения */
    application: Application,
    /** свернуто ли оно */
    minified: boolean
    /** z-index */
    zIndex: number;
  }[];
  /** установить активное окно */
  setActiveWindow(payload: Application | null): void;
  /** открыть приложение */
  openWindow(payload: Application): void;
  /** закрыть приложение */
  closeWindow(payload: Application): void;
  minifyWindow(payload: Application): void;
  restoreWindow(payload: Application): void;
}

const useStore = create<Store>((setState, getState) => ({
  activeWindow: null,
  windows: [{application: Application.TERMINAL, zIndex: 1, minified: false}],
  setActiveWindow(payload: Application | null) {
    setState({activeWindow: payload});
  },
  openWindow(payload: Application) {
    let alreadyOpened = false;
    let maxZIndex = 0;
    const windows = getState()
      .windows
      .map((x) => {
        if (x.application === payload) {
          alreadyOpened = true;
          x.minified = false;
        }

        if (maxZIndex < x.zIndex) {
          maxZIndex = x.zIndex;
        }

        return x;
      });

    if (!alreadyOpened) {
      windows.push({application: payload, minified: false, zIndex: maxZIndex + 1});
    }

    setState({
      windows,
      activeWindow: payload
    });
  },
  closeWindow(payload: Application) {
    const {activeWindow} = getState();
    setState({
      windows: getState().windows.filter((x) => x.application !== payload),
      activeWindow: activeWindow === payload ? null : activeWindow
    });
  },
  minifyWindow(payload: Application) {
    setState({
      windows: getState().windows.map((x) => ({
        ...x,
        minified: x.application === payload ? true : x.minified
      })),
      activeWindow: null
    });
  },
  restoreWindow(payload: Application) {
    const {windows} = getState();
    const maxZIndex = windows.reduce((acc, curr) => (curr.zIndex > acc
      ? curr.zIndex
      : acc), 0);

    setState({
      windows: windows.map((x) => ({
        minified: x.application === payload ? false : x.minified,
        application: x.application,
        zIndex: x.application === payload ? maxZIndex + 1 : x.zIndex
      })),
      activeWindow: payload
    });
  }
}));

export default useStore;