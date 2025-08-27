const path = require("path");
const glob = require("glob");
const reactSvg = require("next-react-svg");
const plugins = require("next-compose-plugins");

const config = {
  poweredByHeader: false,
  output: 'export',

  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  name: 'removeViewBox',
                  active: false,
                },
              ],
            },
          },
        },
      ],
    });

    config.resolve.modules = [path.resolve(__dirname, ""), "node_modules"];

    return config;
  },

  // this is a routes map for the static export
  exportPathMap: function () {
    // when a new page is created, it must be added here
    const routes = {
      "/": { page: "/" },
      "/blog": { page: "/blog" },
      "/desktop": { page: "/desktop" },
      "/tutorials": { page: "/tutorials" },
    };

    // below is the dynamic mapping of all blog posts in the blogposts directory

    // get all .md files in the posts dir
    const blogPosts = glob.sync("blogposts/*.md");

    // remove path and extension to leave filename only
    const blogSlugs = blogPosts.map((file) =>
      file.split("/")[1].replace(/ /g, "-").slice(0, -3).trim()
    );

    // Add blogs to the routes map
    blogSlugs.forEach((blog) => {
      routes[`/blog/${blog}`] = { page: "/blog/[slug]", query: { slug: blog } };
    });

    // get tutorial files
    const tutorials = glob.sync("public/tutorialfiles/*.html");

    // remove path and extension to leave filename only
    const tutorialSlugs = tutorials.map((file) =>
      file.split("/")[2].replace(/ /g, "-").slice(0, -5).trim()
    );

    // Add tutorials to the routes map
    tutorialSlugs.forEach((tutorial) => {
      routes[`/tutorials/${tutorial}`] = {
        page: "/tutorials/[slug]",
        query: { slug: tutorial },
      };
    });

    return routes;
  },
};

module.exports = plugins(
      [[reactSvg, {include: path.resolve(__dirname, "assets") }]],
      config
  );
