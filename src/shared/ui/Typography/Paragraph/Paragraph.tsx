import css from './Paragraph.module.css';
import type {ReactNode} from 'react';

interface ParagraphProps {
  children: ReactNode;
}

function Paragraph(props: ParagraphProps) {
  const {children} = props;

  return (
    <p className={css.paragraph}>
      {children}
    </p>
  );
}

export default Paragraph;