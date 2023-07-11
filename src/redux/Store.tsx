import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './ProductsSlice';

const Store = configureStore({
  reducer: {
    cartList: cartReducer,
  },
});

export default Store;
