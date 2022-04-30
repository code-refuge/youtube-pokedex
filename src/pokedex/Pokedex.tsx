import React, { useEffect, useState } from 'react';
import { PokemonDetail } from '../pokemon/interfaces/PokemonDetail';
import { getPokemonDetails } from '../pokemon/services/getPokemonDetails';
import { listPokemons, PokemonListInterface } from '../pokemon/services/listPokemons';

interface PokedexProps {

}

const Pokedex: React.FC<PokedexProps> = () => {
  const [pokemons, setPokemons] = useState<PokemonListInterface[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonListInterface | undefined>(undefined);
  const [selectedPokemonDetails, setSelectedPokemonDetails] = useState<PokemonDetail | undefined>(undefined);

  useEffect(() => {
    listPokemons().then((response) => {
      setPokemons(response.results);
    });
  }, []);

  useEffect(() => {
    if (selectedPokemon) {
      getPokemonDetails(selectedPokemon.name).then((response) => {
        setSelectedPokemonDetails(response);
      })
    }
  }, [selectedPokemon]);

  return (
    <div>
      <h1>Pokedex</h1>

      Pokemons:
      <br />
      {pokemons.map((pokemon) => (
        <button key={pokemon.name} onClick={() => setSelectedPokemon(pokemon)}>
          {pokemon.name}
        </button>
      ))}

      <h2>Pokemon selecionado:</h2>
      {selectedPokemon?.name || `Nenhum pokemon selecionado`}
      {JSON.stringify(selectedPokemonDetails, undefined, 2)}
    </div>
  );
};

export default Pokedex;