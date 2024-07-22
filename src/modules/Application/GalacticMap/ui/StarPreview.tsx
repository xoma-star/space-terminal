import Star from './Star';
import BlackHole from './BlackHole';
import {type SystemData, StarType} from '@xoma_star/shared-stellar-goose';

type StarPreviewProps = Partial<SystemData<unknown>>;

/**
 * компонент-вилка, который отображает нужный тип звездной системы
 * в зависимости от starType
 */
export default function StarPreview(props: StarPreviewProps) {
  const {
    starType,
    spectralClass,
    luminosityClass,
    blackHoleType
  } = props;

  switch (starType) {
    case StarType.STAR:
      return (
        <Star
          spectralClass={spectralClass}
          luminosityClass={luminosityClass}
        />
      );
    case StarType.BLACK_HOLE:
      return (
        <BlackHole
          blackHoleType={blackHoleType}
        />
      );
    default:
      return null;
  }
}