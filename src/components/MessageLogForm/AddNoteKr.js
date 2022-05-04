import React, { useRef } from "react";
import "./AddNote.css";
import { useSelector } from "react-redux";
function AddNoteKr(props) {
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

    console.log(notes);
    props.AddNote(notes);
    titleRef.current.value = "";
    textRef.current.value = "";
  }

  console.log(reduxUserInfo);
  return (
    <form onSubmit={submitHandler}>
      <div className="control">
        <label htmlFor="title">제목</label>
        <input
          type="text"
          id="title"
          ref={titleRef}
          style={{ color: "white" }}
          placeholder="제목을 입력하시오."
        />
      </div>
      <div className="control">
        <label htmlFor="text-log">내용</label>
        <textarea
          rows="5"
          id="text-log"
          ref={textRef}
          style={{ color: "white" }}
          placeholder="남기고 싶은 말을 적으시오.."
        ></textarea>
      </div>
      <button>제출</button>
    </form>
  );
}

export default AddNoteKr;
