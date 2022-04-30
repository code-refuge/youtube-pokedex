import React, { useState } from 'react';

interface PokedexProps {

}

const pokemonsArray: string[] = [
  'Bulbasaur',
  'Ivysaur',
  'Venusaur',
  'Charmander',
  'Charmeleon',
]

const Pokedex: React.FC<PokedexProps> = () => {
  const [pokemons, setPokemons] = useState<string[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<string | undefined>(undefined);

  return (
    <div>
      <h1>Pokedex</h1>

      Pokemons:
      {pokemons.map((pokemon) => (
        <button key={pokemon} onClick={() => setSelectedPokemon(pokemon)}>
          {pokemon}
        </button>
      ))}
    </div>
  );
};

export default Pokedex;