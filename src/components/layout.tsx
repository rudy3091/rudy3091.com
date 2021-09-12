import * as React from "react"
import { Helmet } from 'react-helmet';
import PropTypes from "prop-types"
import { useStaticQuery, graphql, PageProps } from "gatsby"

const Layout = ({ children }: PageProps) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Helmet title={data.site.siteMetadata.title}/>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer></footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
