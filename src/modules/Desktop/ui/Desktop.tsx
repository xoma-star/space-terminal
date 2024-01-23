import {useState} from 'react';
import DesktopIcon from './DesktopIcon.tsx';
import {Application, APPLICATION_DATA} from '@/shared/constants.ts';
import useStore from '@/shared/store.ts';

export default function Desktop() {
  const [selectedApp, setSelectedApp] = useState<null | Application>(null);
  const {openWindow} = useStore();

  return (
    <div className="flex flex-col bg-black w-full h-full">
      {
        (Object.keys(APPLICATION_DATA) as Application[])
          .filter((x) => APPLICATION_DATA[x].availableOnDesktop)
          .map((x) => (
            <DesktopIcon
              onFocus={() => setSelectedApp(x)}
              onBlur={() => setSelectedApp(null)}
              key={APPLICATION_DATA[x].name}
              caption={APPLICATION_DATA[x].name}
              img={APPLICATION_DATA[x].icon}
              selected={selectedApp === x}
              onDoubleClick={() => openWindow(x)}
              onTouchEnd={() => openWindow(x)}
            />
          ))
      }
    </div>
  );
}