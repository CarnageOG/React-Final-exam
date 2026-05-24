import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  firstname: null,
  lastname: null,
  age: null,
  subscribed: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const user = action.payload;
      state.user = user;
      state.firstname = user.name.firstname;
      state.lastname = user.name.lastname;
      state.age = user.id;
      state.subscribed = true;
    },

    deleteUser: (state) => {
      state.user = null;
      state.firstname = null;
      state.lastname = null;
      state.age = null;
      state.subscribed = false;
    },
  },
});

export const { updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;