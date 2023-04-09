import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//! ASYNC ACTIONS
export const createCake = createAsyncThunk("cake/createCake", async () => {
  const response = await axios.post("http://localhost:3001/cake");
  return response.data;
});
export const getCake = createAsyncThunk("cake/getCake", async (cake_id) => {
  const response = await axios.get(`http://localhost:3001/cake/${cake_id}`);
  return response.data;
});

export const updateCake = createAsyncThunk("cake/updateCake", async (fData) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  console.log("fData", fData);
  const response = axios.put("http://localhost:3001/cake", fData, config);
  return response.data;
});

//! STATE
const initialState = {
  currentCake: {},
  currentCakeLoading: false,
  allCakes: [],
  allCakesLoading: false,
  allTags: [],
  allTagsLoading: false,
};

//! REDUCER
export const cakeSlice = createSlice({
  name: "cake",
  initialState: initialState,
  reducers: { addCake: (state, action) => {} },
  extraReducers(builder) {
    builder
      .addCase(getCake.pending, (state, action) => {
        state.currentCakeLoading = true;
      })
      .addCase(getCake.fulfilled, (state, action) => {
        state.currentCakeLoading = true;
        console.log("action.payload", action.payload);
        state.currentCake = action.payload;
      })
      .addCase(getCake.rejected, (state, action) => {
        state.currentCakeLoading = false;
        //todo handle reject
      })
      .addCase(updateCake.pending, (state, action) => {
        state.currentCakeLoading = true;
        //todo HACER EL PUT DE LA CAKE
      })
      .addCase(updateCake.fulfilled, (state, action) => {
        state.currentCakeLoading = false;
        //todo HACER EL PUT DE LA CAKE
      })
      .addCase(updateCake.rejected, (state, action) => {
        state.currentCakeLoading = false;
        //todo HACER EL PUT DE LA CAKE
      })
      .addCase(createCake.pending, (state, action) => {
        state.currentCakeLoading = false;
      })
      .addCase(createCake.fulfilled, (state, action) => {
        state.currentCakeLoading = false;
        state.currentCake = action.payload;
      })
      .addCase(createCake.rejected, (state, action) => {
        state.currentCakeLoading = false;
        //todo HACER EL POST DE LA CAKE
      });
  },
});

//! HELPERS

export const { addCake } = cakeSlice.actions;
export default cakeSlice.reducer;
