import * as React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { useStaticQuery, graphql, PageProps } from "gatsby";
import Logo from "./atoms/Logo";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 50px;

  backdrop-filter: blur(10px);
  z-index: 9;
`;

const Layout: React.FC<PageProps> = ({ children }: PageProps) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Helmet title={data.site.siteMetadata.title} />
      <style>
        {`
          html,
          body {
            margin: 0;
            padding: 0;
          }
        `}
      </style>
      <MainContainer>
        <header>
          <Nav>
            <Logo routeHome></Logo>
          </Nav>
        </header>
        <main style={{ paddingTop: `50px`, maxWidth: `960px`, width: `100%` }}>
          {children}
        </main>
        <footer></footer>
      </MainContainer>
    </>
  );
};

export default Layout;
