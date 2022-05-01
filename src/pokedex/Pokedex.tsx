import { AppBar, Toolbar, IconButton, Typography, Container, Grid } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { PokemonDetail } from '../pokemon/interfaces/PokemonDetail';
import { listPokemons } from '../pokemon/services/listPokemons';
import PokedexCard from './components/PokedexCard';

interface PokedexProps {

}

const Pokedex: React.FC<PokedexProps> = () => {
  const [pokemons, setPokemons] = useState<PokemonDetail[]>([]);

  useEffect(() => {
    listPokemons().then((response) => {
      setPokemons(response.results);
    });
  }, []);

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
                <PokedexCard pokemon={pokemon} />
              </Grid>
            ))}
          </Grid>
        </>
      </Container>
    </div>
  );
};

export default Pokedex;