import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;

export const retrieveNewDishes = createSelector(
  selectHomePage,
  (HomePage) => HomePage.newDishes
);

export const retrieveTopUsers = createSelector(
  selectHomePage,
  (HomePage) => HomePage.topUsers
);
export const retrieveProducts = createSelector(
  selectHomePage,
  (productsPage) => productsPage.products
);
export const retrieveRestaurant = createSelector(
  selectHomePage,
  (productsPage) => productsPage.restaurant
);

export const retrieveChosenProduct = createSelector(
  selectHomePage,
  (productsPage) => productsPage.chosenProduct
);
