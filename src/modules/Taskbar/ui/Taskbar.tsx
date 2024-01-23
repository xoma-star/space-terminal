import css from './Taskbar.module.css';
import classNames from '@/shared/lib/classNames.ts';
import useStore from '@/shared/store.ts';
import Button from '@/shared/ui/Button/Button.tsx';
import {APPLICATION_DATA} from '@/shared/constants.ts';

export default function Taskbar() {
  const {
    windows,
    activeWindow,
    restoreWindow,
    minifyWindow
  } = useStore();

  return (
    <div className={classNames(css.taskbar, 'fixed bottom-0 left-0 w-full flex items-center p-2 box-border')}>
      {windows.map((x) => {
        const {
          name,
          icon
        } = APPLICATION_DATA[x.application];

        return (
          <Button
            key={name}
            before={<img width={16} height={16} src={icon} alt={name} />}
            className={classNames(css.button, activeWindow === x.application && css.active)}
            onClick={() => (x.minified
              ? restoreWindow(x.application)
              : minifyWindow(x.application)
            )}
          >
            {name}
          </Button>
        );
      })}
    </div>
  );
}