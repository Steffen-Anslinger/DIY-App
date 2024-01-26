import color from "../../Colors";
import styled from "styled-components";

const StyledSubmitButton = styled.button`
  font-size: 14px;
  background-color: ${color.orange[600]};
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${color.orange[700]};
  }
`;

export default StyledSubmitButton;
