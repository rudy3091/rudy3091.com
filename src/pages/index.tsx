import * as React from "react";
import Layout from "../components/layout";
import { Link } from "gatsby";

const IndexPage = () => {
  return (
    <Layout>
      <div className="index-container" style={{ width: `100%` }}>
        <div>hello world</div>
        <Link to="/test">go to test page</Link>
      </div>
    </Layout>
  );
};

export default IndexPage;
