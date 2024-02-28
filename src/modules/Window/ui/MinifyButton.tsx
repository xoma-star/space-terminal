import Button, {ButtonProps} from '../../../shared/ui/Button/Button';
import css from './MinifyButton.module.css';

function MinifyButton(props: ButtonProps) {
  return (
    <Button {...props} className={css.button} />
  );
}

export default MinifyButton;