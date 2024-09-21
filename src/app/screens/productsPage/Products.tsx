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
import { GiFruitTree } from "react-icons/gi";
import { GiWrappedSweet } from "react-icons/gi";
import { TbMeat } from "react-icons/tb";
import { FaCottonBureau } from "react-icons/fa";
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
  padding: "0 25px",
  minWidth: "auto",
  height: "48px",
  "&:hover": {
    backgroundColor: "#ffb524",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
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
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);

  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 9,
    order: "createdAt",
    productCollections: [
      ProductCollection.FRUITS,
      ProductCollection.VEGETABLES,
      ProductCollection.SWEETS,
      ProductCollection.MEAT,
      ProductCollection.OTHER,
    ],
    search: "",
  });

  const [searchText, setSearchText] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const history = useHistory();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productService = new ProductService();
        const allProducts = await productService.getProducts(productSearch);
        // Filter products based on the selected price range
        const filteredProducts = allProducts.filter(
          (product: Product) =>
            product.productPrice >= priceRange[0] &&
            product.productPrice <= priceRange[1]
        );

        const saleItems = filteredProducts.filter(
          (product: Product) => product.productSale && product.productSale > 0
        );
        setProducts(filteredProducts);
        setSaleProducts(saleItems.slice(0, 3));
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [productSearch, priceRange]);

  useEffect(() => {
    const productService = new ProductService();
    productService
      .getProducts(productSearch)
      .then((products: Product[]) => {
        const filteredProducts = products.filter(
          (product) => (product as any).productSale > 0
        );
        setSaleProducts(filteredProducts.slice(0, 3));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
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
                  style={{
                    color:
                      productSearch.productCollection ===
                      ProductCollection.FRUITS
                        ? "#ffb524"
                        : "#81c408", // Text color based on the active/inactive state
                    transition: "background-color 0.3s ease", // Smooth transition
                  }}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.FRUITS)
                  }
                >
                  <h3>
                    <GiFruitTree />
                  </h3>
                  <h2>Fruits</h2>
                </div>

                <div
                  className="category-item"
                  style={{
                    color:
                      productSearch.productCollection ===
                      ProductCollection.VEGETABLES
                        ? "#ffb524"
                        : "#81c408",
                    transition: "background-color 0.3s ease",
                  }}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.VEGETABLES)
                  }
                >
                  <h3>
                    <FaCottonBureau />
                  </h3>
                  <h2>Vegetables</h2>
                </div>

                <div
                  className="category-item"
                  style={{
                    color:
                      productSearch.productCollection ===
                      ProductCollection.SWEETS
                        ? "#ffb524"
                        : "#81c408",
                    transition: "background-color 0.3s ease",
                  }}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.SWEETS)
                  }
                >
                  <h3>
                    <GiWrappedSweet />
                  </h3>
                  <h2>Sweets</h2>
                </div>

                <div
                  className="category-item"
                  style={{
                    color:
                      productSearch.productCollection === ProductCollection.MEAT
                        ? "#ffb524"
                        : "#81c408",
                    transition: "background-color 0.3s ease",
                  }}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.MEAT)
                  }
                >
                  <h3>
                    <TbMeat />
                  </h3>
                  <h2>Meat</h2>
                </div>

                <div
                  className="category-item"
                  style={{
                    color:
                      productSearch.productCollection ===
                      ProductCollection.OTHER
                        ? "#ffb524"
                        : "#81c408",
                    transition: "background-color 0.3s ease",
                  }}
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
                  value={priceRange}
                  max={1000}
                  step={10}
                  valueLabelFormat={(value) => `$${value}`}
                  onChange={handlePriceChange}
                />

                <Typography
                  variant="h4"
                  style={{ color: "#747d88" }}
                  justifyContent={"flex-start"}
                >
                  Price: ${priceRange[0]} - ${priceRange[1]}
                </Typography>
              </Box>
              <FormControl className="selecting">
                <h2>Additional</h2>
                <RadioGroup>
                  <FormControlLabel
                    onClick={() => searchOrderHandler("createdAt")}
                    className="slidder"
                    value="New"
                    control={<Radio />}
                    label="New"
                  />
                  <FormControlLabel
                    onClick={() => searchOrderHandler("productPrice")}
                    className="slidder"
                    value="Price"
                    control={<Radio />}
                    label="Price"
                  />
                  <FormControlLabel
                    onClick={() => searchOrderHandler("productSalePrice")}
                    className="slidder"
                    value="Discount"
                    control={<Radio />}
                    label="Discount"
                  />
                  <FormControlLabel
                    onClick={() => searchOrderHandler("productSold")}
                    className="slidder"
                    value="Popular"
                    control={<Radio />}
                    label="Popular"
                  />
                </RadioGroup>
              </FormControl>
              <div className="featured-products">
                <h1>Featured Products</h1>

                <div className="main-feature">
                  {saleProducts.length > 0 ? (
                    saleProducts.map((product: Product) => {
                      const imagePath = `${serverApi}/${product.productImages[0]}`;

                      return (
                        <div
                          key={product._id}
                          onClick={() => chooseDishHandler(product._id)}
                          className="main-featured"
                        >
                          <div className="left-image">
                            <img src={imagePath} alt={product.productName} />
                          </div>
                          <div className="right-sale">
                            <h3>{product.productName}</h3>
                            <div className="right-pricing">
                              <h4>${product.productPrice}</h4>
                              <h4 className="sale-color">
                                ${product.productSalePrice}
                              </h4>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <Typography
                      style={{
                        fontSize: "20px",
                        paddingTop: "30px",
                        fontWeight: "700",
                        color: "#45595b",
                      }}
                    >
                      Onsale products not available!
                    </Typography>
                  )}
                </div>
                <div className="down-image">
                  <img src="/img/food-city.webp" alt="Food City" />
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
                        <div className="product-size2">
                          {product.productSize}
                        </div>
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
