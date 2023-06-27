import styled from 'styled-components';

export default {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 700px;
  `,
  LinkWrapper: styled.div`
    display: flex;
    justify-content: flex-end;

    & + & {
      margin-top: 0.5rem;
    }
  `,
  BigText: styled.span`
    font-size: 5rem;
    font-weight: 900;
  `,
  LinkToPosts: styled.span`
    font-size: 0.9rem;
  `,
};
