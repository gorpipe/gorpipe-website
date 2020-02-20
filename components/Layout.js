import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import DocHead from "./DocHead";

import s from "./Layout.scss";

const Layout = props => (
  <div className={s.Layout}>
    <DocHead />
    <Header />
    <main className={s.Layout__main}>{props.children}</main>
    {props.hideFooter ? null : <Footer />}
  </div>
);

export default Layout;
