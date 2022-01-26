import * as React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import Logo from "../atoms/Logo";
import S from "./style";
import GlobalStyle from "../../styles/global";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
      <GlobalStyle />
      <S.Container>
        <header>
          <S.Nav>
            <Logo routeHome></Logo>
          </S.Nav>
        </header>
        <main style={{ paddingTop: `50px`, maxWidth: `800px`, width: `100%` }}>
          {children}
        </main>
        <footer></footer>
      </S.Container>
    </>
  );
};

export default Layout;
