import axios from "axios";

export interface PokemonListInterface {
  name: string;
  url: string;
}

export interface ListPokemonsInterface {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListInterface[];
}

export async function listPokemons(): Promise<ListPokemonsInterface> {
  const endpoint = `${process.env.REACT_APP_POKEAPI}/pokemon`;

  const response = await axios.get<ListPokemonsInterface>(endpoint);

  return response.data;
}