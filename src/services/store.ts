import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import ingrediantsSlice  from '../slices/IngredientsSlice';
import burgerConstructorSlice  from '../slices/BurgerConstructoSlice';
import userStateSlice  from '../slices/UserInfoSlice';
import userOrderHistorySlice from '../slices/UserOrderHistorySlice';
import feedDataSlice from '../slices/FeedDataSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  [ingrediantsSlice.name]: ingrediantsSlice.reducer,
  [burgerConstructorSlice.name]:burgerConstructorSlice.reducer,
  [userStateSlice.name]: userStateSlice.reducer,
  [userOrderHistorySlice.name]: userOrderHistorySlice.reducer,
  [feedDataSlice.name]: feedDataSlice.reducer,
}); 

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
