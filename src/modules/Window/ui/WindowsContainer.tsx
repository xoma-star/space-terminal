import useStore from '@/shared/store.ts';
import Window from './Window.tsx';
import GalacticMap from '../../Application/GalacticMap.tsx';
import {Application} from '@/shared/constants.ts';
import {ReactNode} from 'react';
import Welcome from '../../Application/Welcome.tsx';
import Terminal from '../../Application/Terminal.tsx';

const APPLICATION_CONTENT: Record<Application, ReactNode> = {
  [Application.WELCOME]: <Welcome />,
  [Application.MAP]: <GalacticMap />,
  [Application.TERMINAL]: <Terminal />,
  [Application.MARKET]: () => null
};

function WindowsContainer() {
  const {activeWindow, windows} = useStore();

  return (
    <div className="fixed top-0 left-0 p-4 box-border w-full">
      {windows.map((x) => {
        const bodyContent = APPLICATION_CONTENT[x.application];

        return (
          <Window
            style={{zIndex: x.zIndex}}
            key={x.application}
            app={x.application}
            active={activeWindow === x.application}
            minified={x.minified}
          >
            {bodyContent}
          </Window>
        );
      })}
    </div>
  );
}

export default WindowsContainer;