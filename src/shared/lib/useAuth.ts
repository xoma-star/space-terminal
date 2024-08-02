import {useEffect} from 'react';
import ky from 'ky';
import WebApp from '@twa-dev/sdk';
import useWindows from '@/shared/lib/useWindows';

export default function useAuth() {
  const {showError} = useWindows();

  useEffect(() => {
    ky
      .post('http://localhost:3000/auth', {
        body: JSON.stringify(WebApp.initData)
      })
      .catch(showError);
  }, []);
}