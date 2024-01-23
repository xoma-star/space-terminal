import {Desktop} from './modules/Desktop';
import WindowsContainer from './modules/Window/ui/WindowsContainer.tsx';
import Taskbar from './modules/Taskbar/ui/Taskbar.tsx';

export default function App() {
  return (
    <>
      <Desktop />
      <WindowsContainer />
      <Taskbar />
    </>
  );
}