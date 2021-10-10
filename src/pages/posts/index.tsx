import * as React from "react";
import Layout from "../../components/layout";
import PostHead from "../../components/PostHead";
import styled from "styled-components";
import { graphql, Link, PageProps } from "gatsby";

const PostListPage = (props: PageProps) => {
  const { allMarkdownRemark }: any = props.data;
  const { edges } = allMarkdownRemark;
  return (
    <Layout>
      {edges.map(({ node }: any, i: number) => (
        <div key={i}>
          <Link to={node.frontmatter.slug.split("/").slice(1).join("/")}>
            {node.frontmatter.title}
          </Link>
          <br />
        </div>
      ))}
    </Layout>
  );
};

export const pageQuery = graphql`
  {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            slug
          }
        }
      }
    }
  }
`;

export default PostListPage;
