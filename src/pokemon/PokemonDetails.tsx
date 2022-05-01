import { AppBar, Toolbar, Typography, Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PokemonDetail } from './interfaces/PokemonDetail';
import { getPokemonDetails } from './services/getPokemonDetails';

interface PokemonDetailsProps {

}

interface PokemonQueryParams {
  name: string;
}

export const PokemonDetails: React.FC<PokemonDetailsProps> = () => {
  const { name } = useParams<PokemonQueryParams>();
  const [selectedPokemonDetails, setSelectedPokemonDetails] = useState<PokemonDetail | undefined>(undefined);

  useEffect(() => {
    getPokemonDetails(name).then((response) => {
      setSelectedPokemonDetails(response);
    })
  }, [name]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" >
            {selectedPokemonDetails?.name}
          </Typography>
        </Toolbar>
      </AppBar>
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