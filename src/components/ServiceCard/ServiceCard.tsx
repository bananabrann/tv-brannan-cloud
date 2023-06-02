import React, { FC } from "react";
import styles from "./ServiceCard.module.css";

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
      target=""
      rel="noreferrer"
      className={`${styles.container} ${styles.shiny}`}
    >
      <div className="">
        <img
          data-testid="service-card-image"
          src={imageUrl}
          alt={`${displayName}`}
        />
      </div>
    </a>
  );
};

export default ServiceCard;
