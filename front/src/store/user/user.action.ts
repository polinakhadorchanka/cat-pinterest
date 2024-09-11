import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types/user.ts';
import { VITE_API_URL } from '../../types/constants.ts';

const apiGetUser = (): Promise<User> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL ?? VITE_API_URL}/users`,
      );
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
