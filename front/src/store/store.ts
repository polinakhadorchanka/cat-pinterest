import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as catsSliceReducer } from './cats/cats.slice.ts';
import { reducer as favoritesSliceReducer } from './favorites/favorites.slice.ts';

const reducers = combineReducers({
  cats: catsSliceReducer,
  favorites: favoritesSliceReducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
