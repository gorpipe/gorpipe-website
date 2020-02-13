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

      <div>
        Learn more
        <ul>
          <li>
            <a>Documentation</a>
          </li>
          <li>
            <a>Tutorials</a>
          </li>
        </ul>
      </div>

      <div>
        Legal
        <ul>
          <li>
            <a>Terms</a>
          </li>
          <li>
            <a>Privacy</a>
          </li>
        </ul>
      </div>

      <div>
        Support
        <ul>
          <li>
            <a>GitHub</a>
          </li>
          <li>
            <a>Release Notes</a>
          </li>
          <li>
            <a>Issue Tracker</a>
          </li>
        </ul>
      </div>

      <div>
        Company
        <ul>
          <li>
            <a>About</a>
          </li>
          <li>
            <a>Blog</a>
          </li>
          <li>
            <a>Contact</a>
          </li>
          <li>
            <a>Community</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
