import { createAsyncThunk } from '@reduxjs/toolkit';
export const fetchMeals = createAsyncThunk(
    'meals/fetchMeals',
    async () => {
    try {
          const response = await fetch('https://api.freeapi.app/api/v1/public/meals');
          const data = await response.json();
          return data.data.data;
    } catch (error) {
        return error.message
    }
    }
  );