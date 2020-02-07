import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";

const Post = props => {
  const { title, author } = props.data;

  return (
    <Layout>
      <article>
        <h1>{title}</h1>
        <p>{author}</p>
        <ReactMarkdown>{props.content}</ReactMarkdown>
      </article>
    </Layout>
  );
};

Post.getInitialProps = async ctx => {
  const { slug } = ctx.query;
  const content = await import(`../../blogposts/${slug}.md`);
  const file = matter(content.default);
  return { ...file };
};

export default Post;
