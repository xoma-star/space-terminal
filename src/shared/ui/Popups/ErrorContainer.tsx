import {Title, Paragraph, Button} from '@/shared/ui';

/**
 * свойства кнопки в контейнере
 */
export interface ErrorAction {
  title: string;
  onClick(): void;
}

export interface ErrorContainerProps {
  message: string;
  details?: string;
  actions?: ErrorAction[];
}

export default function ErrorContainer(props: ErrorContainerProps) {
  const {
    message,
    details,
    actions
  } = props;

  return (
    <div className="p-xs">
      <Title>{message}</Title>
      <Paragraph>{details}</Paragraph>
      {actions && (
        <div className="flex flex-row gap-s items-center justify-center">
          {actions.map(({title, onClick}) => (
            <Button onClick={onClick}>{title}</Button>
          ))}
        </div>
      )}
    </div>
  );
}