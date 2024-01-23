import {ImgHTMLAttributes} from 'react';
import classNames from '@/shared/lib/classNames.ts';

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
      className={classNames(className, 'border-[1px] border-black border-solid')}
    />
  );
}

export default Image;