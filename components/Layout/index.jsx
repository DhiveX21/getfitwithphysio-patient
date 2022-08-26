import Header from "../Header";
import Footer from "../Footer";
import style from "./Layout.module.css";

export default function Layout(props) {
  const { children } = props;
  return (
    <>
      <Header />
      <div className={style.layout}>{children}</div>
      <Footer />
    </>
  );
}
