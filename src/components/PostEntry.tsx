import * as React from "react";
import styled from "styled-components";

const EntryContainer = styled.section`
  padding: 1rem;
  margin: 0.5rem 0rem;
  color: #224;
  transition: box-shadow 0.3s ease,
    transform 0.3s ease;

  &:hover {
    transform: translateX(10px);
    box-shadow: -10px 0px #224;
  }
`;

const DateWrapper = styled.h4`
  margin-top: 1rem;
`;

interface PostEntryProps {
  title: string;
  date?: string;
  children?: React.ReactNodeArray;
}

const PostEntry: React.FC<PostEntryProps> = (props: PostEntryProps) => {
  return (
    <EntryContainer>
      <h2>{props.title}</h2>
      {props.date ? <DateWrapper>{props.date}</DateWrapper> : ""}
    </EntryContainer>
  );
};

export default PostEntry;
