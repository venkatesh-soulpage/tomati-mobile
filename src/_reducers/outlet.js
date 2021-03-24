import * as ActionTypes from "constants/ActionTypes";

var initialState = {
  isFetching: null,
  outlet: null,
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_SINGLE_OUTLET:
      return {
        ...state,
        outlet: action.payload,
        isFetching: false,
      };
    case ActionTypes.FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      };
    case ActionTypes.FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    default:
      return state;
  }
}
