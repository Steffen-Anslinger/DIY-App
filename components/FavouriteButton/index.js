import styled from "styled-components";
import Image from "next/image";

const Button = styled.button`
  border: none;
  max-width: 100px;
  scale: 200%;
  background: orange;
  border-radius: 5px;
  padding: 0;
  margin: 0;
  display: flex;
  position: absolute;
  top: 15px;
  left: 85%;
  cursor: pointer;
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
        width={15}
        height={15}
      />
    </Button>
  );
}
