import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface CartData {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  quntity: number;
}

interface CartState {
  cartList: CartData[];
}

const initialState: CartState = {
  cartList: [],
};

const productSlice = createSlice({
  name: 'addCart',
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<CartData>) => {
      //   console.log('action', action.payload);
      state.cartList = [...state.cartList, {...action.payload, quntity: 1}];
    },
    incrementQuntity: (state, action: PayloadAction<number>) => {
      const incrementedData = state.cartList.map((each: CartData) => {
        if (each.id === action.payload) {
          return {...each, quntity: each.quntity + 1};
        }
        return each;
      });
      state.cartList = incrementedData;
    },
    decrimentQuntity: (state, action: PayloadAction<number>) => {
      const decrimentedData = state.cartList.map((each: CartData) => {
        if (each.id === action.payload) {
          return {...each, quntity: each.quntity - 1};
        }
        return each;
      });
      state.cartList = decrimentedData;
    },
    deletItem: (state, action: PayloadAction<number>) => {
      //   console.log(action.payload);
      const filtededData = state.cartList.filter(
        (each: CartData) => each.id !== action.payload,
      );
      state.cartList = filtededData;
    },
    paymentSuccess: state => {
      state.cartList = [];
    },
  },
});

export const {
  addCart,
  incrementQuntity,
  decrimentQuntity,
  deletItem,
  paymentSuccess,
} = productSlice.actions;
export default productSlice.reducer;
