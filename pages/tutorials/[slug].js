import { useState, useEffect } from "react";
import Layout from "../../components/Layout";

import style from "../tutorials.module.scss";

const Tutorial = ({ slug }) => {
  const [height, setHeight] = useState("100vh");

  useEffect(() => {
    const frame = document.getElementById("tutframe");

    frame.addEventListener("load", () => {
      const divHeight =
        frame.contentWindow.document
          .getElementById("notebook")
          .getBoundingClientRect().height + 50;

      setHeight(divHeight + "px");
    });
  }, []);

  return (
    <Layout>
      <div className={style.Tutorial}>
        <iframe
          id="tutframe"
          src={`/tutorialfiles/${slug}.html`}
          style={{ height: height }}
        />
      </div>
    </Layout>
  );
};

Tutorial.getInitialProps = async (ctx) => {
  const { slug } = ctx.query;
  return { slug };
};

export default Tutorial;
