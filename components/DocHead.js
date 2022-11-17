import Head from "next/head";

const defaults = {
  title: "GORpipe",
  description: "Genomic Insights at Scale",
  shareImg: "/gor-pipe-share-img.png",
};

const DocHead = (props) => {
  const options = { ...defaults, ...props };

  return (
    <Head>
      <title>{options.title}</title>

      <meta
        key="description"
        name="description"
        content={options.description}
      />

      <meta key="og:title" property="og:title" content={options.title} />
      <meta
        key="og:description"
        property="og:description"
        content={options.description}
      />
      <meta key="og:image" property="og:image" content={options.shareImg} />

      <meta name="twitter:title" content={options.title} />
      <meta name="twitter:description" content={options.description} />
      <meta name="twitter:image" content={options.shareImg} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@genuitysci" />
      <meta name="twitter:creator" content="@genuitysci" />

    </Head>
  );
};

export default DocHead;
