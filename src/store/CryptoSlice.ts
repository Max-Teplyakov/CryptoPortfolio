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
      const existingCoin = state.myCrypto.find(
        (coin) => coin.id === action.payload.id
      );
      if (existingCoin) {
        return {
          ...state,
          myCrypto: state.myCrypto.map((coin) => {
            if (coin.id === action.payload.id) {
              return {
                ...coin,
                amount: coin.amount + action.payload.amount,
                price: coin.price + action.payload.price,
              };
            }
            return coin;
          }),
        };
      } else {
        return {
          ...state,
          myCrypto: [...state.myCrypto, action.payload],
        };
      }
    },
    removeMyCrypto(state, action: PayloadAction<string>) {
      const index = state.myCrypto.findIndex(
        (coin) => coin.id === action.payload
      );
      if (index !== -1) {
        state.myCrypto.splice(index, 1);
      }
    },
  },
});

export default CryptoSlice.reducer;
export const { addMyCrypto, removeMyCrypto } = CryptoSlice.actions;
