import color from "../../Colors";
import styled from "styled-components";

const StyledButton = styled.button`
  font-size: 14px;
  background-color: ${(props) =>
    props.$submit ? `${color.orange[600]}` : `${color.grey[200]}`};
  color: ${color.grey[950]};
  padding: 10px 20px;
  font-weight: 500;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${color.orange[700]};
  }
`;

export default StyledButton;
