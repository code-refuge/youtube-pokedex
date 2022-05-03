import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter } from 'react-router-dom';
import { FavoriteProvider } from './favorites/contexts/FavoriteContext';
import Routes from './routes';

interface AppProps {

}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    }
  }
})

const App: React.FC<AppProps> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoriteProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </FavoriteProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;