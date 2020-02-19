import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

import style from "./tutorial.scss";

const Tutorial = () => {
  const [height, setHeight] = useState("100vh");
  const slug = useRouter().query.slug;

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
          src={`/tutorials/${slug}.html`}
          style={{ height: height }}
        />
      </div>
    </Layout>
  );
};

export default Tutorial;
