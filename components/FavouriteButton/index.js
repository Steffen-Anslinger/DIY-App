import styled, { keyframes } from "styled-components";
import Image from "next/image";

const pulsateAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const Button = styled.button`
  border: none;
  max-width: 100px;
  background: none;
  border-radius: 5px;
  margin: 0;
  display: flex;
  justify-content: center;
  cursor: pointer;
  &:hover {
    animation: ${pulsateAnimation} 1s infinite;
  }
`;

export default function FavouriteButton({
  onToggleFavourite,
  favourites = [],
  id,
}) {
  const findFavourite = favourites.find((favourite) => favourite.id === id);
  const isFavourite = findFavourite ? findFavourite.isFavourite : false;
  return (
    <Button type="button" onClick={(event) => onToggleFavourite(id, event)}>
      <Image
        src={
          isFavourite
            ? "/assets/favorite_FILL1_wght400_GRAD0_opsz24.svg"
            : "/assets/favorite_FILL0_wght400_GRAD0_opsz24.svg"
        }
        alt="Favorite Button"
        width={30}
        height={30}
      />
    </Button>
  );
}
