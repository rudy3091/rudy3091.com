import * as React from "react";
import Layout from "../components/layout";
import { Link } from "gatsby";

const IndexPage = () => {
  return (
    <Layout>
      <div className="index-container" style={{ width: `100%` }}>
        <div>🙂</div>
        <Link to="/posts">posts</Link>
      </div>
    </Layout>
  );
};

export default IndexPage;
