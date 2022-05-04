import { createSlice, configureStore } from "@reduxjs/toolkit";
const initialState = {
  user: "",
  idToken: "",
  isLoggedIn: false,
  lan: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    updateUser(state, action) {
      state.user = action.payload;
    },
    updateIdToken(state, action) {
      state.idToken = action.payload;
    },
    updateIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    updateLanguage(state, action) {
      state.lan = action.payload;
    },
  },
});

//Create the store
const store = configureStore({
  reducer: userSlice.reducer,
});

export const usersActions = userSlice.actions;
export default store;
