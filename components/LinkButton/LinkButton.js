import Arrow from "assets/arrow.svg";

import style from "./LinkButton.scss";

const LinkButton = ({ href, title, text }) => {
  return (
    <a href={href} title={title} className={style.LinkButton}>
      {text}
      <Arrow />
    </a>
  );
};

export default LinkButton;
