import styled from "styled-components";
import color from "../../../utils/Colors";

const InfoBanner = styled.div`
  margin: 50% 10%;
  padding: 16px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: ${color.blue[950]};
  background-color: ${color.blue[50]};
  border: solid 2px ${color.blue[700]};
`;

export default InfoBanner;
