import * as React from 'react';
import Layout from '../../components/Layout';
import PostHead from '../../components/PostHead';
import PostEntry from '../../components/PostEntry';
import { graphql, Link, PageProps } from 'gatsby';

const PostListPage = (props: PageProps) => {
  const { allMarkdownRemark }: any = props.data;
  const { edges } = allMarkdownRemark;
  return (
    <Layout>
      <div>
        {edges.map(({ node }: any, i: number) => {
          const pathPrefix = node.frontmatter.date.split('-').join('/') + '/';
          return (
            <div key={i}>
              <Link to={pathPrefix + node.frontmatter.slug}>
                <PostEntry
                  title={node.frontmatter.title}
                  date={node.frontmatter.date}
                />
              </Link>
              <br />
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          frontmatter {
            title
            date
            slug
          }
        }
      }
    }
  }
`;

export default PostListPage;
