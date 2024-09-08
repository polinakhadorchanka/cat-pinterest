import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Favorite } from '../../types/favorite.ts';
import { getFavorites } from './favorites.action.ts';

interface FavoritesState {
  favorites: Favorite[];
  page: number;
  isProcessing: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  favorites: [],
  page: 0,
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
    pageInc: (state) => {
      state.page = state.page + 1;
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
