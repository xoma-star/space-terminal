import useStore from '@/shared/store.ts';
import Window from './Window.tsx';
import {APPLICATION_CONTENT} from '../constants.ts';

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
            bodyContent={bodyContent()}
          />
        );
      })}
    </div>
  );
}

export default WindowsContainer;