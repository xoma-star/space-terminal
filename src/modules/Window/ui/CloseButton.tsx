import Button, {ButtonProps} from '../../../shared/ui/Button/Button.tsx';
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