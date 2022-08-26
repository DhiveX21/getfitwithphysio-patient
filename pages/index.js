import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import Router from 'next/router'
import Layout from "../components/Layout";
import WithMaster from "../hoc/withMaster";
import {
  useSession,
  signIn,
  signOut,
  getProviders,
  getCsrfToken,
} from "next-auth/react";

Home.auth = {
  // role: "admin",
  // loading: "<div>loading</div>",
  unauthorized: "/auth/login", // redirect to this url
};


export default function Home() {

  return (
    <WithMaster>
      <Layout>
        <div>awdkoawkoawko</div>
      </Layout>
    </WithMaster>
  );
}
