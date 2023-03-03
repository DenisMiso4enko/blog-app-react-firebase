import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  id: null,
  token: null,
  posts: null,
  displayName: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.accessToken;
      state.id = action.payload.id;
      state.displayName = action.payload.displayName;
    },
    logOut(state) {
      state.email = null;
      state.token = null;
      state.id = null;
    },
    setPosts(state, action) {
      state.posts = action.payload;
    },
  },
});

export const { setUser, logOut, setPosts } = userSlice.actions;

export default userSlice.reducer;
