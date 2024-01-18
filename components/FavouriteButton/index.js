import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";

const Button = styled.button`
  border: none;
  max-width: 100px;
  scale: 200%;
  background: transparent;
  cursor: pointer;
`;

export default function FavoriteButton() {
  const [isFavorite, setFavoriteState] = useState(false);

  return (
    <Button
      onClick={() => {
        setFavoriteState(!isFavorite);
        console.log("favorite button clicked");
      }}
      aria-label="favorite"
    >
      <Image
        src={
          isFavorite
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

// export default function FavouriteButton({
//   isFavorite,
//   onToggleFavourite,
//   favourites,
//   slug,
// }) {
//   return (
//     <Button type="button" onClick={onToggleFavourite}>
//       <Image
//         src={
//           isFavorite
//             ? "/assets/favorite_FILL1_wght400_GRAD0_opsz24.svg"
//             : "/assets/favorite_FILL0_wght400_GRAD0_opsz24.svg"
//         }
//         alt="Favorite Button"
//         width={15}
//         height={15}
//       />
//     </Button>
//   );
// }
