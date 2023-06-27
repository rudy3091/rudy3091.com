exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              date
              slug
            }
          }
          previous {
            frontmatter {
              date
              slug
            }
          }
          next {
            frontmatter {
              date
              slug
            }
          }
        }
      }
    }
  `);
  data.allMarkdownRemark.edges.forEach((edge) => {
    const slug = edge.node.frontmatter.slug;
    const prev = edge.previous?.frontmatter.slug;
    const next = edge.next?.frontmatter.slug;
    const pathPrefix = edge.node.frontmatter.date.split('-').join('/');
    actions.createPage({
      path: `posts/${pathPrefix}/${slug}`,
      component: require.resolve(`./src/pages/PostView/index.tsx`),
      context: { slug, next, prev },
    });
  });
};
