import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
  popularDishes: [],
  newDishes: [],
  products: [],
  events: [],
  topUsers: [],
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
    setTopUsers: (state, action) => {
      state.topUsers = action.payload;
    },
  },
});

export const { setNewDishes, setEvents, setTopUsers, setProducts } =
  homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;
