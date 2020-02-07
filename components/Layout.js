import Header from "./Header";

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: "1px solid #DDD"
};

const Layout = props => (
  <section style={layoutStyle}>
    <Header />
    {props.children}
  </section>
);

export default Layout;
