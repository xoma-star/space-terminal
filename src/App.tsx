import {Desktop} from './modules/Desktop';
import {WindowsContainer} from './modules/Window';
import {Taskbar} from './modules/Taskbar';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WindowsContainer />
      <Desktop />
      <Taskbar />
    </QueryClientProvider>
  );
}