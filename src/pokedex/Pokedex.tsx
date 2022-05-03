import { AppBar, Toolbar, IconButton, Typography, Container, Grid, Button, LinearProgress, Badge } from '@mui/material';
import { Favorite, Menu as MenuIcon, More } from '@mui/icons-material';
import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { listPokemons } from '../pokemon/services/listPokemons';
import PokedexCard from './components/PokedexCard';

import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';
import { useHistory } from 'react-router-dom';
import { FavoriteContext } from '../favorites/contexts/FavoriteContext';
import { PokemonDetail } from '../pokemon/interfaces/PokemonDetail';

interface PokedexProps {

}

const Pokedex: React.FC<PokedexProps> = () => {
  const { favorites } = useContext(FavoriteContext);
  const { push } = useHistory();
  const { data, isLoading, isRefetching, refetch } = useQuery(`listPokemons`, listPokemons);

  const favoritesCount = favorites.length;

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" size="large">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" >
            Pokedex
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              onClick={() => push('/favoritos')}
              color="inherit"
            >
              <Badge badgeContent={favoritesCount} color="secondary">
                <Favorite />
              </Badge>
            </IconButton>
          </Box>
          {/* <Button variant="outlined" startIcon={<Favorite />}>
            Delete
          </Button> */}
        </Toolbar>
      </AppBar>
      {isRefetching && <LinearProgress color='secondary' />}

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