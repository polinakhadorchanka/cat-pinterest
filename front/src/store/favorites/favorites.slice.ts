import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Favorite,
  FavoritesID,
  FavoritesResponse,
} from '../../types/favorite.ts';
import {
  addToFavorites,
  deleteFromFavorites,
  getFavorites,
} from './favorites.action.ts';

interface FavoritesState {
  favorites: Favorite[];
  favoritesIDs: FavoritesID[];
  page: number;
  isProcessing: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  favorites: [],
  favoritesIDs: [],
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
        (state, action: PayloadAction<FavoritesResponse>) => {
          state.isProcessing = false;
          state.favorites = action.payload.favorites;
          state.favoritesIDs = action.payload.favoritesIDs;
        },
      )
      .addCase(getFavorites.rejected, (state, action: any) => {
        state.isProcessing = false;
        state.error = action.payload.message;
      })
      .addCase(addToFavorites.pending, (_state) => {})
      .addCase(
        addToFavorites.fulfilled,
        (state, action: PayloadAction<Favorite>) => {
          state.favorites = [...state.favorites, action.payload];
          state.favoritesIDs = [
            ...state.favoritesIDs,
            { id: action.payload.id, catID: action.payload.cat.id },
          ];
        },
      )
      .addCase(addToFavorites.rejected, (state, action: any) => {
        state.error = action.payload.message;
      })
      .addCase(deleteFromFavorites.pending, (_state) => {})
      .addCase(
        deleteFromFavorites.fulfilled,
        (state, action: PayloadAction<Favorite>) => {
          state.favorites = state.favorites.filter(
            (favorite) => favorite.id !== action.payload.id,
          );
          state.favoritesIDs = state.favoritesIDs.filter(
            (favorite) => favorite.id !== action.payload.id,
          );
        },
      )
      .addCase(deleteFromFavorites.rejected, (state, action: any) => {
        state.error = action.payload.message;
      });
  },
});

export const { actions, reducer } = favoritesSlice;
