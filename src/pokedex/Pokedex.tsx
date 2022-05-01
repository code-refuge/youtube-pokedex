import { AppBar, Toolbar, IconButton, Typography, Button, Box, Card, Container, Grid, CardContent, CardActions } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
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
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" >
            Pokedex
          </Typography>
        </Toolbar>
      </AppBar>

      <Container>
        <>
          <Grid container spacing={2}>
            {pokemons.map((pokemon) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.name}>
                <Card variant='outlined'>
                  <CardContent>
                    <Typography variant='h6'>
                      {pokemon.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={() => setSelectedPokemon(pokemon)} size='small' color='primary'>
                      Abrir
                    </Button>

                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      </Container>


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