import styled from "styled-components";
import color from "../../Colors";

const StyledFieldset = styled.fieldset`
  margin-top: 20px;
  border: 1px solid ${color.grey[300]};
  border-radius: 10px;
  padding: 15px;
  display: flex;
  flex-wrap: wrap;
`;

export default StyledFieldset;
