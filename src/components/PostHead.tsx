import * as React from "react";
import styled from "styled-components";

const PHContainer = styled.section`
`;

interface PostHeadProps {
  title: string;
  date?: string;
  children?: React.ReactNodeArray;
}

const PostHead: React.FC<PostHeadProps> = (props: PostHeadProps) => {
  return (
    <PHContainer>
      <h1>{props.title}</h1>
      {props.date ? <h4>{props.date}</h4> : ""}
    </PHContainer>
  );
};

export default PostHead;
