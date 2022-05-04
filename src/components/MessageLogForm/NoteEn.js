import React from "react";

import "./Note.css";

const NoteEn = (props) => {
  return (
    <div>
      <li className="note ">
        <h3>{props.title}</h3>
        <p>{props.text}</p>
        <h6>{props.date}</h6>
      </li>
    </div>
  );
};

export default NoteEn;
