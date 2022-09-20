import Header from "../Header";
import Footer from "../Footer";
import style from "./Layout.module.css";
import { ControlLoading } from "../Control";

export default function Layout(props) {
  const { children } = props;
  return (
    <>
      <ControlLoading />
      <Header />
      <div className={style.layout}>{children}</div>
      <Footer />
    </>
  );
}
