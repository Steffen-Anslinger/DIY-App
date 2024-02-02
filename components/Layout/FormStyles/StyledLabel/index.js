import color from "../../Colors";
import styled from "styled-components";

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 600;
  color: ${color.grey[950]};
  width: 100%;
`;

export default StyledLabel;
