import { Toolbar, IconButton, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import DrawerComponent from "./DrawerComponent";
import { useTheme } from "@mui/material/styles";
import ListIcon from "@mui/icons-material/List";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usersActions } from "../../store/userSlice";

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(true);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const reduxIsLoggedIn = useSelector((state) => state.isLoggedIn);
  let navigate = useNavigate();
  const reduxUser = useSelector((state) => state.user);
  const storedLan = localStorage.getItem("lan");
  const dispatch = useDispatch();
  const reduxLan = useSelector((state) => state.lan);

  useEffect(() => {
    dispatch(usersActions.updateLanguage(storedLan));
  }, [storedLan]);

  const logoutHandler = () => {
    dispatch(usersActions.updateIdToken(null));
    dispatch(usersActions.updateIsLoggedIn(false));
    dispatch(usersActions.updateUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <Box
        elevation={10}
        sx={{
          backgroundColor:
            "linear-gradient(to left, #3399ff 27%, #9999ff 100%);",
        }}
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
              padding: "10px 0px",
            }}
            component="div"
          >
            {/* link */}
            {matches && (
              <DrawerComponent
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
              />
            )}
            {reduxIsLoggedIn && !matches ? (
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Typography
                  sx={{
                    marginRight: "20px",
                    cursor: "pointer",
                    color: "white",
                  }}
                  onClick={() => {
                    if (reduxUser === "Hans" || reduxUser === "Sarah") {
                      navigate("/hompageen");
                    } else if (
                      reduxUser === "??????" ||
                      reduxUser === "??????" ||
                      reduxUser === "??????" ||
                      reduxUser === "??????"
                    ) {
                      navigate("/hompagekr");
                    }
                  }}
                >
                  {reduxLan === "?????????" ? "???" : "Home"}
                </Typography>
                <Typography
                  sx={{
                    marginRight: "20px",
                    cursor: "pointer",
                    color: "white",
                  }}
                  onClick={() => {
                    navigate("/changepassword");
                  }}
                >
                  {reduxLan === "?????????"
                    ? "???????????? ?????????"
                    : "Change Password"}
                </Typography>
                <Typography
                  sx={{
                    marginRight: "20px",
                    cursor: "pointer",
                    color: "white",
                  }}
                  onClick={() => {
                    if (reduxUser === "Hans" || reduxUser === "Sarah") {
                      navigate("/msglogen");
                    } else if (
                      reduxUser === "??????" ||
                      reduxUser === "??????" ||
                      reduxUser === "??????" ||
                      reduxUser === "??????"
                    ) {
                      navigate("/msglogkr");
                    }
                  }}
                >
                  {reduxLan === "?????????" ? "????????? ??????" : "Message Log"}
                </Typography>
              </Box>
            ) : null}
            {/* Button link */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {matches ? (
                <IconButton onClick={() => setOpenDrawer(true)}>
                  <ListIcon></ListIcon>
                </IconButton>
              ) : !reduxIsLoggedIn ? (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    style={{ marginRight: "20px" }}
                  >
                    {reduxLan === "?????????" ? "?????????" : "LogIn"}
                  </button>
                  <button onClick={() => navigate("/signin")}>
                    {reduxLan === "?????????" ? "?????? ??????" : "Register Account"}
                  </button>
                </>
              ) : (
                // <button onClick={() => navigate("/updateusername")}>
                //   {reduxLan === "?????????"
                //     ? "???"
                //     : "Change Display name"}
                // </button>
                <button onClick={logoutHandler}>
                  {reduxLan === "?????????" ? "????????????" : "Logout"}
                </button>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Box>
    </>
  );
};

export default Navbar;
