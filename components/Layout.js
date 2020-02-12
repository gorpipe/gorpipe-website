import Header from "./Header/Header";
import Footer from "./Footer/Footer";

import s from "./Layout.scss";

const Layout = props => (
  <div className={s.Layout}>
    <Header />
    <main className={s.Layout__main}>{props.children}</main>
    <Footer />
  </div>
);

export default Layout;
