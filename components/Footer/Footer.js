import Link from "next/link";
import GORLogoOutlineText from "assets/GORLogoOutlineText.svg";

import style from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={style.Footer}>
      <div className={style.Footer__wrapper}>
        <div className={style.Footer__sup}>
          <Link href="/">
            <GORLogoOutlineText title="GOR" />
          </Link>

          <section className={style.Footer__links}>
            <div className={style.Footer__links__group}>
              <p>Learn more</p>
              <ul>
                <li>
                  <a href="https://docs.gorpipe.org/">Documentation</a>
                </li>
                <li>
                  <a href="/blog">Blog</a>
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
                  <a href="https://genedx.com/about/">About</a>
                </li>
                <li>
                  <a href="https://genedx.com/blog/">Blog</a>
                </li>
              </ul>
            </div>
          </section>
        </div>

        <section className={style.Footer__sub}>
          © {new Date().getFullYear()} GeneDx
        </section>
      </div>
    </footer>
  );
};

export default Footer;
