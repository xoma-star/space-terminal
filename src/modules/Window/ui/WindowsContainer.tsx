import useStore from '@/shared/store';
import Window from './Window';

function WindowsContainer() {
  const {activeWindow, windows} = useStore();

  return (
    <div className="fixed top-0 left-0 box-border w-full px-s">
      {windows.map((x) => {
        const {
          content,
          name,
          icon,
          id,
          minified,
          zIndex
        } = x;
        return (
          <Window
            style={{zIndex}}
            key={id}
            id={id}
            icon={icon}
            name={name}
            active={activeWindow === id}
            minified={minified}
          >
            {content}
          </Window>
        );
      })}
    </div>
  );
}

export default WindowsContainer;