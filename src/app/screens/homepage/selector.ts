import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;

export const retrieveNewDishes = createSelector(
  selectHomePage,
  (HomePage) => HomePage.newDishes
);

export const retrieveEvents = createSelector(
  selectHomePage,
  (HomePage) => HomePage.events
);
export const retrieveProducts = createSelector(
  selectHomePage,
  (productsPage) => productsPage.products
);
export const retrieveTopUsers = createSelector(
  selectHomePage,
  (HomePage) => HomePage.topUsers
);
