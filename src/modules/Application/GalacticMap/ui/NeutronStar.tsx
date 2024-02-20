import {BaseProps} from './Star.tsx';
import BaseStar from './BaseStar.tsx';
import css from './Star.module.css';

function NeutronStar(props: BaseProps) {
  const {
    onClick
  } = props;

  return (
    <BaseStar className={css.neutronStar} size={32} onClick={onClick} />
  );
}

export default NeutronStar;