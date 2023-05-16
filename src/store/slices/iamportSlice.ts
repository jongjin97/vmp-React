import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { certification, CertificationResponse } from '@app/api/iamport.api';

const initialState = { status: 'idle', result: null as CertificationResponse | null };

export const doCertification = createAsyncThunk('certification/doCertification', async (impRequest: string) => {
  const response = await certification(impRequest);
  return response;
});

const iamportSlice = createSlice({
  name: 'iamport',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(doCertification.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(doCertification.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        state.result = action.payload;
      });
  },
});

export default iamportSlice.reducer;
