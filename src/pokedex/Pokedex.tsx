import { AppBar, Toolbar, IconButton, Typography, Container, Grid, Button, LinearProgress } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import React from 'react';
import { useQuery } from 'react-query';
import { listPokemons } from '../pokemon/services/listPokemons';
import PokedexCard from './components/PokedexCard';

import CircularProgress from '@material-ui/core/CircularProgress';

interface PokedexProps {

}

const Pokedex: React.FC<PokedexProps> = () => {
  const { data, isLoading, isRefetching, refetch } = useQuery(`listPokemons`, listPokemons);

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
      {isRefetching && <LinearProgress />}

      <Container>
        <div style={{ marginTop: `1em` }}>
          {isLoading ? (
            <>
              <CircularProgress />
            </>
          ) : (
            <>
              <Button onClick={() => refetch()}>refetch</Button>
              <Grid container spacing={2}>
                {data?.results.map((pokemon) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.name}>
                    <PokedexCard pokemon={pokemon} />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Pokedex;