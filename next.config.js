const path = require("path");
const glob = require("glob");
const sass = require("@zeit/next-sass");
const reactSvg = require("next-react-svg");
const plugins = require("next-compose-plugins");

const config = {
  poweredByHeader: false,

  webpack: function(config) {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader"
    });

    config.resolve.modules = [path.resolve(__dirname, ""), "node_modules"];

    return config;
  },

  // this is a routes map for the static export
  exportPathMap: function() {
    // when a new page is created, it must be added here
    const routes = {
      "/": { page: "/" },
      "/blog": { page: "/blog" }
    };

    // below is the dynamic mapping of all blog posts in the blogposts directory

    // get all .md files in the posts dir
    const blogPosts = glob.sync("blogposts/*.md");

    // remove path and extension to leave filename only
    const blogSlugs = blogPosts.map(file =>
      file
        .split("/")[1]
        .replace(/ /g, "-")
        .slice(0, -3)
        .trim()
    );

    // Add blogs to the routes map
    blogSlugs.forEach(blog => {
      routes[`/blog/${blog}`] = { page: "/blog/[slug]", query: { slug: blog } };
    });

    return routes;
  }
};

module.exports = plugins(
  [
    [
      sass,
      {
        cssModules: true,
        cssLoaderOptions: {
          importLoaders: 1,
          localIdentName: "[local]___[hash:base64:5]"
        }
      }
    ],

    [reactSvg, { include: path.resolve(__dirname, "assets") }]
  ],
  config
);
