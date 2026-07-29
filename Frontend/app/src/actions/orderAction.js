import axios from "axios";

import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,

  ORDER_MY_LIST_REQUEST,
  ORDER_MY_LIST_SUCCESS,
  ORDER_MY_LIST_FAIL,

} from "../constants/orderConstants";



// ================= CREATE ORDER =================

export const createOrder = (order) => async (dispatch, getState) => {

  try {

    dispatch({
      type: ORDER_CREATE_REQUEST,
    });


    const {
      userLogin:{ userInfo }
    } = getState();


    const config = {

      headers:{
        "Content-Type":"application/json",
      }

    };


    if(userInfo){

      config.headers.Authorization =
      `Bearer ${userInfo.token}`;

    }



    const {data} = await axios.post(

      "/api/orders/add/",

      order,

      config

    );


    dispatch({

      type:ORDER_CREATE_SUCCESS,

      payload:data

    });



  } catch(error){


    dispatch({

      type:ORDER_CREATE_FAIL,

      payload:
      error.response?.data?.detail ||
      error.message

    });


  }

};





// ================= MY ORDERS =================


export const listMyOrders = () => async(dispatch,getState)=>{


  try{


    dispatch({

      type:ORDER_MY_LIST_REQUEST

    });



    const {

      userLogin:{userInfo}

    } = getState();



    const config={

      headers:{

        Authorization:
        `Bearer ${userInfo.token}`

      }

    };



    const {data}=await axios.get(

      "/api/orders/myorders/",

      config

    );



    dispatch({

      type:ORDER_MY_LIST_SUCCESS,

      payload:data

    });



  }

  catch(error){


    dispatch({

      type:ORDER_MY_LIST_FAIL,

      payload:
      error.response?.data?.detail ||
      error.message

    });


  }


};