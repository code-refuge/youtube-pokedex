import axios from "axios";
import { PokemonDetail } from "../interfaces/PokemonDetail";
import { getPokemonDetails } from "./getPokemonDetails";

export interface PokemonListInterface {
  name: string;
  url: string;
}

export interface ListPokemonsInterface {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonDetail[];
}

export async function listPokemons(): Promise<ListPokemonsInterface> {
  const endpoint = `${process.env.REACT_APP_POKEAPI}/pokemon`;

  const response = await axios.get<ListPokemonsInterface>(endpoint);

  const promiseArr = response.data.results.map(async (pokemon) => getPokemonDetails(pokemon.name));

  const resultsPromise = await Promise.all(promiseArr);

  return {
    ...response.data,
    results: resultsPromise
  };
}