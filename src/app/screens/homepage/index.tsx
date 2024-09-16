import React, { useEffect } from "react";
import Advertisement from "./Advertisement";
import Events from "./Events";
import Statistics from "./Statistics";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewDishes, setEvents, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import "../../../css/home.css";
import { CartItem } from "../../../lib/types/search";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Products from "./Products";
import ChosenProduct from "../productsPage/ChosenProduct";
import EventService from "../../services/EventService";
import { Member } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import ActiveUsers from "./ActiveUsers";
import Satisfaction from "./Satisfaction";

interface ProductsPageProps {
  onAdd: (item: CartItem) => void;
}

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

export default function HomePage(props: ProductsPageProps) {
  const { setNewDishes, setTopUsers } = actionDispatch(useDispatch());
  const { onAdd } = props;
  const product = useRouteMatch();

  useEffect(() => {
    // Data fetch
    const product = new ProductService();
    const member = new MemberService();
    const event = new EventService();

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
      })
      .then((data) => {
        console.log("data: ", data);
        setNewDishes(data);
      })
      .catch((err) => {
        console.log(err);
      });
    member
      .getTopUsers()
      .then((data) => {
        console.log("data: ", data);
        setTopUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={"homepage"}>
      <Statistics />
      <Switch>
        <Route path={`${product.path}/:productId`}>
          <ChosenProduct onAdd={onAdd} />
        </Route>
        <Route path={`${product.path}`}>
          <Products onAdd={onAdd} />
        </Route>
      </Switch>
      <Advertisement />
      <ActiveUsers />
      <Events />
      <Satisfaction />
    </div>
  );
}
