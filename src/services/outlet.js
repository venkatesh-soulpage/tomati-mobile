import axios from "axios";
import "utils/axios_configuration";
import * as APIRoutes from "constants/APIRoutes";
class OutletAPI {
  static async getOutlet(id) {
    try {
      const response = await axios.get(`${APIRoutes.GET_OUTLET}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}
export default OutletAPI;
