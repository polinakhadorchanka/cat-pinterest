import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cat } from '../../types/cat.ts';
import { getCats } from './cat.action.ts';

interface CatsState {
  cats: Cat[];
  page: number;
  isProcessing: boolean;
  error: string | null;
}

const initialState: CatsState = {
  cats: [],
  page: 0,
  isProcessing: false,
  error: null,
};

export const catsSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {
    clearCatsStore: () => initialState,
    clearError: (state) => {
      state.error = null;
    },
    catPageInc: (state) => {
      state.page = state.page + 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCats.pending, (state) => {
        state.isProcessing = true;
      })
      .addCase(getCats.fulfilled, (state, action: PayloadAction<Cat[]>) => {
        state.isProcessing = false;
        state.cats = [...state.cats, ...action.payload];
      })
      .addCase(getCats.rejected, (state, action: any) => {
        state.isProcessing = false;
        state.error = action.payload.message;
      });
  },
});

export const { actions, reducer } = catsSlice;
