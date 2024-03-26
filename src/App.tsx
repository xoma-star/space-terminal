import {Desktop} from './modules/Desktop';
import WindowsContainer from './modules/Window/ui/WindowsContainer';
import Taskbar from './modules/Taskbar/ui/Taskbar';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Desktop />
      <WindowsContainer />
      <Taskbar />
    </QueryClientProvider>
  );
}