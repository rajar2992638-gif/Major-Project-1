
import axios from "axios";

import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from "../constants/userConstants";

// Render Backend URL
axios.defaults.baseURL = "https://raja-ecommerce-backend.onrender.com";

// ===================== SIGNUP =====================

export const signup = (fname, lname, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGNUP_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/register/",
      {
        fname,
        lname,
        email,
        password,
      },
      config
    );

    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload:
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message,
    });
  }
};

// ===================== LOGIN =====================

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/user/login/",
      {
        username: email,
        password,
      },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message,
    });
  }
};

// ===================== LOGOUT =====================

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");

  dispatch({ type: USER_LOGOUT });

  window.location.href = "/login";
};

// ===================== CHANGE PASSWORD =====================

export const changePassword =
  (oldPassword, newPassword) => async (dispatch, getState) => {
    try {
      dispatch({ type: "CHANGE_PASSWORD_REQUEST" });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.put(
        "/api/users/change-password/",
        {
          oldPassword,
          newPassword,
        },
        config
      );

      dispatch({
        type: "CHANGE_PASSWORD_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "CHANGE_PASSWORD_FAIL",
        payload:
          error.response?.data?.detail ||
          error.response?.data?.message ||
          error.message,
      });
    }
  };
