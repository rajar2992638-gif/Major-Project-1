import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import { Container } from "react-bootstrap";
import Home from "./Components/Home";

import SignupScreen from "./Components/Screens/SignupScreen";
import LoginScreen from "./Components/Screens/LoginScreen";
import ProductDetails from "./Components/Screens/ProductDetails";
import CartScreen from "./Components/Screens/CartScreen";
import ShippingScreen from "./Components/Screens/ShippingScreen";
import PaymentScreen from "./Components/Screens/PaymentScreen";
import PlaceOrderScreen from "./Components/Screens/PlaceOrderScreen";
import OrderSuccessScreen from "./Components/Screens/OrderSuccessScreen";
import ProfileScreen from "./Components/Screens/ProfileScreen";
import EditProfileScreen from "./Components/Screens/EditProfileScreen";
import WishlistScreen from "./Components/Screens/WishlistScreen";
import MyOrdersScreen from "./Components/Screens/MyOrdersScreen";
import DashboardScreen from "./Components/Screens/Admin/DashboardScreen";
import OrderDetailsScreen from "./Components/Screens/OrderDetailsScreen";
import MobilesScreen from "./Components/Screens/MobilesScreen";
import CategoryScreen from "./Components/Screens/CategoryScreen";
import ChangePasswordScreen from "./Components/Screens/ChangePasswordScreen";




export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <Container>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search/:keyword" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/Signup" element={<SignupScreen />} />
              <Route path="/Login" element={<LoginScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/cart/:id" element={<CartScreen />} />
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/ordersuccess" element={<OrderSuccessScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/profile/edit" element={<EditProfileScreen />} />
              <Route path="/wishlist" element={<WishlistScreen />} />
              <Route path="/myorders" element={<MyOrdersScreen/>}/>
              <Route path="/admin/dashboard" element={<DashboardScreen />} />
              <Route path="/order/:id" element={<OrderDetailsScreen />} />
              <Route path="/mobile" element={<MobilesScreen />} />
              <Route path="/category/:category" element={<CategoryScreen />} />
              <Route path="/change-password" element={<ChangePasswordScreen />} />
   
  

              

            </Routes>


          </Container>
        </main>
      </BrowserRouter>
    </>
  );
}