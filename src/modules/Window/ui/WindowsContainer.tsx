import useStore from '@/shared/store';
import Window from './Window';

function WindowsContainer() {
  const {activeWindow, windows} = useStore();

  return (
    <div className="relative top-0 left-0 box-border w-full h-full flex justify-center items-center">
      {windows.map((x) => {
        const {
          content,
          id,
          zIndex,
          ...restProps
        } = x;
        return (
          <Window
            {...restProps}
            style={{zIndex}}
            key={id}
            id={id}
            active={activeWindow === id}
          >
            {content}
          </Window>
        );
      })}
    </div>
  );
}

export default WindowsContainer;