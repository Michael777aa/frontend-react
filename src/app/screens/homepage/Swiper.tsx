import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Container, Stack, Button, Box } from "@mui/material";
import { ShoppingBag as ShoppingBagIcon } from "@mui/icons-material";
import moment from "moment";
import { Product } from "../../../lib/types/product";

interface SwiperProps {
  products: Product[];
  serverApi: string;
  chooseDishHandler: (id: string) => void;
  onAdd: (product: any) => void;
}

export default function ProductSwiper({
  products,
  serverApi,
  chooseDishHandler,
  onAdd,
}: SwiperProps) {
  return (
    <Container>
      <Stack className="product-wrapper">
        <Swiper
          style={{
            width: "100%",
            height: "500px",
          }}
          navigation={true}
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
            <Box className="no-data">Products are not available!</Box>
          )}
        </Swiper>
      </Stack>
    </Container>
  );
}
