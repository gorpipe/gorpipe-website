import Link from "next/link";
import GORLogoOutlineText from "assets/GORLogoOutlineText.svg";

import style from "./Footer.scss";

const Footer = () => {
  return (
    <footer className={style.Footer}>
      <div className={style.Footer__wrapper}>
        <div className={style.Footer__sup}>
          <Link href="/">
            <a>
              <GORLogoOutlineText title="GOR" />
            </a>
          </Link>

          <section className={style.Footer__links}>
            <div className={style.Footer__links__group}>
              <p>Learn more</p>
              <ul>
                <li>
                  <a href="https://docs.gorpipe.org/">Documentation</a>
                </li>
                <li>
                  <Link href="/tutorials">
                    <a>Tutorials</a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className={style.Footer__links__group}>
              <p>Support</p>
              <ul>
                <li>
                  <a href="https://github.com/gorpipe/gor">GitHub</a>
                </li>
                <li>
                  <a href="https://github.com/gorpipe/gor/releases">Releases</a>
                </li>
                <li>
                  <a href="https://github.com/gorpipe/gor/issues">
                    Issue Tracker
                  </a>
                </li>
              </ul>
            </div>

            <div className={style.Footer__links__group}>
              <p>Company</p>
              <ul>
                <li>
                  <Link href="/">
                    <a>About</a>
                  </Link>
                </li>
                <li>
                  <Link href="/blog">
                    <a>Blog</a>
                  </Link>
                </li>
                <li>
                  <a href="https://gorpipe.slack.com">Contact</a>
                </li>
                <li>
                  <a href="https://forums.gorpipe.org">Community</a>
                </li>
              </ul>
            </div>
          </section>
        </div>

        <section className={style.Footer__sub}>
          © {new Date().getFullYear()} WuXi NextCODE
        </section>
      </div>
    </footer>
  );
};

export default Footer;
