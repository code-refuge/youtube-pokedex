import { AppBar, Toolbar, Typography, Container, Button, LinearProgress } from '@material-ui/core';
import React from 'react';
import { useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import { getPokemonDetails } from './services/getPokemonDetails';

interface PokemonDetailsProps {

}

interface PokemonQueryParams {
  name: string;
}

export const PokemonDetails: React.FC<PokemonDetailsProps> = () => {
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