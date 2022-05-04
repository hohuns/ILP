import { Divider } from "@mui/material";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import React, { useRef } from "react";
import { logIn } from "../../Service/ApiService";
import { useNavigate } from "react-router-dom";
import { usersActions } from "../../store/userSlice";
import { useSelector, useDispatch } from "react-redux";

const ChangePasswordForm = (props) => {
  const pwRef = useRef("");
  let navigate = useNavigate();
  const reduxidToken = useSelector((state) => state.idToken);
  const reduxLan = useSelector((state) => state.lan);

  const formHandler = async () => {
    console.log(pwRef.current.value);
    try {
      const data = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCkLePHqkPxNxPalsSLE_C4CbAaOiaGwNw",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: reduxidToken,
            password: pwRef.current.value,
            returnSecureToken: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!data.ok) {
        console.log(data);
        let errorMessage =
          reduxLan === "한국어"
            ? "비밀번호 변경에 실패하였습니다. 비밀번호는 7자 이상이여야 합니다.."
            : "Failed to change password. Password Should be more than 7 digits.";
        if (data?.error?.message) {
          //equal with if(data && data.error && data.error.message)
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }
      const json = await data.json();
      console.log(json);
      alert(
        reduxLan === "한국어"
          ? "성공하였습니다.."
          : "Succeded to change the password."
      );
    } catch (err) {
      alert(err);
    }
  };

  console.log(reduxidToken);
  return (
    <section>
      <Typography variant="h6" color="white">
        {reduxLan === "한국어"
          ? "변경할 패스워드를 입력해 주세요."
          : "Input the password that you want to change."}
      </Typography>
      <Divider sx={{ backgroundColor: "white", marginTop: "10px" }} />
      <Grid container spacing={4} style={{ marginTop: "10px" }}>
        <Grid item xs={12} sm={3}>
          {}
        </Grid>
        <Grid item xs={12} sm={6}>
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

export default ChangePasswordForm;
