import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { Divider } from "@mui/material";
import { Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../Service/ApiService";
import { useSelector, useDispatch } from "react-redux";
import { usersActions } from "../../store/userSlice";

const SignInForm = () => {
  const idRef = useRef("");
  const pwRef = useRef("");
  let navigate = useNavigate();
  const reduxLan = useSelector((state) => state.lan);

  const formHandler = () => {
    const a = signIn(idRef.current.value, pwRef.current.value);
    a.then((r) => {
      if (r?.idToken) {
        alert("Successfully Sign In. \n 가입이 완료 되었습니다.");
        navigate("/login");
      }
    });
  };

  return (
    <section>
      <Typography variant="h6" color="white">
        {reduxLan === "한국어"
          ? "이메일 과 패스워드를 입력해서 가입해 보세요. 비밀번호는 7자리 이상이여야 됩니다."
          : "Input Email and Password to sign in. Password should be more than 7 digits."}
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
            label="Email"
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
            label="Password"
            type="password"
            fullWidth
            inputRef={pwRef}
          />
          <button style={{ marginTop: "30px" }} onClick={formHandler}>
            {reduxLan === "한국어" ? "제출" : "Submit"}
          </button>
        </Grid>
      </Grid>
    </section>
  );
};

export default SignInForm;
