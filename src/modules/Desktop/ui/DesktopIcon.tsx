import {ButtonHTMLAttributes, CSSProperties} from 'react';
import css from './DesktopIcon.module.css';
import classNames from '@/shared/lib/classNames';

interface IconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  caption: string;
  img: string;
  selected: boolean;
}

export default function DesktopIcon(props: IconProps) {
  const {
    img,
    caption,
    selected,
    ...restProps
  } = props;

  return (
    <button
      {...restProps}
      type="button"
      className={classNames(css.desktopIcon, selected && css.active, 'flex flex-col items-center')}
    >
      <div className={css.iconWrapper}>
        <img src={img} alt={caption} />
        <div
          className={css.selectionEffect}
          style={{'--mask': `url('${img}')`} as CSSProperties}
        />
      </div>
      <span className={classNames(css.title, 'flex justify-center w-full text-center box-border')}>
        {caption}
      </span>
    </button>
  );
}
