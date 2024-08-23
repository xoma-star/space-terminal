import BaseStar from './BaseStar';
import css from './Star.module.css';

function NeutronStar() {
  return (
    <BaseStar className={css.neutronStar} size={32} />
  );
}

export default NeutronStar;