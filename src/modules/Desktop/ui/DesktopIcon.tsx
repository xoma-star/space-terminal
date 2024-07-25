import type {ButtonHTMLAttributes, CSSProperties} from 'react';
import css from './DesktopIcon.module.css';
import clsx from 'clsx';

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
      className={clsx(css.desktopIcon, selected && css.active, 'flex flex-col items-center')}
    >
      <div className={css.iconWrapper}>
        <img src={img} alt={caption} />
        <div
          className={css.selectionEffect}
          style={{'--mask': `url('${img}')`} as CSSProperties}
        />
      </div>
      <span className={clsx(css.title, 'flex justify-center w-full text-center box-border')}>
        {caption}
      </span>
    </button>
  );
}
