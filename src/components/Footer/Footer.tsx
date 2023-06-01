import React, { FC } from "react";
import footerStyles from "./Footer.module.css";

const Footer: FC = () => {
  const environment = process.env.NODE_ENV === "production" ? "P" : "U";
  const appVersion = "1.0.3";

  return (
    <div className={footerStyles.container}>
      <div className={footerStyles.rainbow} />
      <div className={footerStyles.content}>
        <p>
          <a href="https://github.com/bananabrann/tv.brannan.cloud/tree/main">
            View source code
          </a>
          <span>|</span>
          <a href="https://github.com/bananabrann/tv.brannan.cloud/issues">
            Report an issue
          </a>
        </p>
        <p>
          {appVersion}-{environment}
        </p>
      </div>
    </div>
  );
};

export default Footer;
