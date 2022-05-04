import { Divider } from "@mui/material";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { logIn } from "../../Service/ApiService";
import { useNavigate } from "react-router-dom";
import { usersActions } from "../../store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import DialogLanguage from "./DialogLanLogin";

const Login = (props) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const idRef = useRef("");
  const pwRef = useRef("");
  let navigate = useNavigate();
  const reduxidToken = useSelector((state) => state.idToken);
  const reduxLan = useSelector((state) => state.lan);
  const storedLan = localStorage.getItem("lan");
  const dialogClickHandler = () => {
    setOpen(true);
  };

  const dialogCloseHandler = () => {
    setOpen(false);
  };

  useEffect(() => {
    dialogClickHandler();
    dispatch(usersActions.updateLanguage(storedLan));
  }, []);

  const formHandler = () => {
    const a = logIn(idRef.current.value, pwRef.current.value);
    a.then((r) => {
      console.log(r);
      if (
        (r?.registered === true && r?.displayName === "Hans") ||
        (r?.registered === true && r?.displayName === "Sarah")
      ) {
        dispatch(usersActions.updateIdToken(r.idToken));
        dispatch(usersActions.updateIsLoggedIn(true));
        dispatch(usersActions.updateUser(r?.displayName));
        localStorage.setItem("token", r.idToken);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("user", r?.displayName);
        navigate("/hompageen");
      } else if (
        (r?.registered === true && r?.displayName === "성재") ||
        (r?.registered === true && r?.displayName === "엄마") ||
        (r?.registered === true && r?.displayName === "은지") ||
        (r?.registered === true && r?.displayName === "아빠")
      ) {
        dispatch(usersActions.updateIdToken(r.idToken));
        dispatch(usersActions.updateIsLoggedIn(true));
        dispatch(usersActions.updateUser(r?.displayName));
        localStorage.setItem("token", r.idToken);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("user", r?.displayName);
        navigate("/hompagekr");
      } else if (r?.registered === true) {
        alert(
          reduxLan === "한국어"
            ? "당신은 승인받지 않은 사용자입니다."
            : "You are not authorized to use this service."
        );
      }
    });
  };

  return (
    <section>
      <Typography variant="h6" color="white">
        {reduxLan === "한국어"
          ? "로그에 접속 하려면 아이디와 패스워드를 입력해주세요."
          : "Input the password to access the Message Log."}
      </Typography>
      <Divider sx={{ backgroundColor: "white", marginTop: "10px" }} />
      <Grid container spacing={4} style={{ marginTop: "10px" }}>
        <Grid item xs={12} sm={3}>
          {}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            color="primary"
            sx={{
              input: {
                borderRadius: "5px",
                border: "1px solid white",
                color: "white",
              },
            }}
            margin="dense"
            name="Email"
            label={reduxLan === "한국어" ? "이메일" : "Email"}
            type="text"
            fullWidth
            inputRef={idRef}
          />
          <TextField
            margin="dense"
            required
            name="pw"
            sx={{
              input: {
                borderRadius: "5px",
                border: "1px solid white",
                color: "white",
              },
            }}
            label={reduxLan === "한국어" ? "패스워드" : "Password"}
            type="password"
            fullWidth
            inputRef={pwRef}
          />
          <button style={{ marginTop: "30px" }} onClick={formHandler}>
            {reduxLan === "한국어" ? "로그인" : "Submit"}
          </button>
        </Grid>
      </Grid>
      <DialogLanguage open={open} close={dialogCloseHandler} />
    </section>
  );
};

export default Login;
