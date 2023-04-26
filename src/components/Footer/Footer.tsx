import React, { FC, useEffect, useState } from "react";
import footerStyles from "./footer.module.css";

const Footer: FC = () => {
  const environment = process.env.NODE_ENV === "production" ? "P" : "U";
  const buildDate = "23.4";
  const appVersion = "1.6";

  return (
    <div className={footerStyles.container}>
      <div className={footerStyles.content}>
        <small>
          <a href="https://github.com/bananabrann/tv-brannan-cloud/tree/main">
            View source
          </a>
        </small>
        <small>|</small>
        <small>{appVersion} {buildDate} {environment}</small>
      </div>

      <div className={footerStyles.rainbow} />
    </div>
  );
};

export default Footer;
