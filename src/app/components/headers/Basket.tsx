import React, { useEffect, useState } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import { Messages, serverApi } from "../../../lib/config";
import {
  sweetErrorHandling,
  sweetTopSuccessAlert,
} from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import { retrieveCoupons } from "../../screens/homePage/selector";
import { setCoupons } from "../../screens/homePage/slice";
import { Coupan } from "../../../lib/types/coupan";
import CoupanService from "../../services/CoupanService";
import { useDispatch, useSelector } from "react-redux";
import { log } from "console";

const actionDispatch = (dispatch: Dispatch) => ({
  setCoupons: (data: Coupan[]) => dispatch(setCoupons(data)),
});

const couponRetriever = createSelector(retrieveCoupons, (coupons) => ({
  coupons,
}));

interface BasketProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

export default function Basket(props: BasketProps) {
  const dispatch = useDispatch();
  const { setCoupons } = actionDispatch(dispatch);
  const { coupons } = useSelector(couponRetriever);
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const history = useHistory();
  const [couponCode, setCouponCode] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState<string>("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const coupan = new CoupanService();
    coupan
      .getCoupons()
      .then((data) => {
        console.log("Coupons fetched: ", data);
        setCoupons(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const applyCoupon = () => {
    const foundCoupon = coupons.find(
      (e: Coupan) =>
        e?.name?.toLowerCase().trim() === couponCode.toLowerCase().trim()
    );
    if (foundCoupon) {
      const discountValue = Number(foundCoupon.discount);
      if (!isNaN(discountValue) && discountValue > 0 && discountValue <= 100) {
        setDiscount(discountValue);
        setCouponError("");
      }
    } else {
      setDiscount(0);
      setCouponError("Invalid coupon");
    }
  };
  const itemsPrice: number = cartItems.reduce(
    (a: number, c: CartItem) => a + c.quantity * c.price,
    0
  );
  const shippingCost: number = itemsPrice < 100 ? 5 : 0;
  const discountFactor = 1 - discount / 100;
  const totalPrice: number = (itemsPrice + shippingCost) * discountFactor;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const proceedOrderHandler = async () => {
    try {
      handleClose();
      if (!authMember) throw new Error(Messages.error2);
      const order = new OrderService();
      await order.createOrder(cartItems);
      onDeleteAll();
      sweetTopSuccessAlert("Successfully added to Orders");
      setOrderBuilder(new Date());
      history.push("/orders");
    } catch (err) {
      sweetErrorHandling(err);
    }
  };

  const deleteAllProducts = async () => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const confirmation = window.confirm(
        "Do you want to remove all products from the basket?"
      );
      if (confirmation) {
        onDeleteAll();
        sweetTopSuccessAlert("All products have been removed from basket");
      }
    } catch (err) {
      sweetErrorHandling(err);
    }
  };

  return (
    <Box className={"cart-bag"}>
      <IconButton
        className="icon-button"
        aria-label="cart"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Badge
          badgeContent={cartItems.length}
          style={{ position: "relative", top: "-14px", left: "30px" }}
          color="secondary"
        ></Badge>
        <ShoppingBagIcon className="icon-button" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Stack className={"basket-frame"}>
          <Box className={"all-check-box"}>
            {cartItems.length === 0 ? (
              <div>Cart is empty!</div>
            ) : (
              <Stack flexDirection={"row"}>
                <div>Cart Products: </div>
                <DeleteForeverIcon
                  sx={{
                    ml: "5px",
                    position: "relative",
                    left: "360px",
                    cursor: "pointer",
                  }}
                  color={"primary"}
                  onClick={() => deleteAllProducts()}
                />
              </Stack>
            )}
          </Box>

          <Box className={"orders-main-wrapper"}>
            <Box className={"orders-wrapper"}>
              {cartItems.map((item: CartItem) => {
                const imagePath = `${serverApi}/${item.image}`;
                return (
                  <Box className={"basket-info-box"} key={item._id}>
                    <div className={"cancel-btn"}></div>
                    <img src={imagePath} className={"product-img"} />
                    <span className={"product-name"}>{item.name}</span>
                    <Box className={"qty-box"}>
                      <button
                        className="qty-btn werwe"
                        onClick={() => onRemove(item)}
                      >
                        -
                      </button>
                      <span className="hellow">{item.quantity}</span>
                      <button
                        className="qty-btn ewrwrew"
                        onClick={() => onAdd(item)}
                      >
                        +
                      </button>
                    </Box>
                    <span className={"price-text"}>${item.price}</span>
                    <CancelIcon
                      color={"primary"}
                      onClick={() => onDelete(item)}
                    />
                  </Box>
                );
              })}
            </Box>
            {cartItems.length !== 0 && (
              <>
                <Box className={"apply-coupon"}>
                  <TextField
                    className="coupan"
                    id="outlined-basic"
                    label="Apply coupon"
                    variant="outlined"
                    value={couponCode}
                    size="small"
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <Button
                    variant={"contained"}
                    color={"secondary"}
                    className="coupon-btn"
                    onClick={() => applyCoupon()}
                  >
                    Apply
                  </Button>
                </Box>
                {couponError && <p className="error-text">{couponError}</p>}
                <Box className={"total-price-area"}>
                  <div>Items Price</div>
                  <span>${itemsPrice.toFixed(2)}</span>
                </Box>
                <Box className={"total-price-area"}>
                  <div>Shipping Price</div>
                  <span>${shippingCost.toFixed(2)}</span>
                </Box>
                <Box className={"total-price-area"}>
                  <div>Total Price</div>
                  <span>${totalPrice.toFixed(2)}</span>
                </Box>
                <Box>
                  <Button
                    className={"cart-button"}
                    variant={"contained"}
                    color={"primary"}
                    onClick={() => proceedOrderHandler()}
                  >
                    Proceed Order
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Stack>
      </Menu>
    </Box>
  );
}
