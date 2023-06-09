import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//! ASYNC ACTIONS
export const getCarrousel = createAsyncThunk(
  "carrousel/getCarrousel",
  async (carrousel_id) => {
    console.log(carrousel_id);
    const response = await axios.get(
      `http://localhost:3001/carrousel/${carrousel_id}`
    );
    console.log("response.data", response.data);
    return response.data;
  }
);
export const deleteImage = createAsyncThunk(
  "image/deleteImage",
  async (image_id) => {
    const response = await axios.delete(
      `http://localhost:3001/image/${image_id}`
    );
    return response.data;
  }
);
export const setMainImage = createAsyncThunk(
  "image/setMainImage",
  async (image_id, cake_id) => {
    const response = await axios.put(
      `http://localhost:3001/image?image_id=${image_id}&cake_id=${cake_id}`
    );
    return response.data;
  }
);
export const updateTag = createAsyncThunk("tag/updateTag", async (tag) => {
  const response = await axios.put("http://localhost:3001/tag", tag);
  return response.data;
});
export const createTag = createAsyncThunk("tag/createTag", async (tag) => {
  const response = await axios.post("http://localhost:3001/tag", tag);
  return response.data;
});
export const deleteTag = createAsyncThunk("tag/deleteTag", async (tag) => {
  console.log("BODY", tag);
  const response = await axios.delete("http://localhost:3001/tag", {
    data: tag,
  });
  return response.data;
});

export const getAllTags = createAsyncThunk("tag/getAllTags", async () => {
  const response = await axios.get("http://localhost:3001/tag");
  return response.data;
});
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
  const response = await axios.put("http://localhost:3001/cake", fData, config);
  return response.data;
});
export const deleteCake = createAsyncThunk(
  "cake/deleteCake",
  async (cake_id) => {
    const response = await axios.delete(
      `http://localhost:3001/cake/${cake_id}`
    );
    return response.data;
  }
);

export const getAllCakes = createAsyncThunk("cake/getAllCakes", async () => {
  const response = await axios.get("http://localhost:3001/cake");
  return response.data;
});

//! STATE
const initialState = {
  carrousel1: [],
  carrousel2: [],
  carrousel3: [],
  filteringBy: [],
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
  reducers: {
    setFilteringBy: (state, action) => {
      state.filteringBy.push(action.payload);
    },
    removeFilteringBy: (state, action) => {
      state.filteringBy = state.filteringBy.filter(
        (tag) => tag.tag_id !== action.payload
      );
    },
    clearFilteringBy: (state) => {
      state.filteringBy = [];
    },
    toggleTagWiggle: (state, action) => {
      const tagToUpdate = state.filteringBy.find(
        (tag) => tag.tag_id === action.payload.tag_id
      );
      tagToUpdate.wiggle = tagToUpdate.wiggle === true ? false : true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllCakes.pending, (state, action) => {
        state.allCakesLoading = true;
      })
      .addCase(getAllCakes.fulfilled, (state, action) => {
        state.allCakesLoading = false;
        state.allCakes = action.payload;
      })
      .addCase(getAllCakes.rejected, (state, action) => {
        state.allCakesLoading = false;
        //todo handle reject
      })
      .addCase(getCake.pending, (state, action) => {
        state.currentCakeLoading = true;
      })
      .addCase(getCake.fulfilled, (state, action) => {
        state.currentCake = action.payload;
        state.currentCakeLoading = false;
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
        //todo HACER EL POST DE LA CAKE
      })
      .addCase(createCake.fulfilled, (state, action) => {
        state.currentCakeLoading = false;
      })
      .addCase(createCake.rejected, (state, action) => {
        //todo HACER EL POST DE LA CAKE
      })
      .addCase(getAllTags.pending, (state, action) => {
        state.allTagsLoading = true;
        //todo HACER EL GET DE LOS TAGS
      })
      .addCase(getAllTags.fulfilled, (state, action) => {
        state.allTagsLoading = false;
        state.allTags = action.payload;
      })
      .addCase(getAllTags.rejected, (state, action) => {
        state.allTagsLoading = false;
        //todo HACER EL GET DE LOS TAGS
      })
      .addCase(createTag.pending, (state, action) => {
        state.allTagsLoading = false;
        //todo HACER EL POST DE LOS TAGS
      })
      .addCase(createTag.fulfilled, (state, action) => {
        state.allTagsLoading = false;
      })
      .addCase(createTag.rejected, (state, action) => {
        state.allTagsLoading = false;
        //todo HACER EL POST DE LOS TAGS
      })
      .addCase(updateTag.pending, (state, action) => {
        state.allTagsLoading = false;
        //todo HACER EL UPDATE DEL TAG
      })
      .addCase(updateTag.fulfilled, (state, action) => {
        state.allTagsLoading = false;
      })
      .addCase(updateTag.rejected, (state, action) => {
        state.allTagsLoading = false;
        //todo HACER EL UPDATE DEL TAG
      })
      .addCase(deleteImage.pending, (state, action) => {
        state.allTagsLoading = false;
        //todo HACER EL DELETE DEL TAG
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        //state.allTagsLoading = false;
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.allTagsLoading = false;
        //todo HACER EL DELETE DEL TAG
      })
      .addCase(setMainImage.pending, (state, action) => {
        state.allTagsLoading = false;
        //todo HACER EL SET DEL TAG
      })
      .addCase(setMainImage.fulfilled, (state, action) => {
        //state.allTagsLoading = false;
      })
      .addCase(setMainImage.rejected, (state, action) => {
        state.allTagsLoading = false;
        //todo HACER EL SET DEL TAG
      })
      .addCase(getCarrousel.pending, (state, action) => {
        state.allTagsLoading = false;
        //todo HACER EL SET DEL TAG
      })
      .addCase(getCarrousel.fulfilled, (state, action) => {
        switch (action.payload.carrousel_id) {
          case "1":
            state.carrousel1 = action.payload.carrousel;
            break;
          case "2":
            state.carrousel2 = action.payload.carrousel;
            break;
          case "3":
            state.carrousel3 = action.payload.carrousel;
            break;
          default:
            return null;
        }
      })
      .addCase(getCarrousel.rejected, (state, action) => {
        state.allTagsLoading = false;
        //todo HACER EL SET DEL TAG
      });
  },
});

//! HELPERS

export const {
  setFilteringBy,
  clearFilteringBy,
  removeFilteringBy,
  toggleTagWiggle,
} = cakeSlice.actions;
export default cakeSlice.reducer;
