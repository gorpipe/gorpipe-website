import { useEffect } from "react";
import Router from "next/router";

export default function() {
  useEffect(() => {
    Router.replace("/docs/index.html");
  }, []);

  return null;
}
