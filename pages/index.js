import Link from "next/link";
import Layout from "../components/Layout";

import style from "./index.scss";

const Index = () => {
  return (
    <Layout>
      <section className={style.Index__header}>
        <div className={style.Index__wrapper}>
          <h1>Open Source Genomic Insights at Scale</h1>
          <p className={style.Index__header__byline}>
            Born at{" "}
            <a href="https://www.decode.com/">
              <strong>deCODE genetics</strong>
            </a>
            , the pioneers for population scale genomic research. Raised by{" "}
            <a href="https://www.wuxinextcode.com">
              <strong>WuXi NextCODE</strong>
            </a>
            , the global genomics data and insights partner.
          </p>
          <div className={style.Index__header__logos}>
            <div className={style.Index__header__logo}>
              <img src="/ie-logo.png" title="deCODE genetics corporate logo" />
            </div>
            <div className={style.Index__header__logo}>
              <img src="/ie-logo.png" title="deCODE genetics corporate logo" />
            </div>
          </div>
          <div className={style.Index__header__callouts}>
            <Link href="/download">
              <a className={style.Index__header__callout}>Download</a>
            </Link>
            <Link href="/docs">
              <a className={style.Index__header__callout}>Documentation</a>
            </Link>
          </div>
        </div>
      </section>

      <section className={style.Index__quicklinks}>
        <div className={style.Index__wrapper}>
          <ul>
            <li>
              <Link href="https://github.com/gorpipe/gorpipe">
                <a>
                  <img
                    src="/jupyter-logo.png"
                    alt="Download GORpipe source code"
                    height="220"
                    width="220"
                  />
                  <p>Download source</p>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/download">
                <a>
                  <img
                    src="/code.png"
                    alt="Setup GORpipe command line interface"
                    height="220"
                    width="220"
                  />
                  <p>Setup GORpipe CLI</p>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/download">
                <a>
                  <img
                    src="/sm.png"
                    alt="Download GORpipe desktop application, Sequence Miner"
                    height="220"
                    width="220"
                  />
                  <p>GORpipe desktop application</p>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section>
        <div>
          <h2>Advanced query tool for bioinformaticians</h2>
          <p>
            Work with genomic and phenotypic tabular data using declarative
            relational query language in a parallel execution engine.
          </p>
        </div>
        <div>
          <h2>Genomic ordered data architecture</h2>
          <p>
            Efficient data structures and commands for genomic analysis
            use-cases, such as range-queries and table joins.
          </p>
        </div>
        <div>
          <h2>GORpipe query syntax</h2>
          <p>
            Combines the best of SQL and Unix shell pipe syntax, supporting
            seek-able nested queries, materialized views, and a rich set of
            commands and functions.
          </p>
        </div>
        <div>
          <h2>Support for external commands</h2>
          <p>Define new commands using JVM language or shell scripts.</p>
        </div>
        <div>
          <h2>Compatible with standard formats</h2>
          <p>BAM, CRAM, VCF, Tabix, TSV, CSV.</p>
        </div>
        <div>
          <h2>Stored procedures</h2>
          <p>Setup parameterized functions using YML and FreeMarker scripts.</p>
        </div>
      </section>

      <section>
        <h2>Integration with Spark</h2>
        <p>
          Leverage the Spark execution engine, Scala and Python SDK and the
          Parque columnar strorage format.
        </p>
      </section>
    </Layout>
  );
};

export default Index;
