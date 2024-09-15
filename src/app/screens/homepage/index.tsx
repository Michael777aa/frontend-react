import React, { useEffect } from "react";
import ActiveUsers from "./ActiveUsers";
import Advertisement from "./Advertisement";
import Events from "./Events";
import NewDishes from "./NewDishes";
import Statistics from "./Statistics";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import MemberService from "../../services/MemberService";
import "../../../css/home.css";
import { Member } from "../../../lib/types/member";
import { CartItem } from "../../../lib/types/search";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ChosenProduct from "./ChosenProduct";
import Products from "./Products";

interface ProductsPageProps {
  onAdd: (item: CartItem) => void;
}

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

export default function HomePage(props: ProductsPageProps) {
  const { setPopularDishes, setNewDishes, setTopUsers } = actionDispatch(
    useDispatch()
  );
  const { onAdd } = props;
  const product = useRouteMatch();

  useEffect(() => {
    // Data fetch
    const product = new ProductService();
    const member = new MemberService();
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        productCollection: ProductCollection.DISH,
      })
      .then((data) => {
        console.log("data: ", data);
        setPopularDishes(data);
      })
      .catch((err) => {
        console.log(err);
      });

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

      <NewDishes />

      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}
