import css from './Paragraph.module.css';

interface ParagraphProps {
  children: string;
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