import {type CSSProperties, type MouseEvent, type ReactNode} from 'react';
import css from './Window.module.css';
import MinifyButton from './MinifyButton';
import CloseButton from './CloseButton';
import useStore from '@/shared/store';
import type {PopupData} from '@/shared/types';
import clsx from 'clsx';

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
    children,
    shouldStretch = {x: true}
  } = props;

  const {closeWindow, minifyWindow, setActiveWindow} = useStore();

  const minifyHandler = (e: MouseEvent) => {
    e.stopPropagation();
    minifyWindow(id);
  };

  return (
    <div
      className={clsx(
        css.container,
        'fixed duration-100 max-w-full flex flex-col',
        {
          'w-full': shouldStretch === true || shouldStretch?.x,
          'h-full top-0': shouldStretch === true || shouldStretch?.y
        },
        minified && css.minified
      )}
      style={style}
      onClick={() => setActiveWindow(id)}
    >
      <div className={clsx(css.header, 'flex justify-between items-center', active && css.active)}>
        <div className={clsx(css.caption, 'flex flex-row gap-2xs items-center')}>
          {icon && <img src={icon} alt={name} />}
          <span>{name}</span>
        </div>
        <div className={clsx(css.controls, 'flex gap-3xs ml-s')}>
          <MinifyButton onClick={minifyHandler} />
          <CloseButton onClick={() => closeWindow(id)} />
        </div>
      </div>
      <div className={clsx(css.body, 'overflow-auto relative flex-grow')}>
        {children}
      </div>
    </div>
  );
}