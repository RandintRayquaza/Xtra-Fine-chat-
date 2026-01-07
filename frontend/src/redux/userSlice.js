import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    authChecked: false,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
      state.authChecked = true;
    },
    logoutUser: (state) => {
      state.authUser = null;
      state.authChecked = true; 
    },
  },
});

export const { setAuthUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
