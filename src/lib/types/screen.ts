import { Member } from "./member";
import { Order } from "./order";
import { Product } from "./product";
import { Event } from "./event";
import { Coupan } from "./coupan";

// REACT APP STATE
export interface AppRootState {
  homePage: HomePageState;
  productsPage: ProductsPageState;
  ordersPage: OrdersPageState;
}

// HOMEPAGE
export interface HomePageState {
  newDishes: Product[];
  products: Product[];
  topUsers: Member[];
  events: Event[];
  coupons: Coupan[];
}

// PRODUCTSPAGE
export interface ProductsPageState {
  products: Product[];
  restaurant: Member | null;
  chosenProduct: Product | null;
}

// ORDERSPAGE
export interface OrdersPageState {
  pausedOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
}
