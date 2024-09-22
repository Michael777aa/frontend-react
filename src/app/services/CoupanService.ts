import axios from "axios";
import { serverApi } from "../../lib/config";
import { Coupan } from "../../lib/types/coupan";
import { T } from "../../lib/types/common";

class CouponService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getCoupons(): Promise<Coupan[]> {
    try {
      let url = `${this.path}/coupanCreate`;

      const result = await axios.get(url);
      console.log("getCoupons: ", result);

      return result.data;
    } catch (err) {
      console.log("Error, getCoupons: ", err);
      throw err;
    }
  }

  public async verifyCoupon(input: T): Promise<Coupan> {
    try {
      const api = this.path + "/coupon/verify";
      console.log(input, "VERIFY");

      const result = await axios.post(api, input, { withCredentials: true });

      return result.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
export default CouponService;
