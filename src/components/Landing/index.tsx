import React from 'react';
import { Link } from 'gatsby';
import S from './style';

const Landing = () => {
  return (
    <S.Container>
      <div>
        <S.BigText>Kim Hyeon Min</S.BigText>
        <S.LinkWrapper>
          <Link to="/posts">
            <S.LinkToPosts>posts(link)</S.LinkToPosts>
          </Link>
        </S.LinkWrapper>
      </div>
    </S.Container>
  );
};

export default Landing;
