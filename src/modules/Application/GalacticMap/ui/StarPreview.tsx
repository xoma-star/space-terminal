import Star from './Star';
import BlackHole from './BlackHole';
import {StarType, type SystemData} from '@xoma_star/shared-stellar-goose';
import NeutronStar from './NeutronStar';
import {createElement, type ReactNode} from 'react';

type StarPreviewProps = SystemData<StarType>;

/**
 * компонент-вилка, который отображает нужный тип звездной системы
 * в зависимости от starType
 */
export default function StarPreview(props: StarPreviewProps) {
  let component: (props: any) => ReactNode;
  switch (props.starType) {
    case StarType.STAR:
      component = Star;
      break;
    case StarType.BLACK_HOLE:
      component = BlackHole;
      break;
    case StarType.NEUTRON_STAR:
      component = NeutronStar;
      break;
    default:
      component = () => null;
  }

  return createElement(component, props);
}