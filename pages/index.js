import { useEffect } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import GSLogo from "assets/GSLogo.svg";

import style from "./index.module.scss";

const Index = () => {
  useEffect(() => {
    // We only want to run random value code on the client.
    // Else we can get a next.js console log because different values on server and client renders.
    // Thus run in useEffect, which only runs on the client.
    document.body.classList.add("bg" + Math.ceil(Math.random() * 4));
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
            <a href="https://www.genuitysci.com">
              <strong>Genuity Science</strong>
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
              href="https://www.genuitysci.com"
            >
              <GSLogo title="Genuity Science corporate logo" />
            </a>
          </div>
          <div className={style.Index__header__callouts}>
            <a
              className={style.Index__header__callout}
              href="https://github.com/gorpipe/gor#prerequisites"
            >
              Download
            </a>

            <a
              className={style.Index__header__callout}
              href="https://docs.gorpipe.org/"
            >
              Documentation
            </a>
          </div>
        </div>
      </section>

      <div className={style.Index__wrapper}>
        <section className={style.Index__spark}>
          <h2>Integration with Spark</h2>
          <p>
            Leverage the Spark execution engine, Scala and Python SDK and SQL
            with the Parque columnar storage format.
          </p>
          <ul className={style.Index__spark__callouts}>
            <li>
              <a href="https://arxiv.org/abs/2009.00061" target="_blank">Read the paper</a>
            </li>
            <li>
              <a href="https://github.com/gorpipe/sparkgor" target="_blank">Check out the code</a>
            </li>
            <li>
              <a href="https://colab.research.google.com/drive/1hLNYrO2QeYV26dKi8v-HeYG8K1kkgIVD" target="_blank">Try on Google Colab</a>
            </li>
          </ul>
        </section>
      </div>

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
                <p>Source on GitHub</p>
              </a>
            </li>
            <li>
              <a href="https://github.com/gorpipe/gor/releases">
                <img
                  src="/gor-cli.png"
                  alt="Download GORpipe command line interface"
                  height="220"
                  width="220"
                />
                <p>Get GORpipe</p>
              </a>
            </li>
            <li>
              <Link href="/desktop">
                <a>
                  <img
                    src="/sm.png"
                    alt="Download GORpipe desktop application, Sequence Miner"
                    height="220"
                    width="220"
                  />
                  <p>Install desktop application</p>
                </a>
              </Link>
            </li>
          </ul>
          <p className={style.Index__quicklinks__text}>
            GORpipe allows analysis of large sets of genomic and phenotypic
            tabular data using a declarative query language in a parallel
            execution engine.
          </p>
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

      
    </Layout>
  );
};

export default Index;
