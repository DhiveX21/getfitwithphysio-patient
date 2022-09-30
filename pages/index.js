import Layout from "../components/Layout";
import WithMaster from "../hoc/withMaster";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/dashboard");
  });

  return (
    <WithMaster>
      <Layout>
        <div></div>
      </Layout>
    </WithMaster>
  );
}
