import { Favorite } from '@mui/icons-material';
import { AppBar, Toolbar, Typography, Container, Button, LinearProgress, Badge, Box, IconButton } from '@mui/material';
import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import { FavoriteContext } from '../favorites/contexts/FavoriteContext';
import { getPokemonDetails } from './services/getPokemonDetails';

interface PokemonDetailsProps {

}

interface PokemonQueryParams {
  name: string;
}

export const PokemonDetails: React.FC<PokemonDetailsProps> = () => {
  const { favorites, setFavorites } = useContext(FavoriteContext);
  const { goBack } = useHistory();
  const { name } = useParams<PokemonQueryParams>();

  const { data, isRefetching, isLoading } = useQuery(
    `pokemon-${name}`,
    () => getPokemonDetails(name),
    {
      cacheTime: 1000 * 60 * 60,
      staleTime: 20000,
    }
  );

  const selectedPokemonDetails = data;

  const addPokemonToFavorite = () => {
    if (!selectedPokemonDetails) return;
    setFavorites([...favorites, selectedPokemonDetails]);
  }

  const removePokemonFromFavorites = () => {
    if (!selectedPokemonDetails) return;
    setFavorites(favorites.filter((poke) => poke.name !== selectedPokemonDetails.name));
  }

  const isFavorite = favorites.some((poke) => poke.name === selectedPokemonDetails?.name);

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button onClick={goBack}>
            Voltar
          </Button>
          <Typography variant="h6" >
            {selectedPokemonDetails?.name}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton onClick={() => isFavorite ? removePokemonFromFavorites() : addPokemonToFavorite()} aria-label="add to favorites">
              <Favorite color={isFavorite ? `error` : `disabled`} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {isRefetching && <LinearProgress />}


      <Container>
        <img alt='' width='100%' src={selectedPokemonDetails?.sprites.front_default} />

        <Typography variant='h2'>{selectedPokemonDetails?.species.name}</Typography>

        <Typography>
          {selectedPokemonDetails?.types.map((type) => {
            return type.type.name;
          }).join(', ')}
        </Typography>

        <div>{selectedPokemonDetails?.height}</div>
        <div>{selectedPokemonDetails?.weight}</div>

        <div>{selectedPokemonDetails?.abilities.map((ability) => ability.ability.name).join(', ')}</div>
      </Container>
    </>
  );
};

export default PokemonDetails;