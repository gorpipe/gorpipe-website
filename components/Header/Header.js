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
      <Link href="/">
        <a className={style.Header__logo}>
          <GORLogoText title="GOR" />
        </a>
      </Link>
      <nav className={style.Header__menu}>
        <ul>
          <NavLink text="Download" href="/download" />
          <NavLink text="Documentation" href="/docs" />
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
    <a href="https://github.com/gorpipe/gorpipe" target="_blank">
      GitHub
    </a>
  </li>
);

export default Header;
