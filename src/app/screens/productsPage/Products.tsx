import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  PaginationItem,
  Pagination,
  Slider,
  TextField,
  styled,
} from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";

import { ArrowBack, ArrowForward } from "@mui/icons-material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { retrieveProducts } from "./selector";
import { createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { setProducts } from "./slice";
import { Dispatch } from "@reduxjs/toolkit";
import { Product, ProductInquiry } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import moment from "moment";
const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "50px",
  backgroundColor: "#81c408",
  color: "#fff",
  padding: "0 25px", // Adjust padding to fit text
  minWidth: "auto", // Adjust to fit content
  height: "48px", // Match the height of the Stack
  "&:hover": {
    backgroundColor: "#ffb524", // Darker orange color
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Box shadow on hover
  },
  display: "flex",
  alignItems: "center",
}));

const StyledInput = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "20px",
    height: "40px",
    "& fieldset": {
      borderRadius: "20px",
      border: "none",
    },
  },
}));
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 9,
    order: "createdAt",
    productCollections: [
      ProductCollection.DISH,
      ProductCollection.SALAD,
      ProductCollection.DESSERT,
      ProductCollection.DRINK,
      ProductCollection.OTHER,
    ],
    search: "",
  });

  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    // Data fetch
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => {
        console.log("data: ", data);
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  // HANDLERS
  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };
  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <>
      <div>
        <Container>
          <Stack
            className="titlee3"
            display={"flex"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            flexDirection={"row"}
          >
            <Typography className="title-text22" fontSize={"36px"}>
              Fresh Products
            </Typography>
            <Stack className="search-box-main22">
              <Box className={"search-box22"}>
                <StyledInput
                  className="search-input22"
                  type="search"
                  placeholder="Search"
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") searchProductHandler();
                  }}
                />
                <StyledButton
                  className="search-icon22"
                  onClick={searchProductHandler}
                >
                  SEARCH
                  <SearchIcon />
                </StyledButton>
              </Box>
            </Stack>
          </Stack>
          <div className="main-container2">
            <div className="left-container2">
              <h1 className="categories-name">Categories</h1>
              <div className="category-container2">
                <div
                  className="category-item"
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DISH)
                  }
                >
                  <h3>
                    <CakeIcon />
                  </h3>
                  <h2>Fruits</h2>
                </div>
                <div
                  className="category-item"
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.SALAD)
                  }
                >
                  <h3>
                    <CakeIcon />
                  </h3>
                  <h2>Vegetables</h2>
                </div>
                <div
                  className="category-item"
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DRINK)
                  }
                >
                  <h3>
                    <CakeIcon />
                  </h3>
                  <h2>Sweets</h2>
                </div>
                <div
                  className="category-item"
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DESSERT)
                  }
                >
                  <h3>
                    <CakeIcon />
                  </h3>
                  <h2>Meat</h2>
                </div>
                <div
                  className="category-item"
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.OTHER)
                  }
                >
                  <h3>
                    <CakeIcon />
                  </h3>
                  <h2>Others</h2>
                </div>
              </div>
              <Box sx={{ width: 250 }} className="price">
                <h1 className="pricw2">Price</h1>
                <Slider
                  step={10}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `$${value}`}
                  aria-labelledby="range-slider"
                  sx={{ mt: 2 }}
                />

                <Typography
                  variant="h4"
                  style={{ color: "#747d88" }}
                  justifyContent={"flex-start"}
                >
                  Price$ {/* {priceRange[0]} - ${priceRange[1]} */}
                </Typography>
              </Box>
              <FormControl className="selecting">
                <h2>Additional</h2>
                <RadioGroup>
                  <FormControlLabel
                    className="slidder"
                    value="All"
                    control={<Radio />}
                    label="All"
                  />
                  <FormControlLabel
                    className="slidder"
                    value="New"
                    control={<Radio />}
                    label="New"
                  />
                  <FormControlLabel
                    className="slidder"
                    value="Price"
                    control={<Radio />}
                    label="Price"
                  />
                  <FormControlLabel
                    className="slidder"
                    value="Discount"
                    control={<Radio />}
                    label="Discount"
                  />
                  <FormControlLabel
                    className="slidder"
                    value="Popular"
                    control={<Radio />}
                    label="Popular"
                  />
                </RadioGroup>
              </FormControl>
              <div className="featured-products">
                <h1>Featured products</h1>

                <div className="main-feauture">
                  <div className="main-featured">
                    <div className="left-image">
                      <img src="/img/featur-1.jpg" alt="" />
                    </div>
                    <div className="right-sale">
                      <h3>Big Banana</h3>
                      <div className="right-pricing">
                        <h4>123$</h4>
                        <h4 className="sale-color">1231$</h4>
                      </div>
                    </div>
                  </div>
                  <div className="main-featured">
                    <div className="left-image">
                      <img src="/img/featur-1.jpg" alt="" />
                    </div>
                    <div className="right-sale">
                      <h3>Big Banana</h3>
                      <div className="right-pricing">
                        <h4>123$</h4>
                        <h4 className="sale-color">1231$</h4>
                      </div>
                    </div>
                  </div>
                  <div className="main-featured">
                    <div className="left-image">
                      <img src="/img/featur-1.jpg" alt="" />
                    </div>
                    <div className="right-sale">
                      <h3>Big Banana</h3>
                      <div className="right-pricing">
                        <h4>123$</h4>
                        <h4 className="sale-color">1231$</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="buttot">View More</button>
                <div className="down-image">
                  <img src="/img/food-city.webp" alt="" />
                </div>
              </div>
            </div>
            <div className="right-container2">
              <Stack
                className="product-wrapper2"
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"flex-start"}
                alignItems={"center"}
              >
                {products.length !== 0 ? (
                  products.map((product: Product) => {
                    const imagePath = `${serverApi}/${product.productImages[0]}`;
                    const sizeVolume =
                      product.productCollection === ProductCollection.DRINK
                        ? product.productVolume + ""
                        : product.productSize + "";
                    const producedDate = moment(product.createdAt).format(
                      "DD MM YYYY"
                    );

                    return (
                      <Stack
                        onClick={() => chooseDishHandler(product._id)}
                        key={product._id}
                        className="product-card2"
                      >
                        <Stack className={"product-img-container22"}>
                          <Stack
                            className="product-img2"
                            sx={{ backgroundImage: `url(${imagePath})` }}
                          ></Stack>
                        </Stack>
                        <div className="product-size2">{sizeVolume}</div>
                        <Stack className={"bottom-side2"} flexDirection={"row"}>
                          <div>
                            {product.productSale && product.productSale > 0 ? (
                              <>
                                <span className={"product-sale22"}>
                                  -{product.productSale}%
                                </span>
                                <span className={"product-sale-price2"}>
                                  ${product.productSalePrice}
                                </span>
                                <span
                                  className={"product-sale-original-price222"}
                                >
                                  List:
                                  <span
                                    className={"product-sale-original-price"}
                                  >
                                    ${product.productPrice}
                                  </span>
                                </span>
                              </>
                            ) : (
                              <span className="product-price2">
                                ${product.productPrice}
                              </span>
                            )}
                          </div>

                          <Button
                            className="shop-btn22"
                            onClick={(e) => {
                              e.stopPropagation();
                              onAdd({
                                _id: product._id,
                                quantity: 1,

                                price: product.productSalePrice
                                  ? product.productSalePrice
                                  : product.productPrice,
                                name: product.productName,
                                image: product.productImages[0],
                              });
                            }}
                          >
                            <ShoppingBagIcon className="icon-button22" />
                            Add to cart
                          </Button>
                        </Stack>
                        <span className={"product-salee12"}>
                          {product.productLeftCount} left
                        </span>
                        <span className={"product-soldd12"}>
                          {product.productSold} sold
                        </span>
                        <Box className={"product-desc2"}>
                          <span className={"product-title2"}>
                            {product.productName}
                          </span>
                          <span className={"product-title12"}>
                            {product.productDesc}
                          </span>
                          <span className={"product-produced-date2"}>
                            Prod:{producedDate}
                          </span>
                        </Box>
                      </Stack>
                    );
                  })
                ) : (
                  <Box className="no-dataaaaa">Products are not available!</Box>
                )}
              </Stack>
              <Stack
                className="pagination-section2"
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Pagination
                  className="pagination-one2"
                  count={
                    products.length !== 0
                      ? productSearch.page + 1
                      : productSearch.page
                  }
                  page={productSearch.page}
                  renderItem={(item) => (
                    <PaginationItem
                      className="pagination-one"
                      components={{ previous: ArrowBack, next: ArrowForward }}
                      {...item}
                    />
                  )}
                  onChange={paginationHandler}
                />
              </Stack>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
