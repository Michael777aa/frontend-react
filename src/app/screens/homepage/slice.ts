import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
  popularDishes: [],
  newDishes: [],
  products: [],
  events: [],
  restaurant: null,
  chosenProduct: null,
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setNewDishes: (state, action) => {
      state.newDishes = action.payload;
    },
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
    },
    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },
  },
});

export const {
  setNewDishes,
  setEvents,
  setRestaurant,
  setProducts,
  setChosenProduct,
} = homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;
