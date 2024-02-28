import {FormEvent, HTMLAttributes, ReactNode} from 'react';
import classNames from '@/shared/lib/classNames';
import css from './Form.module.css';

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
      className={classNames('gap-2 grid h-fit items-center', className, css.form)}
    >
      {children}
    </form>
  );
}

export default Form;