import Head from "next/head";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

import s from "./Layout.scss";

const Layout = props => (
  <div className={s.Layout}>
    <Head>
      <title key="defaulttitle">GORpipe</title>

      <meta
        key="defaultdesc"
        name="description"
        content="Genomic Insights at Scale"
      />
    </Head>
    <Header />
    <main className={s.Layout__main}>{props.children}</main>
    <Footer />
  </div>
);

export default Layout;
