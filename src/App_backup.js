import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NoteListS from "./components/NoteListSarah";
import NoteListF from "./components/NoteListF";
import AddNoteS from "./components/AddNoteSarah";
import AddNoteF from "./components/AddNoteF";
import "./App.css";
import Login from "./components/Login";
import { usersActions } from "./store/userSlice";

function App() {
  const [noteF, setNoteF] = useState([]);
  const [noteS, setNoteS] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [mode, setMode] = useState("");
  const [error, setError] = useState(null);
  const [userInfo, SetUserInfo] = useState();
  const reduxUserInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const formHandler = async ({ id, pw }) => {
    try {
      const response = await fetch(
        "https://react-http-2887f-default-rtdb.firebaseio.com/login.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      const temp = [...Object.values(data)[0]];
      const user = temp.find((u) => u.id === id && u.pw === pw);
      if (!user || user.pw !== pw) {
        alert(
          `아이디 또는 비밀번호가 일치하지 않습니다..! \nInvalid ID or Password..!`
        );
      } else {
        setMode(user.mode);
        setIsCorrect(true);
        SetUserInfo(user.name);
        dispatch(usersActions.updateUser(user.name));
        // localStorage.setItem("isCorrect", "1");
        // localStorage.setItem("mode", user.mode);
        alert(`환영합니다.. ${user.name}! \nWelcome back.. ${user.name}!`);
      }
      console.log(user);
    } catch (error) {
      setError(error.message);
    }
  };

  console.log(mode);
  const logoutHandler = () => {
    setIsCorrect(false);
    alert(`성공적으로 로그아웃 되었습니다. \nLogout succesfully.`);
  };

  const fetchNoteHandlerS = useCallback(async () => {
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
      setNoteS(loadedNotes);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  const fetchNoteHandlerF = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-http-2887f-default-rtdb.firebaseio.com/notes2.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      const loadedNotes = [];
      for (const key in data) {
        loadedNotes.push({
          id: key,
          title: data[key].title,
          text: data[key].text,
          date: `${data[key].logger}님이 ${data[key].date}에 남기셨습니다..`,
        });
      }
      loadedNotes.reverse();
      console.log(loadedNotes);
      setNoteF(loadedNotes);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  async function addNoteHandlerS(note) {
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
    fetchNoteHandlerS();
  }

  async function addNoteHandlerF(note) {
    const response = await fetch(
      "https://react-http-2887f-default-rtdb.firebaseio.com/notes2.json",
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
    alert(`메세지가 성공적으로 추가되었습니다.`);
    fetchNoteHandlerF();
  }
  useEffect(() => {
    fetchNoteHandlerF();
    fetchNoteHandlerS();
  }, [fetchNoteHandlerF, fetchNoteHandlerS]);

  let content = <p style={{ color: "white" }}>Found no Notes.</p>;

  if (noteF.length > 0 && mode === "F") {
    content = <NoteListF note={noteF} />;
  }

  if (noteS.length > 0 && mode === "S") {
    content = <NoteListS note={noteS} />;
  }

  if (error) {
    content = <p style={{ color: "white" }}>{error}</p>;
  }

  if (isLoading) {
    content = <p style={{ color: "white" }}>Loading...</p>;
  }

  return (
    <>
      {!isCorrect ? (
        <Login form={formHandler}></Login>
      ) : mode === "F" ? (
        <div>
          <section>
            <h3 style={{ color: "white" }}>어서오세요..! {userInfo} ..</h3>
            <button onClick={logoutHandler}> 로그아웃</button>
          </section>
          <section>
            <h3 style={{ color: "white" }}>메세지 양식</h3>
            <AddNoteF AddNote={addNoteHandlerF}></AddNoteF>
          </section>
          <section>
            <button onClick={fetchNoteHandlerF}>메세지 업데이트 하기</button>
          </section>
          <section>
            <h3 style={{ color: "white" }}>메세지 함</h3>
            {content}
          </section>
        </div>
      ) : (
        <div>
          <section>
            <h3 style={{ color: "white" }}>Welcome..! {userInfo}..</h3>
            <button onClick={logoutHandler}> Logout</button>
          </section>
          <section>
            <h3 style={{ color: "white" }}>Log Format</h3>
            <AddNoteS
              AddNote={addNoteHandlerS}
              logger={reduxUserInfo}
            ></AddNoteS>
          </section>
          <section>
            <button onClick={fetchNoteHandlerS}>Update Notes</button>
          </section>
          <section>
            <h3 style={{ color: "white" }}>Log</h3>
            {content}
          </section>
        </div>
      )}
    </>
  );
}

export default App;
