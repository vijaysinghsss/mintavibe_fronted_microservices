
import {
  LOGIN_USER_DATA,
  LOGOUT_USER_DATA,
  SIGNUP_USER_DATA,
} from "../actions/ActionTypes";

const initialState = {
  signUpUser: null,
  loginUserData: {},
};

const userDataReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case SIGNUP_USER_DATA:
      return {
        ...state,
        signUpUser: payload,
      };
    case LOGIN_USER_DATA:
      return {
        ...state,
        loginUserData: payload,
      };
    case LOGOUT_USER_DATA:
      return {
        ...state,
        loginUserData: payload,
      };
    default:
      return state;
  }
};

export default userDataReducer;
