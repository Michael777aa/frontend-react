import React, { useState } from "react";
import { Box, CardContent, Container, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { CssVarsProvider } from "@mui/joy/styles";
import Divider from "../../components/divider";
import Typography from "@mui/joy/Typography";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewDishes } from "./selector";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

const newDishesRetriever = createSelector(retrieveNewDishes, (newDishes) => ({
  newDishes,
}));
interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function NewDishes(props: ProductsProps) {
  const { newDishes } = useSelector(newDishesRetriever);
  const { onAdd } = props;

  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 4,
    order: "updatedAt",
    productCollection: ProductCollection.DISH,
    search: "",
  });
  const history = useHistory();

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return <div></div>;
}
