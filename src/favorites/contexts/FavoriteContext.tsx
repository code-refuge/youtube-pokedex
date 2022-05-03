import React, { useState } from 'react';
import { PokemonDetail } from '../../pokemon/interfaces/PokemonDetail';

interface FavoriteContextProps {
  favorites: PokemonDetail[];
  setFavorites: React.Dispatch<React.SetStateAction<PokemonDetail[]>>;
}

const INITAL_FAVORITES_VALUE: PokemonDetail[] = [];

// create context
export const FavoriteContext = React.createContext<FavoriteContextProps>({
  favorites: INITAL_FAVORITES_VALUE,
  setFavorites: () => console.warn(`setFavorites is not ready`),
});

export const FavoriteProvider: React.FC = ({ children }) => {
  const [favorites, setFavorites] = useState<PokemonDetail[]>(INITAL_FAVORITES_VALUE);

  return (
    <FavoriteContext.Provider value={{
      favorites,
      setFavorites,
    }}>
      {children}
    </FavoriteContext.Provider>
  );
};