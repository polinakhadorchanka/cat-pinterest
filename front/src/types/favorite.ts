import { Cat } from './cat.ts';

export interface Favorite {
  id: number;
  cat: Cat;
}

export interface FavoritesID {
  id: number;
  catID: string;
}

export interface FavoritesResponse {
  favoritesIDs: FavoritesID[];
  favorites: Favorite[];
}
