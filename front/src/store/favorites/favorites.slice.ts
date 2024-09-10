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
import { LIMIT } from '../../types/constants.ts';

interface FavoritesState {
  favorites: Favorite[];
  favoritesIDs: FavoritesID[];
  page: number;
  pageCount: number;
  isProcessing: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  favorites: [],
  favoritesIDs: [],
  page: 0,
  pageCount: 0,
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
    favoritePageInc: (state) => {
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
          state.pageCount = action.payload.pageCount;
          state.favorites =
            state.page === 0
              ? action.payload.favorites
              : [...state.favorites, ...action.payload.favorites];
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
          state.favorites =
            state.favorites.length % LIMIT !== 0
              ? [...state.favorites, action.payload]
              : state.favorites;
          state.pageCount = Math.ceil((state.favoritesIDs.length + 1) / LIMIT);
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
          state.page = Math.floor((state.favorites.length - 1) / LIMIT);
          state.pageCount = Math.ceil((state.favoritesIDs.length - 1) / LIMIT);
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
