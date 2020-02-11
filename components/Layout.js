import Header from "./Header/Header";

import s from "./Layout.scss";

const Layout = props => (
  <div className={s.layout}>
    <Header />
    <main className={s.main}>{props.children}</main>
  </div>
);

export default Layout;
