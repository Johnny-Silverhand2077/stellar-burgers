import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

type TStateIngredient = {
  ingredients: Array<TIngredient>;
  loading: boolean;
  error: null | undefined | string;
};

const initialState: TStateIngredient = {
  ingredients: [],
  loading: false,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => {
    const res = await getIngredientsApi();
    return res;
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIngredients.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getIngredients.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.loading = false;
      state.ingredients = action.payload;
    });
  },
  selectors: {
    getIngredientsWirhSelector: (state) => state.ingredients,
    getStatusLoading: (state) => state.loading,
    getIngredientsState: (state) => state
  }
});

export default ingredientsSlice.reducer;
export const {
  getIngredientsWirhSelector,
  getStatusLoading,
  getIngredientsState
} = ingredientsSlice.selectors;
