import {CSSProperties, MouseEvent, ReactNode} from 'react';
import css from './Window.module.css';
import classNames from '../../../shared/lib/classNames';
import MinifyButton from './MinifyButton';
import CloseButton from './CloseButton';
import {Application, APPLICATION_DATA} from '@/shared/constants';
import useStore from '@/shared/store';

interface WindowProps {
  app: Application;
  active: boolean;
  minified: boolean;
  style: CSSProperties;
  children: ReactNode;
}

export default function Window(props: WindowProps) {
  const {
    app,
    active,
    minified,
    style,
    children
  } = props;
  const {
    icon,
    name
  } = APPLICATION_DATA[app];

  const {closeWindow, minifyWindow, setActiveWindow} = useStore();

  const minifyHandler = (e: MouseEvent) => {
    e.stopPropagation();
    minifyWindow(app);
  };

  return (
    <div
      className={classNames(css.container, 'absolute duration-100', minified && css.minified)} style={style}
      onClick={() => setActiveWindow(app)}
    >
      <div className={classNames(css.header, 'flex justify-between items-center mb-2', active && css.active)}>
        <div className={classNames(css.caption, 'flex flex-row gap-2')}>
          {icon && <img src={icon} alt={name} />}
          <span>{name}</span>
        </div>
        <div className={classNames(css.controls, 'flex gap-1 ml-4')}>
          <MinifyButton onClick={minifyHandler} />
          <CloseButton onClick={() => closeWindow(app)} />
        </div>
      </div>
      <div className={classNames(css.body, 'overflow-auto relative')}>
        {children}
      </div>
    </div>
  );
}