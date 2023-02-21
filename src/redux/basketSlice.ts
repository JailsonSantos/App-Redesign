import { RootState } from './store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BasketState {
  products: Product[];
  quantity: number;
  total: number;
}

const initialState: BasketState = {
  products: [],
  quantity: 0,
  total: 0,
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.total += action.payload.total;

      if (!state.products[0]?._id) {
        state.quantity += 1;
        state.products[0] = action.payload;
      } else {
        const productFound = state.products.find(element => element._id === action.payload._id);

        if (!productFound) {
          state.quantity += 1;
          state.products.push(action.payload);
        } else {
          state.products = state.products.map((product) => {
            if (product._id === action.payload._id) {
              product.quantityOfProduct += action.payload.quantityOfProduct;
            }
            return product;
          })
        }
      }
    },
    deleteProduct: (state, action) => {
      state.quantity -= 1;

      const newTotalOfProducts = state.products.filter(product => product._id !== action.payload._id)

      state.total = newTotalOfProducts.reduce((result, quantity) => {
        const newTotal = quantity.quantityOfProduct * Number(quantity.price)
        return (result + newTotal)
      }, 0);

      state.products = state.products.filter(product => product._id !== action.payload._id)
    },
    addTotal: (state, action) => {
      state.total += action.payload.total;
      state.products = state.products.map(product => {
        if (product._id === action.payload._id) {
          product = action.payload;
        }
        return product;
      })
    },
    minusTotal: (state, action) => {
      state.total -= action.payload.total;
      state.products = state.products.map(product => {
        if (product._id === action.payload._id) {
          product = action.payload;
        }
        return product;
      })
    },
    clearAllItemsFromBasket: (state, action) => {
      state.products = [action.payload];
      state.quantity = 0;
      state.total = 0;
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  addProduct,
  deleteProduct,

  addTotal,
  minusTotal,

  clearAllItemsFromBasket,
} = basketSlice.actions;

// Selectors -> retrieving items in state to use in different components
export const selectBasketTotal = (state: RootState) => state.basket.total;
export const selectBasketItems = (state: RootState) => state.basket.products;
export const selectBasketQuantity = (state: RootState) => state.basket.quantity;
export const selectBasketItemsWithId = (state: RootState, id: string) => {
  state.basket.products.filter((item: Product) => item._id === id)
};

export default basketSlice.reducer;