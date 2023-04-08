import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import eventReducer from "./slices/event/eventSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

//import AsyncStorage from "@react-native-community/async-storage";
import { persistStore, persistReducer } from "redux-persist";
//import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, eventReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

// const combinedReducer = combineReducers({
//   counter: counterReducer,
// });

// const rootReducer = (state, action) => {
//   if (action.type === "counter/logout") {
//     state = undefined;
//   }
//   return combinedReducer(state, action);
// };

// export default configureStore({
//   reducer: rootReducer,
//   middleware: [...getDefaultMiddleware()],
// });
