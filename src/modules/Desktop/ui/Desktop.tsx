import {type ReactNode, useState} from 'react';
import DesktopIcon from './DesktopIcon';
import useStore from '@/shared/store';
import {GalacticMap, Terminal} from '@/modules/Application';

/** список приложений */
enum Application {
  TERMINAL = 'terminal',
  MARKET = 'market',
  MAP = 'map'
}

interface ApplicationData {
  name: string;
  icon: string;
  availableOnDesktop?: boolean;
  content: ReactNode;
  shouldOpenOnce?: boolean;
}

/** информация о приложениях */
const APPLICATION_DATA: Record<Application, ApplicationData> = {
  [Application.TERMINAL]: {
    name: 'Терминал',
    icon: '/desktop-icons/computer-4.png',
    availableOnDesktop: true,
    content: <Terminal />
  },
  [Application.MARKET]: {
    name: 'Торговая площадка',
    icon: '/desktop-icons/shell_window4.png',
    availableOnDesktop: true,
    content: <div>market</div>,
    shouldOpenOnce: true
  },
  [Application.MAP]: {
    name: 'Карта',
    icon: '/desktop-icons/globe_map-0.png',
    availableOnDesktop: true,
    content: <GalacticMap />,
    shouldOpenOnce: true
  }
};

export default function Desktop() {
  const [selectedApp, setSelectedApp] = useState<null | Application>(null);
  const {openWindow, restoreWindow} = useStore();

  const clickHandler = (app: Application) => {
    const {content, name, icon, shouldOpenOnce} = APPLICATION_DATA[app];
    return () => {
      openWindow({icon, name, content}, shouldOpenOnce);
    };
  };

  return (
    <div className="flex flex-col bg-black w-full h-full">
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