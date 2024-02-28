import Button, {ButtonProps} from '../../../shared/ui/Button/Button';
import css from './CloseButton.module.css';

function CloseButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      className={css.button}
    />
  );
}

export default CloseButton;