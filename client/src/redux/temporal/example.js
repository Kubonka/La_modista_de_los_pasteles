// export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
//   const response = await client.get("/fakeApi/posts");
//   return response.data;
// });

// const postsSlice = createSlice({
//   name: "posts",
//   initialState,
//   reducers: {
//     // omit existing reducers here
//   },
//   extraReducers(builder) {
//     builder
//       .addCase(fetchPosts.pending, (state, action) => {
//         state.status = "loading";
//       })
//       .addCase(fetchPosts.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         // Add any fetched posts to the array
//         state.posts = state.posts.concat(action.payload);
//       })
//       .addCase(fetchPosts.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// export const addNewPost = createAsyncThunk(
//   "posts/addNewPost",
//   // The payload creator receives the partial `{title, content, user}` object
//   async (initialPost) => {
//     // We send the initial data to the fake API server
//     const response = await client.post("/fakeApi/posts", initialPost);
//     // The response includes the complete post object, including unique ID
//     return response.data;
//   }
// );

// const postsSlice = createSlice({
//   name: "posts",
//   initialState,
//   reducers: {
//     // The existing `postAdded` reducer and prepare callback were deleted
//     reactionAdded(state, action) {}, // omit logic
//     postUpdated(state, action) {}, // omit logic
//   },
//   extraReducers(builder) {
//     // omit posts loading reducers
//     builder.addCase(addNewPost.fulfilled, (state, action) => {
//       // We can directly add the new post object to our posts array
//       state.posts.push(action.payload);
//     });
//   },
// });
