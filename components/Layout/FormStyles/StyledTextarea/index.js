import color from "../../Colors";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid ${color.grey[300]};
  border-radius: 4px;
  box-sizing: border-box;
`;

export default StyledTextarea;
