import {Title, Paragraph} from '@/shared/ui';

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
    <div className="p-xs">
      <Title>{message}</Title>
      <Paragraph>{details}</Paragraph>
    </div>
  );
}