import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { productDetailsReducers, productListReducers } from "./reducers/productReducers";
// import {userSignupReducers} from './reducers/userReducers';
import { userLoginReducers, userSignupReducers } from "./reducers/userReducers";
import { cartReducers } from "./reducers/cartReducers";
// import { orderCreateReducer } from "./reducers/orderReducers";
import {
  orderCreateReducer,
  orderMyListReducer,
} from "./reducers/orderReducers";



const reducers = combineReducers({
  productsList: productListReducers,
  productDetails: productDetailsReducers,
  userSignup: userSignupReducers,
  userLogin: userLoginReducers,

  cart: cartReducers,
  orderCreate: orderCreateReducer,
  orderMyList: orderMyListReducer,
});


const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : "";




const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },

  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;