import { createSlice } from '@reduxjs/toolkit';
import { 
    fetchMeals, 
  
} from './testThunk';

const initialState= {
    meals:[],
    loading: 'idle',
    error: null,
  }

  const testSlice = createSlice({
    initialState,
    name: 'meals',
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchMeals.pending, (state) => {
            state.loading = 'pending';
          })
          .addCase(fetchMeals.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.meals = action.payload;
          })
          .addCase(fetchMeals.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message;
          });
      }
  })

  export default testSlice.reducer;