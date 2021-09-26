import * as React from "react";
import Layout from "../../components/layout";
import PostHead from "../../components/PostHead";
import styled from "styled-components";
import { graphql, Link, PageProps } from "gatsby";

const PVContainer = styled.div`
  & a {
    color: #889;
    text-decoration: underlined;
    text-decoration-color: #66668888;

    display: inline-block;
    border-bottom: 1px solid transparent;
    transition: color 0.3s ease;
  }

  & a:hover {
    color: #334;
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
  query ($slug: String) {
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
