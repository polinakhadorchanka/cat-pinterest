import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Favorite } from '../../types/favorite.ts';

const apiGetFavorites = (
  token: string,
  page: number = 0,
): Promise<Favorite[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/favorites`,
        {
          params: {
            page,
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
  async (data: { token: string; page: number }, thunkAPI) => {
    try {
      return await apiGetFavorites(data.token, data.page);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
