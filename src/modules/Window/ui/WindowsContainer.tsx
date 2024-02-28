import useStore from '@/shared/store';
import Window from './Window';
import GalacticMap from '../../Application/GalacticMap';
import {Application} from '@/shared/constants';
import {ReactNode} from 'react';
import Welcome from '../../Application/Welcome';
import Terminal from '../../Application/Terminal';

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