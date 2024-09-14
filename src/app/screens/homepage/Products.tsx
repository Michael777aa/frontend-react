import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  TextField,
  Badge,
  PaginationItem,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";
import {
  AddBox,
  ArrowBack,
  ArrowForward,
  MonetizationOn,
  RemoveRedEye,
} from "@mui/icons-material";
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
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import moment from "moment";
const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "20px",
  backgroundColor: "#343434",
  color: "#D7B586",
  padding: "0 20px", // Adjust padding to fit text
  minWidth: "auto", // Adjust to fit content
  height: "40px", // Match the height of the Stack
  "&:hover": {
    backgroundColor: "#343434", // Darker orange color
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
    limit: 8,
    order: "createdAt",
    productCollections: [
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
      <Container>
        <Stack className="products">
          <Stack className="dishes-filter-section">
            <Stack className="title">
              <Typography className="title-text" fontSize={"36px"}>
                Our Organic Products
              </Typography>

              <Stack className="product-category">
                <Button
                  sx={{
                    backgroundColor:
                      productSearch.productCollection === ProductCollection.DISH
                        ? "#ffb524" // Active button color
                        : "#f4f6f8", // Inactive button color
                    color:
                      productSearch.productCollection === ProductCollection.DISH
                        ? "#ffffff" // Text color for the active button
                        : "#000000", // Text color for the inactive button
                    "&:hover": {
                      backgroundColor:
                        productSearch.productCollection ===
                        ProductCollection.DISH
                          ? "#e6a11f" // Darker shade on hover for active button
                          : "#e0e3e6", // Slightly darker shade on hover for inactive button
                    },
                    borderRadius: "8px",
                    padding: "10px 20px",
                    transition: "background-color 0.3s ease",
                  }}
                  variant="contained"
                  className={"order"}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DISH)
                  }
                >
                  All Products
                </Button>

                <Button
                  sx={{
                    backgroundColor:
                      productSearch.productCollection ===
                      ProductCollection.SALAD
                        ? "#ffb524"
                        : "#f4f6f8",
                    color:
                      productSearch.productCollection ===
                      ProductCollection.SALAD
                        ? "#ffffff"
                        : "#000000",
                    "&:hover": {
                      backgroundColor:
                        productSearch.productCollection ===
                        ProductCollection.SALAD
                          ? "#e6a11f"
                          : "#e0e3e6",
                    },
                    borderRadius: "8px",
                    padding: "10px 20px",
                    transition: "background-color 0.3s ease",
                  }}
                  variant="contained"
                  className={"order"}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.SALAD)
                  }
                >
                  Vegetables
                </Button>

                <Button
                  sx={{
                    backgroundColor:
                      productSearch.productCollection ===
                      ProductCollection.DRINK
                        ? "#ffb524"
                        : "#f4f6f8",
                    color:
                      productSearch.productCollection ===
                      ProductCollection.DRINK
                        ? "#ffffff"
                        : "#000000",
                    "&:hover": {
                      backgroundColor:
                        productSearch.productCollection ===
                        ProductCollection.DRINK
                          ? "#e6a11f"
                          : "#e0e3e6",
                    },
                    borderRadius: "8px",
                    padding: "10px 20px",
                    transition: "background-color 0.3s ease",
                  }}
                  className={"order"}
                  variant="contained"
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DRINK)
                  }
                >
                  Fruits
                </Button>

                <Button
                  sx={{
                    backgroundColor:
                      productSearch.productCollection ===
                      ProductCollection.DESSERT
                        ? "#ffb524"
                        : "#f4f6f8",
                    color:
                      productSearch.productCollection ===
                      ProductCollection.DESSERT
                        ? "#ffffff"
                        : "#000000",
                    "&:hover": {
                      backgroundColor:
                        productSearch.productCollection ===
                        ProductCollection.DESSERT
                          ? "#e6a11f"
                          : "#e0e3e6",
                    },
                    borderRadius: "8px",
                    padding: "10px 20px",
                    transition: "background-color 0.3s ease",
                  }}
                  variant="contained"
                  className={"order"}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DESSERT)
                  }
                >
                  Bread
                </Button>

                <Button
                  sx={{
                    backgroundColor:
                      productSearch.productCollection ===
                      ProductCollection.OTHER
                        ? "#ffb524"
                        : "#f4f6f8",
                    color:
                      productSearch.productCollection ===
                      ProductCollection.OTHER
                        ? "#ffffff"
                        : "#000000",
                    "&:hover": {
                      backgroundColor:
                        productSearch.productCollection ===
                        ProductCollection.OTHER
                          ? "#e6a11f"
                          : "#e0e3e6",
                    },
                    borderRadius: "8px",
                    padding: "10px 20px",
                    transition: "background-color 0.3s ease",
                  }}
                  variant="contained"
                  className={"order"}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.OTHER)
                  }
                >
                  Meat
                </Button>
              </Stack>
            </Stack>
          </Stack>

          <Stack className="search-box-main">
            <Box className={"search-box"}>
              <StyledInput
                className="search-input"
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
                className="search-icon"
                onClick={searchProductHandler}
              >
                SEARCH
                <SearchIcon />
              </StyledButton>
            </Box>
          </Stack>

          {/* PRODUCTS */}

          <Stack className="product-wrapper">
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
                    className="product-card"
                  >
                    <Stack className={"product-img-container"}>
                      <Stack
                        className="product-img"
                        sx={{ backgroundImage: `url(${imagePath})` }}
                      ></Stack>
                    </Stack>
                    <div className="product-size">{sizeVolume}</div>
                    <Stack className={"bottom-side"}>
                      <div className={"product-price"}>
                        ${product.productPrice}/kg
                      </div>
                      <Button
                        className="shop-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAdd({
                            _id: product._id,
                            quantity: 1,
                            price: product.productPrice,
                            name: product.productName,
                            image: product.productImages[0],
                          });
                        }}
                      >
                        <ShoppingBagIcon className="icon-button" />
                        Add to cart
                      </Button>
                    </Stack>

                    <Box className={"product-desc"}>
                      <span className={"product-salee1"}>
                        {product.productLeftCount}kg left
                      </span>
                      <span className={"product-soldd1"}>
                        {product.productSold}kg sold
                      </span>{" "}
                      <span className={"product-title"}>
                        {product.productName}
                      </span>
                      <span className={"product-title1"}>
                        {product.productDesc}
                      </span>
                      <span className={"product-produced-date"}>
                        Prod:{producedDate}
                      </span>
                      {/* <span className={"product-salee1"}>
                        {product.productSale}
                      </span>
                      <span className={"product-salee1"}>
                        {product.productSalePrice}
                      </span>
                      */}
                    </Box>
                  </Stack>
                );
              })
            ) : (
              <Box className="no-data">Products are not available!</Box>
            )}
          </Stack>

          <Stack className="pagination-section">
            <Pagination
              count={
                products.length !== 0
                  ? productSearch.page + 1
                  : productSearch.page
              }
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{ previous: ArrowBack, next: ArrowForward }}
                  {...item}
                  color={"secondary"}
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>

      <div className="brands-logo">
        <Container>
          <Stack
            flexDirection={"column"}
            alignItems="center"
            justifyContent={"center"}
            gap={"59px"}
          >
            <Box className="brands-title">Our Family Brands</Box>
            <Stack className="cards-holder">
              <Box className="brand-card">
                <img
                  src="/img/gurme.webp"
                  alt="/img/gurme.webp"
                  width={"250px"}
                  height={"330px"}
                />
              </Box>
              <Box className="brand-card">
                <img
                  src="/img/seafood.webp"
                  alt="/img/seafood.webp"
                  width={"250px"}
                  height={"330px"}
                />
              </Box>
              <Box className="brand-card">
                <img
                  src="/img/sweets.webp"
                  alt="/img/sweets.webp"
                  width={"250px"}
                  height={"330px"}
                />
              </Box>
              <Box className="brand-card">
                <img
                  src="/img/doner.webp"
                  alt="/img/doner.webp"
                  width={"250px"}
                  height={"330px"}
                />
              </Box>
            </Stack>
          </Stack>
        </Container>
      </div>

      <div className="address">
        <Container>
          <Stack className="address-area">
            <Box className="category-title">Our address</Box>
            <iframe
              className="iframe"
              style={{ marginTop: "60px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2998.058020369046!2d69.20311957628236!3d41.28584170228747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8a31ca66d417%3A0x5755ff29b7bf33a!2sRayhon%20National%20Meals%20Restaurant!5e0!3m2!1sen!2s!4v1720933891847!5m2!1sen!2s"
              width={"1204"}
              height={"504"}
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </>
  );
}
