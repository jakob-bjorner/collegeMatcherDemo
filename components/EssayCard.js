import React, { useState } from "react";
import styles from "./EssayCard.module.css";

function EssayCard({ title, prompt, body, index }) {
  const [isExpanded, setIsExpanded] = useState(index == 0 ? true : false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.essayCard}>
      <div className={styles.essayHeader} onClick={toggleExpand}>
        <h5 className={styles.essayTitle}>{title}</h5>
        <span className={styles.expandIcon}>
          {isExpanded ? "-" : "+"}
        </span>
      </div>
      {isExpanded && (
        <div className={styles.essayBody}>
          <p className={styles.prompt}>{prompt}</p>
          <p className={styles.body}>{body}</p>
        </div>
      )}
    </div>
  );
}

export default EssayCard;
