import styled from 'styled-components';

export default {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
  `,
  Nav: styled.nav`
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 50px;

    backdrop-filter: blur(10px);
    z-index: 9;
  `,
  Main: styled.main`
    display: block;
    position: relative;

    max-width: 800px;
    width: 100%;
    padding-top: 50px;
  `,
  Footer: styled.footer`
    display: flex;
    justify-content: center;
    font-size: 0.75rem;

    width: 100%;
    padding: 0.5rem;
  `,
};
