import {CSSProperties, MouseEvent, ReactNode} from 'react';
import css from './Window.module.css';
import classNames from '../../../shared/lib/classNames';
import MinifyButton from './MinifyButton';
import CloseButton from './CloseButton';
import useStore from '@/shared/store';
import type {PopupData} from '@/shared/types';

interface WindowProps extends Omit<PopupData, 'content'>{
  active: boolean;
  minified: boolean;
  style: CSSProperties;
  id: string;
  children: ReactNode;
}

export default function Window(props: WindowProps) {
  const {
    name,
    icon,
    active,
    minified,
    style,
    id,
    children
  } = props;

  const {closeWindow, minifyWindow, setActiveWindow} = useStore();

  const minifyHandler = (e: MouseEvent) => {
    e.stopPropagation();
    minifyWindow(id);
  };

  return (
    <div
      className={classNames(css.container, 'absolute duration-100 my-s', minified && css.minified)} style={style}
      onClick={() => setActiveWindow(id)}
    >
      <div className={classNames(css.header, 'flex justify-between items-center mb-2', active && css.active)}>
        <div className={classNames(css.caption, 'flex flex-row gap-2')}>
          {icon && <img src={icon} alt={name} />}
          <span>{name}</span>
        </div>
        <div className={classNames(css.controls, 'flex gap-1 ml-4')}>
          <MinifyButton onClick={minifyHandler} />
          <CloseButton onClick={() => closeWindow(id)} />
        </div>
      </div>
      <div className={classNames(css.body, 'overflow-auto relative')}>
        {children}
      </div>
    </div>
  );
}