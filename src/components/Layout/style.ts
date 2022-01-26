import styled from "styled-components";

export default {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
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
};
