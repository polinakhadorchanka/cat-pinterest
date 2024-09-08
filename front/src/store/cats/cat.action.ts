import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Cat } from '../../types/cat.ts';

const apiGetCats = (page: number = 0): Promise<Cat[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cats`, {
        params: {
          page,
        },
      });
      resolve(data);
    } catch (error: any) {
      reject(error.response.statusText);
    }
  });
};

export const getCats = createAsyncThunk(
  '/cats',
  async (data: { page: number }, thunkAPI) => {
    try {
      return await apiGetCats(data.page);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
