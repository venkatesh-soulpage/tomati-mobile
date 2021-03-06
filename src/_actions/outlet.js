import * as ActionTypes from "constants/ActionTypes";
import OutletService from "services/outlet";

export function getOutlet(id) {
  return async (dispatch) => {
    try {
      dispatch(fetchRequest());
      const responseData = await OutletService.getOutlet(id);
      dispatch({
        type: ActionTypes.GET_SINGLE_OUTLET,
        payload: responseData,
      });
    } catch (errorData) {
      dispatch(fetchError(errorData));
    }
  };
}
export function fetchRequest() {
  return {
    type: ActionTypes.FETCH_REQUEST,
  };
}
export function fetchError(error) {
  return {
    type: ActionTypes.FETCH_ERROR,
    payload: error,
  };
}
