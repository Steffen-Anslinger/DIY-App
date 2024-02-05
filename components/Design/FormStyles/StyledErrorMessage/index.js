import color from "../../../../utils/Colors";
import styled from "styled-components";

const StyledErrorMessage = styled.div`
  color: ${color.red[600]};
  background-color: ${color.red[100]};
  margin-top: 4px;
  padding: 0px 8px;
  border-radius: 4px;
  font-size: 12px;
  display: flex;
  gap: 10px;
  align-items: center;
  height: fit-content;
`;

export default StyledErrorMessage;
