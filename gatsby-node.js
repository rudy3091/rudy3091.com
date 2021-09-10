exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              slug
            }
          }
          previous {
            frontmatter {
              slug
            }
          }
          next {
            frontmatter {
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
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/components/post.js`),
      context: { slug, next, prev },
    });
  });
};
