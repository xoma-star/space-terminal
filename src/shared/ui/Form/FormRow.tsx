import css from './Form.module.css';
import {cloneElement, ReactElement} from 'react';
import clsx from 'clsx';

interface BaseFormRowProps {
  children: ReactElement;
  caption?: string;
  direction?: 'row' | 'column';
}

interface FormRowPropsWithLabel extends BaseFormRowProps {
  label: string;
  /** айди чего-то, к чему будет привязан лабел */
  htmlFor: string;
}

interface FormRowPropsWithoutLabel extends BaseFormRowProps {
  label?: never;
  htmlFor?: never;
}

type FormRowProps = FormRowPropsWithLabel | FormRowPropsWithoutLabel;

function FormRow(props: FormRowProps) {
  const {
    label,
    children,
    caption,
    htmlFor,
    direction = 'row'
  } = props;

  return (
    <div className={clsx(css.formRow, direction === 'row' ? 'contents' : 'flex flex-col col-start-1 col-end-3')}>
      {label && (
        <label className={css.label} htmlFor={htmlFor}>
          <u>{label[0]}</u>
          {label.slice(1)}
        </label>
      )}
      {cloneElement(children, {id: htmlFor})}
      {caption && <span className={css.caption}>{caption}</span>}
    </div>
  );
}

export default FormRow;