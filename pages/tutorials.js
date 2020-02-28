import Link from "next/link";
import Layout from "../components/Layout";
import DocHead from "../components/DocHead";

import style from "./tutorials.scss";

const Tutorials = () => {
  return (
    <Layout>
      <DocHead title="Tutorials - GORpipe" />
      <div className={style.Tutorials}>
        <h2>Tutorials</h2>
        <ul>
          <li>
            <a href="/tutorials/gor-and-nor">GOR and NOR</a>
          </li>
          <li>
            <a href="/tutorials/phenotypes">Phenotypes</a>
          </li>
        </ul>
      </div>
    </Layout>
  );
};

export default Tutorials;
