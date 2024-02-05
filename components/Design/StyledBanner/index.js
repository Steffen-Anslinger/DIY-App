import styled, { css } from "styled-components";
import color from "../../../utils/Colors";

const baseBannerStyles = css`
  margin: 50% 10%;
  padding: 16px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const warningBannerStyles = css`
  color: ${color.red[950]};
  background-color: ${color.red[50]};
  border: solid 2px ${color.red[500]};
`;

const infoBanneStyles = css`
  color: ${color.blue[950]};
  background-color: ${color.blue[50]};
  border: solid 2px ${color.blue[700]};
`;

const StyledBanner = styled.div`
  ${baseBannerStyles}

  ${(props) =>
    props.type === "warning" &&
    css`
      ${warningBannerStyles}
    `}

  ${(props) =>
    props.type === "information" &&
    css`
      ${infoBanneStyles}
    `}
`;

export default StyledBanner;
