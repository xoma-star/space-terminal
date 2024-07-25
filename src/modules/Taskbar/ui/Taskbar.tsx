import css from './Taskbar.module.css';
import useStore from '@/shared/store';
import Button from '@/shared/ui/Button/Button';
import clsx from 'clsx';

export default function Taskbar() {
  const {
    windows,
    activeWindow,
    restoreWindow,
    minifyWindow
  } = useStore();

  return (
    <div className={clsx(css.taskbar, 'fixed bottom-0 left-0 w-full flex items-center p-2xs box-border')}>
      {windows.map((x) => {
        const {
          icon,
          name,
          id
        } = x;
        return (
          <Button
            key={id}
            before={<img className={css.taskbarImage} src={icon} alt={name} />}
            className={clsx(css.button, activeWindow === id && css.active)}
            onClick={() => (id !== activeWindow
                ? restoreWindow(id)
                : minifyWindow(id)
            )}
          >
            {name}
          </Button>
        );
      })}
    </div>
  );
}