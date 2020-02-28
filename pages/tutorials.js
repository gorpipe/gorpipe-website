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
            <Link href="/tutorial/gor-and-nor">
              <a>GOR and NOR</a>
            </Link>
          </li>
          <li>
            <Link href="/tutorial/phenotypes">
              <a>Phenotypes</a>
            </Link>
          </li>
        </ul>
      </div>
    </Layout>
  );
};

export default Tutorials;
