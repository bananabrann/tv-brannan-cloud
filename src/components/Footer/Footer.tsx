import React, { FC, useEffect, useState } from "react";
import footerStyles from "./footer.module.css";

const Footer: FC = () => {
  const [version, setVersion] = useState<string>("no loaded");

  useEffect(() => {
    async function fetchVersion() {
      try {
        const response = await fetch(
          // Don't use the CDN endpoint
          "https://brannan.cloud.nyc3.digitaloceanspaces.com/tv/VERSION.txt",
          { mode: "cors" },
        );
        const text = await response.text();
        console.log(text);
        setVersion(text);
      } catch (error: any) {
        console.error(error);
        setVersion("ERR");
      }
    }
    fetchVersion();
  }, []);

  return (
    <div className={footerStyles.container}>
      <div className={footerStyles.content}>
        <small>
          <a href="https://github.com/bananabrann/tv-brannan-cloud/tree/main">
            View source
          </a>
        </small>
        <small>|</small>
        <small>Version {version}</small>
      </div>

      <div className={footerStyles.rainbow} />
    </div>
  );
};

export default Footer;
