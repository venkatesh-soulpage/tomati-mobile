import axios from "axios";
import "utils/axios_configuration";
import * as APIRoutes from "constants/APIRoutes";
// TODO: axios default configurations
class AuthAPI {
  static async postLoginDetails(postData) {
    try {
      // fetch data from a url endpoint
      const response = await axios.post(APIRoutes.CLIENT_LOGIN, postData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
  static async getUserData() {
    try {
      // fetch data from a url endpoint
      const response = await axios.get(APIRoutes.GET_USER);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}
export default AuthAPI;
