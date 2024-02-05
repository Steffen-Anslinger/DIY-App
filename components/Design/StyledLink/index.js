import color from "../../../utils/Colors";
import styled from "styled-components";
import Link from "next/link";

const StyledLink = styled(Link)`
  font-size: 14px;
  font-weight: 500;

  color: ${color.grey[950]};
  text-decoration: none;
  background-color: ${color.grey[200]};
  padding: 8px 16px;
  margin: 5px 0px;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${color.grey[300]};
  }
`;

export default StyledLink;
