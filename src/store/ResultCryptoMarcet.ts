import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICoin } from "../interfaces";

interface IMyCrypto {
  myCrypto: ICoin[];
  loading: boolean;
  error: string | null;
}
const initialState: IMyCrypto = {
  myCrypto: [],
  loading: false,
  error: null,
};

// export const fetchNewsItemsTheme = createAsyncThunk<NewsItem[], number, { rejectValue: string }>(
export const fetchResultCryptoMarcet = createAsyncThunk<
  ICoin[],
  undefined,
  { rejectValue: string }
>("fetchResultCryptoMarcet", async function (_, { rejectWithValue }) {
  const response = await fetch("https://openapiv1.coinstats.app/coins", {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-KEY": "ZwEuAe0oUaI5g/FtT5IC9b1fDZ76a+RDL9ORiXh1poA=",
    },
  });
  if (!response.ok) {
    return rejectWithValue("Server Error!");
  }
  const data = await response.json();
  return data;
});

const ResultCryptoMarcet = createSlice({
  name: "crypto",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResultCryptoMarcet.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResultCryptoMarcet.fulfilled, (state, action) => {
        state.myCrypto = action.payload;
        state.loading = false;
      });
  },
});

export default ResultCryptoMarcet.reducer;
// export const { addMyCrypto, removeMyCrypto } = ResultCryptoMarcet.actions;
