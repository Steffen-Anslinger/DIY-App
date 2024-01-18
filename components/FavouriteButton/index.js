import styled from "styled-components";
import Image from "next/image";

const Button = styled.button`
  border: none;
  max-width: 100px;
  /* padding: 0 0 0 0;
  margin: 0 0 0 0;
  display: flex;
  justify-content: center;
  align-items: right; */
  /* position: absolute; */
  /* top: -10px;
  right: 5em; */
  scale: 200%;
  background: transparent;
  cursor: pointer;
`;

export default function FavouriteButton({ isFavorite, onClick }) {
  return (
    <Button type="button" onClick={onClick}>
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
