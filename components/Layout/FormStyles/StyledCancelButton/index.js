import color from "../../Colors";
import styled from "styled-components";

const StyledCancelButton = styled.button`
  font-size: 14px;
  background-color: ${color.grey[200]};
  color: ${color.grey[950]};
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: ${color.grey[300]};
  }
`;

export default StyledCancelButton;
