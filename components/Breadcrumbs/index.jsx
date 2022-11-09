import style from "./Breadcrumbs.module.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const convertBreadcrumb = (string) => {
  return string
    .replace(/-/g, " ")
    .replace(/oe/g, "ö")
    .replace(/ae/g, "ä")
    .replace(/ue/g, "ü");
};

const Breadcrumbs = () => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState(null);

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split("/");
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        return {
          breadcrumb: path,
          href: "/" + linkPath.slice(0, i + 1).join("/"),
        };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <nav aria-label="breadcrumbs">
      <ol className="breadcrumb flex text-[18px]">
        <li className="pr-[5px] text-slate-400">
          <Link href="/dashboard">Home</Link>
        </li>
        {breadcrumbs.map((breadcrumb, i) => {
          return (
            <li
              key={breadcrumb.href}
              className={`pr-[5px] ${
                i === breadcrumbs.length - 1 ? "text-primary" : "text-slate-400"
              }`}
            >
              <Link href={breadcrumb.href}>
                <a>
                  <span className="pr-[5px]">/</span>
                  {convertBreadcrumb(breadcrumb.breadcrumb)}
                </a>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
