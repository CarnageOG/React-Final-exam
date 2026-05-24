import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  username: null,
  age: null,
  subscribed: null,
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        updateUser: (state, action) => {
            state.name = action.payload.name.firstname;
            state.surname = action.payload.name.lastname;
            state.age = action.payload.id;
            state.subscribed = true;
        },
        deleteUser: (state, action) => {
            
        }
    },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;