import { useEffect } from "react";
import Link from "next/link";
import Layout from "../components/Layout";

import style from "./index.scss";

const Index = () => {
  useEffect(() => {
    // We only want to run random value code on the client.
    // Else we can get a next.js console log because different values on server and client renders.
    // Thus run in useEffect, which only runs on the client.
    document.body.classList.add("bg" + Math.ceil(Math.random() * 2));
  }, []);

  return (
    <Layout>
      <section id="hero" className={style.Index__header}>
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
            <a
              className={style.Index__header__logo}
              href="https://www.decode.com/"
            >
              <img src="/ie-logo.png" title="deCODE genetics corporate logo" />
            </a>
            <a
              className={style.Index__header__logo}
              href="https://www.wuxinextcode.com"
            >
              <img src="/ie-logo.png" title="deCODE genetics corporate logo" />
            </a>
          </div>
          <div className={style.Index__header__callouts}>
            <Link href="/downloads">
              <a className={style.Index__header__callout}>Download</a>
            </Link>

            <a className={style.Index__header__callout} href="/docs/index.html">
              Documentation
            </a>
          </div>
        </div>
      </section>

      <section className={style.Index__quicklinks}>
        <div className={style.Index__wrapper}>
          <ul>
            <li>
              <a href="https://github.com/gorpipe/gor">
                <img
                  src="/code.png"
                  alt="Download GORpipe source code"
                  height="220"
                  width="220"
                />
                <p>Download source</p>
              </a>
            </li>
            <li>
              <Link href="/downloads">
                <a>
                  <img
                    src="/gor-cli.png"
                    alt="Setup GORpipe command line interface"
                    height="220"
                    width="220"
                  />
                  <p>Setup GORpipe CLI</p>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/downloads">
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

      <div className={style.Index__wrapper}>
        <section className={style.Index__bullets}>
          <div className={style.Index__bullets__item}>
            <h2>Advanced query tool for bioinformaticians</h2>
            <p>
              Work with genomic and phenotypic tabular data using declarative
              relational query language in a parallel execution engine.
            </p>
          </div>
          <div className={style.Index__bullets__item}>
            <h2>Genomic ordered data architecture</h2>
            <p>
              Efficient data structures and commands for genomic analysis
              use-cases, such as range-queries and table joins.
            </p>
          </div>
          <div className={style.Index__bullets__item}>
            <h2>GORpipe query syntax</h2>
            <p>
              Combines the best of SQL and Unix shell pipe syntax, supporting
              seek-able nested queries, materialized views, and a rich set of
              commands and functions.
            </p>
          </div>
          <div className={style.Index__bullets__item}>
            <h2>Support for external commands</h2>
            <p>Define new commands using JVM language or shell scripts.</p>
          </div>
          <div className={style.Index__bullets__item}>
            <h2>Compatible with standard formats</h2>
            <p>BAM, CRAM, VCF, Tabix, TSV, CSV.</p>
          </div>
          <div className={style.Index__bullets__item}>
            <h2>Stored procedures</h2>
            <p>
              Setup parameterized functions using YML and FreeMarker scripts.
            </p>
          </div>
        </section>
      </div>

      <div className={style.Index__wrapper}>
        <section className={style.Index__spark}>
          <h2>Integration with Spark</h2>
          <p>
            Leverage the Spark execution engine, Scala and Python SDK and the
            Parque columnar strorage format.
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
