import {
  createSlice,
  createAsyncThunk,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { getStatusLoading } from './IngredientsSlice';
import { orderBurgerApi, getIngredientsApi } from '@api';

type TBurgerContructurState = {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: Array<TConstructorIngredient>;
  };
  loading: boolean;
  error: null | undefined | string;
  orderRequst: boolean;
  orderModalData: TOrder | null;
};

type IngredientsKey = TIngredient & {
  key: string;
};

const initialState: TBurgerContructurState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  loading: false,
  error: null,
  orderRequst: false,
  orderModalData: null
};

export const createOrder = createAsyncThunk(
  'ordre/createOrder',
  async (data: string[]) => {
    const res = await orderBurgerApi(data);
    return res;
  }
);

export const burgerCostructorSlice = createSlice({
  name: 'burgerconstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const key = nanoid();
        return { payload: { ...ingredient, id: key } };
      }
    },
    removeIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload.id
        );
    },
    moveUpIngredient: (state, action: PayloadAction<number> ) => {
        const index = action.payload;
        if(index > 0) {
            const ingredients = state.constructorItems.ingredients;
            [ingredients[index - 1], ingredients[index]] = [
                ingredients[index],
                ingredients[index - 1]
            ]
        }
    },
    moveDownIngredient: (state, action: PayloadAction<number> ) => {
        const index = action.payload;
        if(index < state.constructorItems.ingredients.length - 1) {
            const ingredients = state.constructorItems.ingredients;
            [ingredients[index + 1], ingredients[index]] = [
                ingredients[index],
                ingredients[index + 1]
            ]
        }
    },
    clearOrder: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
    .addCase(createOrder.pending, (state) => {
        state.orderRequst = false;
        state.error = null
    })
     .addCase(createOrder.rejected, (state, action) => {
        state.orderRequst = false;
        state.error = action.error.message
    })
     .addCase(createOrder.fulfilled, (state, action) => {
        state.constructorItems.bun = null
        state.constructorItems.ingredients = []
        state.orderRequst = false;
        state.orderModalData = action.payload.order
        state.error = null
    })
  },
  selectors: {
    getConstructorItems: (state) => state.constructorItems,
    getLoading: (state) => state.loading,
    getError: (state) => state.error,
    getOrderRequst: (state) => state.orderRequst,
    getOrderModalData: (state) => state.orderModalData,
  }
});

export const {
    addIngredient,
    removeIngredient,
    moveUpIngredient,
    moveDownIngredient,
    clearOrder
} = burgerCostructorSlice.actions

export const {
    getConstructorItems,
    getLoading,
    getError,
    getOrderRequst,
    getOrderModalData
} = burgerCostructorSlice.selectors

export default burgerCostructorSlice;

