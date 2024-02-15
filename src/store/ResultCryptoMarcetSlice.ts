import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICoin } from "../interfaces";

interface IMeta {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemCount: number;
  limit: number;
  page: number;
  pageCount: number;
}

interface ICryptoRes {
  result: ICoin[];
  meta: IMeta;
}

interface ICrypto {
  cryptoResult: ICoin[];
  loading: boolean;
  error: string | null;
}
const initialState: ICrypto = {
  cryptoResult: [],
  loading: false,
  error: null,
};

export const fetchResultCryptoMarcet = createAsyncThunk<
  ICryptoRes,
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

const ResultCryptoMarcetSlice = createSlice({
  name: "cryptoResult",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResultCryptoMarcet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResultCryptoMarcet.fulfilled, (state, action) => {
        state.cryptoResult = action.payload.result;
        state.loading = false;
      });
  },
});

export default ResultCryptoMarcetSlice.reducer;
