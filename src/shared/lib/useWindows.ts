import useStore from '@/shared/store';
import {useCallback, createElement} from 'react';
import {Icon} from '@/shared/constants';
import {ErrorContainer, type ErrorContainerProps, type ErrorAction} from '@/shared/ui';
import {HTTPError} from 'ky';

type ErrorPayload = ErrorContainerProps | Error | HTTPError;

/**
 * хук для взаимодействия с окнами
 */
export default function useWindows() {
  const {
    windows,
    restoreWindow,
    openWindow,
    activeWindow,
    setActiveWindow,
    minifyWindow,
    closeWindow
  } = useStore();

  const showError = useCallback(async (payload: ErrorPayload) => {
    let message: string;
    let details: string | undefined;
    let actions: ErrorAction[] | undefined;

    if (payload instanceof HTTPError) {
      try {
        const errorResponse = await payload.response.json();
        message = errorResponse?.name;
        details = errorResponse?.message;
      } catch (e) {
        console.error(e);
      }
    } else if (payload instanceof Error) {
      message = payload.message;
      details = payload.stack;
    } else if (typeof payload === 'object') {
      ({
        message,
        details,
        actions
      } = payload);
    } else {
      message = 'Неизвестная ошибка';
    }

    openWindow({
      name: 'Ошибка',
      icon: Icon.RESTRICT,
      content: createElement(ErrorContainer, {details, message, actions}),
      shouldStretch: false
    });

    console.error(payload);
  }, [openWindow]);

  return {
    windows,
    restoreWindow,
    openWindow,
    activeWindow,
    setActiveWindow,
    minifyWindow,
    closeWindow,
    showError
  };
}