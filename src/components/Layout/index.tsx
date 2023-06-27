import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { ThemeProvider } from 'styled-components';
import Logo from '../atoms/Logo';
import S from './style';
import GlobalStyle from '../../styles/global';
import theme from '../../styles/theme';

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
      <ThemeProvider theme={theme}>
        <S.Container>
          <header>
            <S.Nav>
              <Logo routeHome></Logo>
            </S.Nav>
          </header>
          <S.Main>{children}</S.Main>
          <S.Footer>(C) {new Date().getFullYear()} @rudy3091</S.Footer>
        </S.Container>
      </ThemeProvider>
    </>
  );
};

export default Layout;
