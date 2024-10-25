import React from "react";
import "./cardStat.css";

const CardStat = ({
  title,
  number,
  bg,
  hoverBg,
  onClick,
  correspondance,
  newCorrespondance = "00",
  icon = "",
}) => {
  return (
    <div
      className="navsaccContainer "
      style={{
        background: bg,
        ":hover": {
          background: hoverBg,
        },
      }}
      onClick={onClick}
    >
      <div className="iconNav">
        <h1>{number}</h1>
        <div style={{ marginRight: "5px" }}>{icon}</div>
      </div>
      <p>{title}</p>
      {correspondance && newCorrespondance !== "00" && (
        <div className="new">{newCorrespondance}</div>
      )}
    </div>
  );
};

export default CardStat;
