import React, { FC } from "react";
import styles from "./servicecard.module.css";

interface Props {
  displayName: string;
  url: string;
  imageUrl: string;
  loginUrl?: string;
}

const ServiceCard: FC<Props> = ({ displayName, url, loginUrl, imageUrl }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={`${styles.container} ${styles.shiny}`}
    >
      <div className="">
        <img
          src={imageUrl}
          alt={`Logo for ${displayName}`}
        />
      </div>
    </a>
  );
};

export default ServiceCard;
