import { configureStore } from "@reduxjs/toolkit";
import CryptoSlice from "./CryptoSlice";

const store = configureStore({
  reducer: {
    myCrypto: CryptoSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
