import * as React from "react";
import Layout from "../../components/layout";
import PostHead from "../../components/PostHead";
import styled from "styled-components";
import { graphql, Link, PageProps } from "gatsby";

const PVContainer = styled.div`
  padding: 1rem;
  color: #224;

  & a {
    color: #889;
    text-decoration: underline;
    text-decoration-color: #66668888;
    word-break: break-all;

    display: inline-block;
    border-bottom: 1px solid transparent;
    transition: color 0.3s ease;
  }

  & a:hover {
    color: #334;
  }

  & h1 {
    margin: 2rem 0 1rem 0;
    font-size: 2rem;
  }

  & h2 {
    margin: 2rem 0 1rem 0;
  }

  & h3 {
    margin: 1.5rem 0 0.75rem 0;
  }

  & p {
    margin: 1.25rem 0;
    line-height: 2rem;
  }

  & li {
    margin: 1rem 0;
  }

  & code {
    padding: 0.2rem;
    border-radius: 4px;
    background-color: #f0f0ff;
    color: #86f;
  }

  /* codeblock */
  & pre {
    padding: 1.75rem;
    border-radius: 4px;
    background-color: #f6f6f8;
    overflow: scroll;
    line-height: 1.25rem;
    font-size: 0.9rem;

    & code {
      padding: 0;
      background-color: inherit;
      color: inherit;
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }

  & em, & strong {
    color: #45a;
  }

  & blockquote {
    padding: 1rem 1.5rem;
    margin: 1.25rem 0;
    border-left: 5px solid #227;
    background-color: #f6f6f8;

    & p {
      margin: 0;
    }
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
