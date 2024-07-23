import css from './Taskbar.module.css';
import classNames from '@/shared/lib/classNames';
import useStore from '@/shared/store';
import Button from '@/shared/ui/Button/Button';

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
          icon,
          name,
          id
        } = x;
        return (
          <Button
            key={id}
            before={<img width={16} height={16} src={icon} alt={name} />}
            className={classNames(css.button, activeWindow === id && css.active)}
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