import {Icon} from '@/shared/constants';

export default function Loader() {
  return (
    <div className="w-full h-full flex items-center justify-center absolute">
      <div className="absolute w-full h-full bg-gray-400 opacity-50" />
      <img src={Icon.HOURGLASS} alt="hourglass" />
    </div>
  );
}