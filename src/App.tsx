import {Desktop} from './modules/Desktop';
import {WindowsContainer} from './modules/Window';
import {Taskbar} from './modules/Taskbar';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import useAuth from '@/shared/lib/useAuth';

const queryClient = new QueryClient();

export default function App() {
  useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <WindowsContainer />
      <Desktop />
      <Taskbar />
    </QueryClientProvider>
  );
}