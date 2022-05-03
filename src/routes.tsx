import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FavoriteScreen from './favorites/FavoriteScreen';
import Pokedex from './pokedex/Pokedex';
import PokemonDetails from './pokemon/PokemonDetails';

interface RoutesProps {

}

export const Routes: React.FC<RoutesProps> = () => {
  return (
    <Switch>
      <Route path='/pokemon/:name'>
        <PokemonDetails />
      </Route>
      <Route path='/favoritos'>
        <FavoriteScreen />
      </Route>
      <Route path='/'>
        <Pokedex />
      </Route>
    </Switch>
  );
};

export default Routes;