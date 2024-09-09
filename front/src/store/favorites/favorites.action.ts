import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Favorite, FavoritesResponse } from '../../types/favorite.ts';
import { Cat } from '../../types/cat.ts';

const apiGetFavorites = (
  token: string,
  page: number = 0,
  limit: number = 20,
): Promise<FavoritesResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/favorites`,
        {
          params: {
            page,
            limit,
          },
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

      resolve(data);
    } catch (error: any) {
      reject(error.response.statusText);
    }
  });
};

const apiAddToFavorites = (token: string, cat: Cat): Promise<Favorite> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/favorites`,
        cat,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

      resolve(data);
    } catch (error: any) {
      reject(error.response.statusText);
    }
  });
};

const apiDeleteFromFavorites = (
  token: string,
  favoriteID: number,
): Promise<Favorite> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/favorites`,
        {
          params: {
            id: favoriteID,
          },
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

      resolve(data);
    } catch (error: any) {
      reject(error.response.statusText);
    }
  });
};

export const getFavorites = createAsyncThunk(
  '/favorites',
  async (data: { token: string; page: number; limit?: number }, thunkAPI) => {
    try {
      return await apiGetFavorites(data.token, data.page, data.limit);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const addToFavorites = createAsyncThunk(
  '/add-favorites',
  async (data: { token: string; cat: Cat }, thunkAPI) => {
    try {
      return await apiAddToFavorites(data.token, data.cat);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const deleteFromFavorites = createAsyncThunk(
  '/delete-favorites',
  async (data: { token: string; favoriteID: number }, thunkAPI) => {
    try {
      return await apiDeleteFromFavorites(data.token, data.favoriteID);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
