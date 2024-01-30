import color from "../../Colors";
import styled from "styled-components";

const StyledErrorMessage = styled.p`
  color: ${color.red[600]};
  background-color: ${color.red[100]};
  margin-top: 4px;
  padding: 8px;
  border-radius: 4px;
  font-size: 12px;
`;

export default StyledErrorMessage;
