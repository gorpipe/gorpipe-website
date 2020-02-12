import Link from "next/link";
import GORLogoOutlineText from "assets/GORLogoOutlineText.svg";

import style from "./Footer.scss";

const Footer = () => {
  return (
    <footer className={style.Footer}>
      <Link href="/">
        <a>
          <GORLogoOutlineText title="GOR" />
        </a>
      </Link>
    </footer>
  );
};

export default Footer;
