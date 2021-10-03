import * as React from "react";
import { Link } from "gatsby";
import styled from 'styled-components';
import SvgLogo from '../../images/logo.svg';

const LogoContainer = styled.div`
  height: 100%;

  & > a {
    display: flex;
    align-items: center;
    position: absolute;

    height: 50px;

    color: inherit;
    text-decoration: none;
  }

  & img {
    margin-left: 1rem;
  }
`

export interface LogoProps {
  routeHome?: boolean;
}

const Logo: React.FC<LogoProps> = (props: LogoProps) => {
  return (
    <LogoContainer>
      <Link to={props.routeHome ? "/" : ""}>
        <img src={SvgLogo} alt="logo" height="100%" />
      </Link>
    </LogoContainer>
  );
};

export default Logo;
