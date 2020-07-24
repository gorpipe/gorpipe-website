import matter from "gray-matter";
import Link from "next/link";
import DocHead from "../components/DocHead";
import Layout from "../components/Layout";

import style from "./blog.module.scss";

const Blog = (props) => {
  return (
    <Layout>
      <DocHead title="Blog - GORpipe" />
      <div className={style.Blog}>
        <h1>Blog</h1>
        <ul className={style.Blog__postlist}>
          {props.posts.map((post) => (
            <PostLink
              key={post.slug}
              slug={post.slug}
              title={post.data.title}
              image={post.data.image}
            />
          ))}
        </ul>
      </div>
    </Layout>
  );
};

const PostLink = ({ slug, title, image }) => (
  <li className={style.Blog__postlist__item}>
    <Link href="/blog/[slug]" as={`/blog/${slug}`}>
      <a>
        <img src={image} alt={title} />
        <h2>{title}</h2>
      </a>
    </Link>
  </li>
);

Blog.getInitialProps = async () => {
  // read all posts from the blogposts folder
  const posts = ((context) => {
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
        slug,
      };
    });

    return data;
  })(require.context("../blogposts", true, /\.md$/));

  return {
    posts,
  };
};

export default Blog;
