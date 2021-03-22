import * as ActionTypes from "constants/ActionTypes";
import OutletService from "services/outlet";
import history from "utils/history";

export function getOutlet(id) {
  return async (dispatch) => {
    console.log(id, "Hitted");
    try {
      dispatch(fetchRequest());
      const responseData = await OutletService.getOutlet(id);
      dispatch({
        type: ActionTypes.GET_SINGLE_OUTLET,
        payload: responseData,
      });
    } catch (errorData) {
      dispatch(fetchError());
    }
  };
}
export function fetchRequest() {
  return {
    type: ActionTypes.FETCH_REQUEST,
  };
}
export function fetchError() {
  return {
    type: ActionTypes.FETCH_ERROR,
  };
}
