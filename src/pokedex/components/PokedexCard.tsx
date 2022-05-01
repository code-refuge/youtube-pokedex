import { Card, CardMedia, CardHeader } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { PokemonDetail } from '../../pokemon/interfaces/PokemonDetail';

interface PokedexCardProps {
  pokemon: PokemonDetail;
}

const PokedexCard: React.FC<PokedexCardProps> = ({ pokemon }) => {
  const history = useHistory();

  function handleClick() {
    history.push(`/pokemon/${pokemon.name}`);
  }

  return (
    <Card onClick={handleClick}>
      <CardMedia
        component="img"
        alt={pokemon.name}
        height="140"
        image={pokemon.sprites.front_default}
        title={pokemon.name}
      />
      <CardHeader
        title={pokemon.name}
        subheader={pokemon.types.map((type) => type.type.name).join(', ')}
      />
    </Card>
  );
};

export default PokedexCard;