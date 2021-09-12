import * as React from "react";
import Layout from "../components/layout";
import { Link } from "gatsby";

const IndexPage = () => {
  return (
    <>
      <Layout>
        <main>
          <div>hello world</div>
          <Link to="/test">go to test page</Link>
        </main>
      </Layout>
    </>
  );
};

export default IndexPage;
