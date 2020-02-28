import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";

import style from "../blog.scss";

const Post = props => {
  const { title, author, date, image } = props.data;

  const dateObj = new Date(date);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(dateObj);

  return (
    <Layout>
      <div className={style.Blog}>
        <article>
          <h1>{title}</h1>
          <div className={style.Blog__post__meta}>
            <p className={style.Blog__post__meta__author}>
              by <span>{author}</span>
            </p>
            <p className={style.Blog__post__meta__date}>{formattedDate}</p>
          </div>
          <section className={style.Blog__post}>
            <img className={style.Blog__post__image} src={image} alt={title} />
            <div className={style.Blog__post__content}>
              <ReactMarkdown>{props.content}</ReactMarkdown>
            </div>
          </section>
        </article>
      </div>
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
