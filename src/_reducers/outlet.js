import * as ActionTypes from "constants/ActionTypes";

var initialState = {
  isFetching: null,
  outlet: {},
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_SINGLE_OUTLET:
      return {
        ...state,
        outlet: action.payload,
        isFetching: false,
      };

    default:
      return state;
  }
}
