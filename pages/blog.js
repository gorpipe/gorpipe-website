import matter from "gray-matter";
import Layout from "../components/Layout";
import Link from "next/link";

const PostLink = props => (
  <li>
    <Link href="/blog/[slug]" as={`/blog/${props.slug}`}>
      <a>{props.slug}</a>
    </Link>
  </li>
);

const Blog = props => {
  return (
    <Layout>
      <ul>
        {props.posts.map(post => (
          <PostLink key={post.slug} slug={post.slug} />
        ))}
      </ul>
    </Layout>
  );
};

Blog.getInitialProps = async () => {
  // read all posts from the blogposts folder
  const posts = (context => {
    const keys = context.keys();
    const values = keys.map(context);

    const data = keys.map((key, index) => {
      // create slug from filename
      const slug = key
        .replace(/^.*[\\\/]/, "")
        .split(".")
        .slice(0, -1)
        .join(".");

      const content = values[index];

      const file = matter(content.default);

      return {
        ...file,
        slug
      };
    });

    return data;
  })(require.context("../blogposts", true, /\.md$/));

  return {
    posts
  };
};

export default Blog;
