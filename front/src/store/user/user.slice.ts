import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/user.ts';
import { getUser } from './user.action.ts';

interface UserState {
  user: User | null;
  isProcessing: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isProcessing: false,
  error: null,
};

export const favoritesSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserStore: () => initialState,
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isProcessing = true;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isProcessing = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action: any) => {
        state.isProcessing = false;
        state.error = action.payload.message;
      });
  },
});

export const { actions, reducer } = favoritesSlice;
