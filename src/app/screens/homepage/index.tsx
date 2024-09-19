import React, { useEffect } from "react";
import Advertisement from "./Advertisement";
import Events from "./Events";
import Statistics from "./Statistics";
import "../../../css/home.css";
import { CartItem } from "../../../lib/types/search";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ChosenProduct from "../productsPage/ChosenProduct";
import ActiveUsers from "./ActiveUsers";
import Satisfaction from "./Satisfaction";
import Shop from "./Shop";
import ProductSwiper from "./Swiper";

interface ProductsPageProps {
  onAdd: (item: CartItem) => void;
}

// REDUX SLICE

export default function HomePage(props: ProductsPageProps) {
  const { onAdd } = props;
  const product = useRouteMatch();

  return (
    <div className={"homepage"}>
      <Statistics />
      <Switch>
        <Route path={`${product.path}/:productId`}>
          <ChosenProduct onAdd={onAdd} />
        </Route>
        <Route path={`${product.path}`}>
          <Shop onAdd={onAdd} />
        </Route>
      </Switch>

      <Advertisement />
      <ActiveUsers />
      <Events />
      <Satisfaction />
    </div>
  );
}
