import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
  newDishes: [],
  products: [],
  events: [],
  topUsers: [],
  coupons: [],
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setTopUsers: (state, action) => {
      state.topUsers = action.payload;
    },
    setCoupons: (state, action) => {
      state.coupons = action.payload;
    },
  },
});

export const { setEvents, setTopUsers, setCoupons, setProducts } =
  homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;
