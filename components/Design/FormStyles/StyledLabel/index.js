import color from "../../../../utils/Colors";
import styled from "styled-components";

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: 600;
  color: ${color.grey[950]};
  width: 100%;
  line-height: 30px;
`;

export default StyledLabel;