import React, { useEffect } from "react";
import {
  Drawer,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usersActions } from "../../store/userSlice";

const DrawerComponent = ({ openDrawer, setOpenDrawer }) => {
  const reduxIsLoggedIn = useSelector((state) => state.isLoggedIn);
  const reduxUser = useSelector((state) => state.user);
  const reduxLan = useSelector((state) => state.lan);
  const storedLan = localStorage.getItem("lan");
  const dispatch = useDispatch();
  let navigate = useNavigate();

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
    <Drawer anchor="right" open={openDrawer}>
      {reduxIsLoggedIn ? (
        <List>
          <ListItem
            divider
            button
            onClick={() => {
              if (reduxUser === "Hans" || reduxUser === "Sarah") {
                navigate("/hompageen");
              } else if (
                reduxUser === "성재" ||
                reduxUser === "엄마" ||
                reduxUser === "아빠" ||
                reduxUser === "은지"
              ) {
                navigate("/hompagekr");
              }
              setOpenDrawer(false);
            }}
          >
            <ListItemIcon>
              <ListItemText>
                {reduxLan === "한국어" ? "홈" : "Home"}
              </ListItemText>
            </ListItemIcon>
          </ListItem>
          <ListItem
            divider
            button
            onClick={() => {
              navigate("/changepassword");
              setOpenDrawer(false);
            }}
          >
            <ListItemIcon>
              <ListItemText>
                {reduxLan === "한국어" ? "비밀번호 바꾸기" : "Change Password"}
              </ListItemText>
            </ListItemIcon>
          </ListItem>
          <ListItem
            divider
            button
            onClick={() => {
              if (reduxUser === "Hans" || reduxUser === "Sarah") {
                navigate("/msglogen");
              } else if (
                reduxUser === "성재" ||
                reduxUser === "엄마" ||
                reduxUser === "아빠" ||
                reduxUser === "은지"
              ) {
                navigate("/msglogkr");
              }
              setOpenDrawer(false);
            }}
          >
            <ListItemIcon>
              <ListItemText>
                {reduxLan === "한국어" ? "메세지 로그" : "Message Log"}
              </ListItemText>
            </ListItemIcon>
          </ListItem>
          <ListItem
            divider
            button
            onClick={() => {
              logoutHandler();
              setOpenDrawer(false);
            }}
          >
            <ListItemIcon>
              <ListItemText>
                {reduxLan === "한국어" ? "로그아웃" : "LogOut"}
              </ListItemText>
            </ListItemIcon>
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem
            divider
            button
            onClick={() => {
              navigate("/signin");
              setOpenDrawer(false);
            }}
          >
            <ListItemIcon>
              <ListItemText>
                {reduxLan === "한국어" ? "가입하기" : "Register"}
              </ListItemText>
            </ListItemIcon>
          </ListItem>
          <ListItem
            divider
            button
            onClick={() => {
              navigate("/login");
              setOpenDrawer(false);
            }}
          >
            <ListItemIcon>
              <ListItemText>
                {reduxLan === "한국어" ? "로그인" : "LogIn"}
              </ListItemText>
            </ListItemIcon>
          </ListItem>
        </List>
      )}
    </Drawer>
  );
};

export default DrawerComponent;
