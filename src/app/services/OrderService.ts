import axios from "axios";
import { serverApi } from "../../lib/config";
import {
  Order,
  OrderInquiry,
  OrderItemInput,
  OrderUpdateInput,
} from "../../lib/types/order";
import { CartItem } from "../../lib/types/search";
import { Coupan, CoupanInput } from "../../lib/types/coupan";

class OrderService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async createOrder(
    input: CartItem[],
    couponName: string | undefined,
    totalPrice: number | undefined
  ): Promise<Order> {
    try {
      const orderItems: OrderItemInput[] = input.map((cartItem: CartItem) => {
        return {
          itemQuantity: cartItem.quantity,
          itemPrice: cartItem.price,
          productId: cartItem._id,
          totalPrice: totalPrice,
          couponName: couponName,
        };
      });

      const url = `${this.path}/order/create`;
      const result = await axios.post(url, orderItems, {
        withCredentials: true,
      });

      console.log("createOrder", result);
      return result.data;
    } catch (err) {
      console.log("Error, createOrder: ", err);
      throw err;
    }
  }

  public async getMyOrders(input: OrderInquiry): Promise<Order[]> {
    try {
      const url = `${this.path}/order/all`;
      const query = `?page=${input.page}&limit=${input.limit}&orderStatus=${input.orderStatus}`;

      const result = await axios.get(url + query, { withCredentials: true });

      console.log("getMyOrder: ", result);

      return result.data;
    } catch (err) {
      console.log("Error, getMyOrders: ", err);
      throw err;
    }
  }

  public async updateOrder(input: OrderUpdateInput): Promise<Order> {
    try {
      const url = `${this.path}/order/update`;
      const result = await axios.post(url, input, { withCredentials: true });
      console.log("result", result);

      return result.data;
    } catch (err) {
      console.log("Error, updateOrder:");
      throw err;
    }
  }
}

export default OrderService;
