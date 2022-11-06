import { useDispatch } from "react-redux";
import { useEffect } from "react";
import * as loginActions from "../store/actions/loginActions";
import Router from "next/router";
import { authCheck } from "../helpers/authHelpers";

export default function WithMaster(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginActions.getUsers());

    authCheck();
  }, []);

  //   const { pathname } = Router;

  // if (!authCheck()) {
  //   // if (pathname !== "/auth/login") {
  //   //   Router.push("/auth/login");
  //   // }
  // } else {
  //   // if (pathname !== "/auth/register") {
  //   //   Router.push("/auth/register");
  //   // }
  // }

  const { children } = props;
  return <div>{children}</div>;
}
