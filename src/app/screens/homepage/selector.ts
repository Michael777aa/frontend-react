import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;

export const retrieveeEvents = createSelector(
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
