import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: { "Access-Control-Allow-Origin": "*" },
})

export const getAll = createAsyncThunk('payment/getAll', () => api.get('payment').then().catch())
export const createPayment = createAsyncThunk('payment/create', (data) => {
  if (data.token) { data.token = "token_"+data.token};
  api.post('payment', data).then().catch()
})

const payment = createSlice({
  name: 'payment',
  initialState: {
    loading: false,
    success: false,
    list: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAll.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.loading = true;
        state.list = action.payload.data;
      })
      .addCase(createPayment.pending, state => {
        state.loading = true;
        state.success = false;
      })
      .addCase(createPayment.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
  }
})

export default payment.reducer;