import {Desktop} from './modules/Desktop';
import {WindowsContainer} from './modules/Window';
import {Taskbar} from './modules/Taskbar';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import WebApp from '@twa-dev/sdk';
import {useEffect} from 'react';

const queryClient = new QueryClient();

export default function App() {
  useEffect(() => {
    WebApp.showAlert('Hey')
  } ,[])

  return (
    <QueryClientProvider client={queryClient}>
      <WindowsContainer />
      <Desktop />
      <Taskbar />
    </QueryClientProvider>
  );
}