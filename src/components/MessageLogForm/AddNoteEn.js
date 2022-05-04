import React, { useRef } from "react";
import { useSelector } from "react-redux";
import "./AddNote.css";

function AddNoteEn(props) {
  const titleRef = useRef("");
  const textRef = useRef("");
  const now = new Date();

  const reduxUserInfo = useSelector((state) => state.user);
  function submitHandler(event) {
    event.preventDefault();
    const notes = {
      title: titleRef.current.value,
      text: textRef.current.value,
      date: now.toLocaleString(),
      logger: reduxUserInfo,
    };

    props.AddNote(notes);
    titleRef.current.value = "";
    textRef.current.value = "";
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          ref={titleRef}
          style={{ color: "white" }}
          placeholder="Log the title here..!"
        />
      </div>
      <div className="control">
        <label htmlFor="text-log">Text Log</label>
        <textarea
          rows="5"
          id="text-log"
          ref={textRef}
          style={{ color: "white" }}
          placeholder="Log the past event that you want to mention.."
        ></textarea>
      </div>
      <button>Submit</button>
    </form>
  );
}

export default AddNoteEn;
