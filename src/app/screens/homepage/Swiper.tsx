import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper";
import {
  Container,
  Stack,
  Button,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import { ShoppingBag as ShoppingBagIcon } from "@mui/icons-material";
import moment from "moment";
import { Product, ProductInquiry } from "../../../lib/types/product";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "../../../css/home.css";
import { setProducts } from "./slice";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import { retrieveProducts } from "./selector";
import { CartItem } from "../../../lib/types/search";
import { useDispatch, useSelector } from "react-redux";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { useHistory } from "react-router-dom";
import ProductService from "../../services/ProductService";
import { serverApi } from "../../../lib/config";

const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface SwiperProps {
  onAdd: (item: CartItem) => void;
}

export default function ProductSwiper(props: SwiperProps) {
  const { onAdd } = props;
  const { products } = useSelector(productsRetriever);

  const history = useHistory();

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className="swipers">
      <Container disableGutters>
        <h1 className="hot-sales"> HOT sales</h1>
        <Stack className="product-wrapper2">
          {/* Custom navigation buttons */}
          <Box ref={prevRef} className="prev-button">
            <ArrowBackIcon className="icon" />
          </Box>
          <Box ref={nextRef} className="next-button">
            <ArrowForwardIcon className="icon" />
          </Box>

          <Swiper
            className={"swiper-main"}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            modules={[Navigation, Autoplay]}
            spaceBetween={10}
            slidesPerView={4}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
          >
            {products.length !== 0 ? (
              products.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                const sizeVolume =
                  product.productCollection === "DRINK"
                    ? product.productVolume + ""
                    : product.productSize + "";
                const producedDate = moment(product.createdAt).format(
                  "DD MM YYYY"
                );

                return (
                  <SwiperSlide key={product._id}>
                    <Stack
                      onClick={() => chooseDishHandler(product._id)}
                      className="product-card"
                    >
                      <Stack className="product-img-container">
                        <Stack
                          className="product-img"
                          sx={{ backgroundImage: `url(${imagePath})` }}
                        ></Stack>
                      </Stack>
                      <div className="product-size">{sizeVolume}</div>
                      <Stack className="bottom-side">
                        <div>
                          <>
                            <span className="product-sale2">
                              -{product.productSale}%
                            </span>
                            <span className="product-sale-price">
                              ${product.productSalePrice}
                            </span>
                            <span className="product-sale-original-price2">
                              List:
                              <span className="product-sale-original-price">
                                ${product.productPrice}
                              </span>
                            </span>
                          </>
                        </div>

                        <Button
                          className="shop-btn"
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
                          <ShoppingBagIcon className="icon-button" />
                          Add to cart
                        </Button>
                      </Stack>

                      <Box className="product-desc">
                        <span className="product-salee1">
                          {product.productLeftCount} left
                        </span>
                        <span className="product-soldd1">
                          {product.productSold} sold
                        </span>
                        <span className="product-title">
                          {product.productName}
                        </span>
                        <span className="product-title1">
                          {product.productDesc}
                        </span>
                        <span className="product-produced-date">
                          Prod:{producedDate}
                        </span>
                      </Box>
                    </Stack>
                  </SwiperSlide>
                );
              })
            ) : (
              <Box className="no-datasss">Products are not available!</Box>
            )}
          </Swiper>
        </Stack>
      </Container>
    </div>
  );
}
