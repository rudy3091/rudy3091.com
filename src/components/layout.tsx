import * as React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { useStaticQuery, graphql, PageProps } from "gatsby";

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
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <header>
          <nav
            style={{
              height: `50px`,
              backgroundColor: `#d4a3b2`,
            }}
          ></nav>
        </header>
        <main>{children}</main>
        <footer></footer>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
