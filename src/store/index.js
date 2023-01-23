import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { logger } from "redux-logger";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import {
  Slider,
  User,
  Follow,
  Socket,
  Buy,
  Loader,
  Theme,
  popupReducer,
  userDataReducer,
  Activity,
  Follower,
  Following,
  SubscriptionUser
} from "./reducer";

const reducer = {
  Slider,
  User,
  Follow,
  Socket,
  Buy,
  Loader,
  Theme,
  popupReducer,
  authUser: userDataReducer,
  Activity,
  Follower,
  Following,
  SubscriptionUser
};

const rootReducer = combineReducers(reducer);

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
let middleware = () =>
  getDefaultMiddleware({ serializableCheck: false }).concat(logger);

if (process.env.NODE_ENV === "production") {
  middleware = (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false });
}

export const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

export const persistor = persistStore(store);
