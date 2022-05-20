import { Favorite } from '@mui/icons-material';
import { Card, CardMedia, CardHeader, CardActions, IconButton } from '@mui/material';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FavoriteContext } from '../../favorites/contexts/FavoriteContext';
import { PokemonDetail } from '../../pokemon/interfaces/PokemonDetail';

interface PokedexCardProps {
  pokemon: PokemonDetail;
}

const PokedexCard: React.FC<PokedexCardProps> = ({ pokemon }) => {
  const { setFavorites, favorites } = useContext(FavoriteContext);
  const history = useHistory();

  function handleClick() {
    history.push(`/pokemon/${pokemon.name}`);
  }

  const addPokemonToFavorite = () => {
    setFavorites([...favorites, pokemon]);
  }

  const removePokemonFromFavorites = () => {
    setFavorites(favorites.filter((poke) => poke.name !== pokemon.name));
  }

  const isFavorite = favorites.some((poke) => poke.name === pokemon.name);

  return (
    <Card>
      <CardMedia
        component="img"
        alt={pokemon.name}
        height="140"
        image={pokemon.sprites.front_default}
        title={pokemon.name}
        onClick={handleClick}
      />
      <CardHeader
        title={pokemon.name}
        subheader={pokemon.types.map((type) => type.type.name).join(', ')}
      />
      <CardActions disableSpacing>
        <IconButton onClick={() => isFavorite ? removePokemonFromFavorites() : addPokemonToFavorite()} aria-label="add to favorites">
          <Favorite color={isFavorite ? `error` : `disabled`} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PokedexCard;