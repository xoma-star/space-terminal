import {Title, Paragraph} from '@/shared/ui/Typography';

export interface ErrorContainerProps {
  message: string;
  details?: string;
}

export default function ErrorContainer(props: ErrorContainerProps) {
  const {
    message,
    details
  } = props;

  return (
    <div>
      <Title>{message}</Title>
      <Paragraph>{details}</Paragraph>
    </div>
  );
}