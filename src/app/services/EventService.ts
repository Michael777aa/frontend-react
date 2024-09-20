import axios from "axios";
import { serverApi } from "../../lib/config";
import { Event } from "../../lib/types/event";

class EventService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getEvents(): Promise<Event[]> {
    try {
      let url = `${this.path}/event/all`;

      const result = await axios.get(url);
      console.log("getEvents: ", result);

      return result.data;
    } catch (err) {
      console.log("Error, getEvents: ", err);
      throw err;
    }
  }
}
export default EventService;
