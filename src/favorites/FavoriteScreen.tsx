import { AppBar, Toolbar, IconButton, Typography, Container, Grid } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import React, { useContext } from 'react';

import { FavoriteContext } from '../favorites/contexts/FavoriteContext';
import PokedexCard from '../pokedex/components/PokedexCard';

interface FavoriteScreenProps {

}

const FavoriteScreen: React.FC<FavoriteScreenProps> = () => {
  const { favorites } = useContext(FavoriteContext);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" size="large">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" >
            FavoriteScreen
          </Typography>
        </Toolbar>
      </AppBar>

      <Container>
        <div style={{ marginTop: `1em` }}>
          <Grid container spacing={2}>
            {favorites?.map((pokemon) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.name}>
                <PokedexCard pokemon={pokemon} />
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default FavoriteScreen;