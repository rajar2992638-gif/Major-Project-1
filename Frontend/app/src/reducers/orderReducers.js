import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_RESET,
  ORDER_MY_LIST_REQUEST,
  ORDER_MY_LIST_SUCCESS,
  ORDER_MY_LIST_FAIL,
} from "../constants/orderConstants";

// ================= CREATE ORDER =================

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };

    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };

    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case ORDER_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

// ================= MY ORDERS =================

export const orderMyListReducer = (
  state = { orders: [] },
  action
) => {
  switch (action.type) {
    case ORDER_MY_LIST_REQUEST:
      return {
        loading: true,
        orders: [],
      };

    case ORDER_MY_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case ORDER_MY_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};