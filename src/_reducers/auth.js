import * as ActionTypes from "../constants/ActionTypes";

var initialState = {
  first_name: "Preetham",
  last_name: "Varanasi",
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_STEP:
      return {
        ...state,
        step: action.payload,
        isFetching: false,
      };
    default:
      return state;
  }
}
