import styled from "styled-components";
import Image from "next/image";
import color from "../Layout/Colors";

const Button = styled.button`
  border: none;
  max-width: 100px;
  background: ${color.orange[600]};
  border-radius: 5px;
  padding: 2.5px 10px;
  margin: 0;
  display: flex;
  justify-content: center;
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
        width={25}
        height={25}
      />
    </Button>
  );
}
