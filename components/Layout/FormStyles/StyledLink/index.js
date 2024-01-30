import color from "../../Colors";
import styled from "styled-components";
import Link from "next/link";

const StyledLink = styled(Link)`
  font-size: 14px;
  font-weight: 500;
  color: ${color.grey[950]};
  text-decoration: none;
  margin-right: 10px;
  background-color: ${color.grey[200]};
  padding: 10px 20px;
  border-radius: 5px;
  display: inline-block;

  &:hover {
    background-color: ${color.grey[300]};
  }
`;

export default StyledLink;
