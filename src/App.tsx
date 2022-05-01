import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

interface AppProps {

}

const App: React.FC<AppProps> = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

export default App;