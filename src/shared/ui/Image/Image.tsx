import {ImgHTMLAttributes} from 'react';
import clsx from 'clsx';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {

}

function Image(props: ImageProps) {
  const {
    className,
    ...restProps
  } = props;
  return (
    <img
      {...restProps}
      className={clsx(className, 'border-[0.0625rem] border-black border-solid')}
    />
  );
}

export default Image;