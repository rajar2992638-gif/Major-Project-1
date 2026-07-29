import {
  WISHLIST_ADD_ITEM,
  WISHLIST_REMOVE_ITEM,
} from "../constants/wishlistConstants";

// Add Product to Wishlist
export const addToWishlist = (product) => (dispatch, getState) => {
  dispatch({
    type: WISHLIST_ADD_ITEM,
    payload: product,
  });

  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlistItems)
  );
};

// Remove Product from Wishlist
export const removeFromWishlist = (id) => (dispatch, getState) => {
  dispatch({
    type: WISHLIST_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlistItems)
  );
};