import {useEffect} from 'react';
import WebApp from '@twa-dev/sdk';
import useWindows from '@/shared/lib/useWindows';
import ApiService from '@/shared/ApiService';

export default function useAuth() {
  const {showError} = useWindows();

  useEffect(() => {
    const service = new ApiService('users');
    service
      .post('auth', {
        body: JSON.stringify(WebApp.initData)
      })
      .catch(showError);
  }, []);
}