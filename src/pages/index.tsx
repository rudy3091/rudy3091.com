import * as React from 'react';
import Layout from '../components/Layout';
import Landing from '../components/Landing';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.black};
`;

const IndexPage = () => {
  return (
    <Layout>
      <Container>
        <Landing />
      </Container>
    </Layout>
  );
};

export default IndexPage;
