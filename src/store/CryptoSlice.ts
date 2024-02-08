import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMyCoin } from "../interfaces";

interface IMyCrypto {
  myCrypto: IMyCoin[];
}
const initialState: IMyCrypto = {
  myCrypto: [],
};

const CryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    addMyCrypto(state, action: PayloadAction<IMyCoin>) {
      state.myCrypto.push({
        amount: action.payload.amount,
        date: action.payload.date,
        id: action.payload.id,
        price: action.payload.price,
      });
    },
  },
});

export default CryptoSlice.reducer;
export const { addMyCrypto } = CryptoSlice.actions;
