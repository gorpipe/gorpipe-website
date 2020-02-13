import Link from "next/link";
import Layout from "../components/Layout";

const Index = () => {
  return (
    <Layout>
      <section>
        <h1>Open Source Genomic Insights at Scale</h1>
        <p>
          Born at <strong>deCODE genetics</strong>, the pioneers for population
          scale genomic research. Raised by <strong>WuXi NextCODE</strong>, the
          global genomics data and insights partner.
        </p>
        <Link href="/download">
          <a>Download</a>
        </Link>
        <Link href="/docs">
          <a>Documentation</a>
        </Link>
      </section>

      <section>
        <ul>
          <li>
            <Link href="/download">
              <a>Download source</a>
            </Link>
          </li>
          <li>
            <Link href="/docs">
              <a>Setup GORpipe</a>
            </Link>
          </li>
          <li>
            <Link href="/docs">
              <a>Run GORpipe for desktop application</a>
            </Link>
          </li>
        </ul>
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
