import * as React from "react";
import Layout from "../../components/layout";
import PostHead from "../../components/PostHead";
import PostEntry from "../../components/PostEntry";
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
            <PostEntry
              title={node.frontmatter.title}
              date={node.frontmatter.date}
            ></PostEntry>
          </Link>
          <br />
        </div>
      ))}
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
