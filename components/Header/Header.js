import { useState } from "react";
import cx from "classnames";
import Link from "next/link";
import GORLogoText from "assets/GORLogoText.svg";

import style from "./Header.scss";

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const headerClasses = cx(style.Header, {
    [style.Header_open]: isMenuOpen
  });

  return (
    <header className={headerClasses}>
      <div className={style.Header__wrapper}>
        <Link href="/">
          <a className={style.Header__logo}>
            <GORLogoText title="GOR" />
          </a>
        </Link>
        <nav className={style.Header__menu}>
          <ul>
            <NavLink text="Downloads" href="/downloads" />
            <li>
              {/* This is a static page, should not use next router to link to it */}
              <a className={style.Header__menu__item} href="/docs/index.html">
                Documentation
              </a>
            </li>
            <NavLink text="Tutorials" href="/tutorials" />
            <NavLink text="Community" href="/community" />
            <NavLink text="Blog" href="/blog" />
            <GHLink />
          </ul>
        </nav>
        <button
          onClick={() => setMenuOpen(!isMenuOpen)}
          className={style.Header__navtrigger}
        >
          <span>Open menu</span>
        </button>
      </div>
    </header>
  );
};

const NavLink = ({ text, href }) => (
  <li>
    <Link href={href}>
      <a className={style.Header__menu__item}>{text}</a>
    </Link>
  </li>
);

const GHLink = () => (
  <li
    className={cx(
      style.Header__menu__item,
      style.Header__menu__item__ghcallout
    )}
  >
    <a href="https://github.com/gorpipe/gor" target="_blank">
      GitHub
    </a>
  </li>
);

export default Header;
