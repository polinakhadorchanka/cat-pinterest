import { Cat } from '../../types/cat.ts';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const apiGetUser = (): Promise<Cat[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
      resolve(data);
    } catch (error: any) {
      reject(error.response.statusText);
    }
  });
};

export const getUser = createAsyncThunk('/user', async (_data, thunkAPI) => {
  try {
    return await apiGetUser();
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
