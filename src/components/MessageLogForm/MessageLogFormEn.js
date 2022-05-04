import React, { useState, useEffect, useCallback } from "react";
import {
  fetchNoteHandlerEn,
  fetchNoteHandlerKr,
  addNoteHandlerEn,
  addNoteHandlerKr,
} from "../../Service/ApiService";
import AddNoteEn from "./AddNoteEn";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usersActions } from "../../store/userSlice";
import NoteListEn from "./NoteListEn";
const MessageLogFormEn = () => {
  const reduxUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [note, setNote] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(usersActions.updateIdToken(null));
    dispatch(usersActions.updateIsLoggedIn(false));
    dispatch(usersActions.updateUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const fetchNoteHandlerEn = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-http-2887f-default-rtdb.firebaseio.com/notes.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      console.log(data);
      const loadedNotes = [];
      for (const key in data) {
        loadedNotes.push({
          id: key,
          title: data[key].title,
          text: data[key].text,
          date: `${data[key].logger} logged message at ${data[key].date}....`,
        });
      }
      loadedNotes.reverse();
      console.log(loadedNotes);
      setNote(loadedNotes);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  async function addNoteHandlerEn(note) {
    const response = await fetch(
      "https://react-http-2887f-default-rtdb.firebaseio.com/notes.json",
      {
        method: "POST",
        body: JSON.stringify(note),
        headers: {
          "Content-Type": "appication/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    alert(`Message is successfully added..!`);
    fetchNoteHandlerEn();
  }

  useEffect(() => {
    fetchNoteHandlerEn();
  }, [fetchNoteHandlerEn]);

  let content = <p style={{ color: "white" }}>Found no Notes.</p>;

  if (note.length > 0) {
    content = <NoteListEn note={note} />;
  }

  if (error) {
    content = <p style={{ color: "white" }}>{error}</p>;
  }

  if (isLoading) {
    content = <p style={{ color: "white" }}>Loading...</p>;
  }

  return (
    <div>
      <section>
        <h3 style={{ color: "white" }}>Welcome..! {reduxUser} </h3>
        <button onClick={logoutHandler}> Logout</button>
      </section>
      <section>
        <h3 style={{ color: "white" }}>Log Format</h3>
        <AddNoteEn AddNote={addNoteHandlerEn} logger={reduxUser}></AddNoteEn>
      </section>
      <section>
        <button onClick={fetchNoteHandlerEn}>Update Notes</button>
      </section>
      <section>
        <h3 style={{ color: "white" }}>Log</h3>
        {content}
      </section>
    </div>
  );
};

export default MessageLogFormEn;
