import {Desktop} from './modules/Desktop';
import WindowsContainer from './modules/Window/ui/WindowsContainer';
import Taskbar from './modules/Taskbar/ui/Taskbar';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Desktop />
      <WindowsContainer />
      <Taskbar />
    </ApolloProvider>
  );
}