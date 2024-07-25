import type {FormEvent, HTMLAttributes, ReactNode} from 'react';
import css from './Form.module.css';
import clsx from 'clsx';

interface FormProps extends HTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

function Form(props: FormProps) {
  const {
    onSubmit,
    children,
    className,
    ...restProps
  } = props;

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.(event);
  };

  return (
    <form
      {...restProps}
      onSubmit={submitHandler}
      className={clsx('gap-2xs grid h-fit items-center', className, css.form)}
    >
      {children}
    </form>
  );
}

export default Form;