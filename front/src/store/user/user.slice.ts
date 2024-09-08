import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Favorite } from '../../types/favorite.ts';
import { User } from '../../types/user.ts';

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
  name: 'favorites',
  initialState,
  reducers: {
    clearFavoritesStore: () => initialState,
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFavorites.pending, (state) => {
        state.isProcessing = true;
      })
      .addCase(
        getFavorites.fulfilled,
        (state, action: PayloadAction<Favorite[]>) => {
          state.isProcessing = false;
          state.favorites = action.payload;
        },
      )
      .addCase(getFavorites.rejected, (state, action: any) => {
        state.isProcessing = false;
        state.error = action.payload.message;
      });
  },
});

export const { actions, reducer } = favoritesSlice;
