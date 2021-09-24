import * as React from "react";
import Layout from "../../components/layout";
import PostHead from "../../components/PostHead";
import styled from "styled-components";
import { graphql, Link, PageProps } from "gatsby";

const PVContainer = styled.div`
  & a {
    color: #889;
    text-decoration: none;

    display: inline-block;
    line-height: 0.85;
    border-bottom: 2px solid #666688aa;
    transition: border-bottom 0.1s ease-in-out, line-height 0.1s ease-in-out;
  }

  & a:hover {
    line-height: 0;
    color: #334;
    border-bottom: 9px solid #66668888;
  }
`;

const PostViewPage = (props: PageProps) => {
  const { markdownRemark }: any = props.data;
  const { frontmatter, html } = markdownRemark;
  return (
    <Layout>
      <PVContainer>
        <div className="blog-post">
          <PostHead
            title={frontmatter.title}
            date={frontmatter.date ?? ""}
          ></PostHead>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </PVContainer>
    </Layout>
  );
};

export const pageQuery = graphql`
  query ($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "YYYY년 MM월 DD일")
        slug
        title
      }
    }
  }
`;
export default PostViewPage;
