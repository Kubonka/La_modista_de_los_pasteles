import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchPlayerList = createAsyncThunk(
//   "team/playerListLoading",
//   async (teamId) => {
//     console.log("entra");
//     const response = await axios.get("http://192.168.0.5:3001/auth");
//     console.log(response.data);
//   }
// );

const initialState = {
  loggedUser: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: { addUser: (state, action) => {} },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
