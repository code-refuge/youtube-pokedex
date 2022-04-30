import React from 'react';
import Pokedex from './pokedex/Pokedex';

interface AppProps {

}

const App: React.FC<AppProps> = () => {
  return (
    <div>
      <Pokedex></Pokedex>
    </div>
  );
};

export default App;