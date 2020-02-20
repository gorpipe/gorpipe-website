import { useRouter } from "next/router";
import Layout from "../../components/Layout";

import style from "./docs.scss";

const Docs = () => {
  const slug = useRouter().query.slug || "index.html";

  return (
    <Layout hideFooter>
      <div className={style.Docs}>
        <iframe id="docsframe" src={`/staticdocs/${slug}`} />
      </div>
    </Layout>
  );
};

export default Docs;
