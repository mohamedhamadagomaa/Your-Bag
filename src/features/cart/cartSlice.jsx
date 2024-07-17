import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import cartItems from "../../cartItems";
import axios from "axios";
import { openModal } from "../modal/modalSlice";
const url = "https://api.npoint.io/77fb5a3b2fb88d0cc10b";

const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
};
export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (name, thunkAPI) => {
    try {
      // thunkAPI.dispatch(openModal())
      const resp = await axios(url);
      // console.log(resp);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went error ");
    }
  }
);
// in here we create a feature of our cart
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      // return { cartItems: [] };
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => {
        return item.id !== itemId;
      });
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => {
        return item.id === payload.id;
      });

      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotal: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      });
  },
});
export const { clearCart, removeItem, increase, decrease, calculateTotal } =
  cartSlice.actions;
// console.log(cartSlice);
export default cartSlice.reducer;
