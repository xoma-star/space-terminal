import {type ReactNode, useState} from 'react';
import DesktopIcon from './DesktopIcon';
import useStore from '@/shared/store';
import {GalacticMap, Terminal} from '@/modules/Application';
import {Icon} from '@/shared/constants';
import type {PopupData} from '@/shared/types.ts';

/** список приложений */
enum Application {
  TERMINAL = 'terminal',
  MARKET = 'market',
  MAP = 'map'
}

interface ApplicationData {
  name: string;
  icon: Icon;
  availableOnDesktop?: boolean;
  content: ReactNode;
  shouldOpenOnce?: boolean;
}

/** информация о приложениях */
const APPLICATION_DATA: Record<Application, ApplicationData & Pick<PopupData, 'shouldStretch'>> = {
  [Application.TERMINAL]: {
    name: 'Терминал',
    icon: Icon.COMPUTER,
    availableOnDesktop: true,
    content: <Terminal />
  },
  [Application.MARKET]: {
    name: 'Торговая площадка',
    icon: Icon.SHELL_WINDOW,
    availableOnDesktop: true,
    content: <div>market</div>,
    shouldOpenOnce: true
  },
  [Application.MAP]: {
    name: 'Карта',
    icon: Icon.GLOBE_MAP,
    availableOnDesktop: true,
    content: <GalacticMap />,
    shouldOpenOnce: true,
    shouldStretch: true
  }
};

export default function Desktop() {
  const [selectedApp, setSelectedApp] = useState<null | Application>(null);
  const {openWindow} = useStore();

  const clickHandler = (app: Application) => {
    const {content, name, icon, shouldOpenOnce, shouldStretch} = APPLICATION_DATA[app];
    return () => {
      openWindow({icon, name, content, shouldStretch}, shouldOpenOnce);
    };
  };

  return (
    <div className="flex flex-col bg-black w-full h-full items-center justify-center absolute top-0 left-0">
      {
        (Object.keys(APPLICATION_DATA) as Application[])
          .filter((x) => APPLICATION_DATA[x].availableOnDesktop)
          .map((x) => {
            const {
              name,
              icon
            } = APPLICATION_DATA[x];
            return (
              <DesktopIcon
                onFocus={() => setSelectedApp(x)}
                onBlur={() => setSelectedApp(null)}
                key={name}
                caption={name}
                img={icon}
                selected={selectedApp === x}
                onDoubleClick={clickHandler(x)}
                onTouchEnd={clickHandler(x)}
              />
            );
          })
      }
    </div>
  );
}