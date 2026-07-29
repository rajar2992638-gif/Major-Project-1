import React from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Badge,
} from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";

import {
  FaShoppingCart,
  FaUserCircle,
  FaHeart,
  FaStore,
} from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";

import SearchBox from "./SearchBox";

import { logout } from "../actions/userAction";

import "./Header.css";


function Header() {


  const dispatch = useDispatch();


  const userLogin = useSelector(
    (state) => state.userLogin
  );

  const { userInfo } = userLogin;



  const cart = useSelector(
    (state)=>state.cart
  );


  const cartCount =
    cart?.cartItems
    ?
    cart.cartItems.length
    :
    0;



  const logoutHandler = () => {

    dispatch(logout());

  };



  return (


    <Navbar
      expand="lg"
      sticky="top"
      className="main-header"
    >


      <Container fluid className="header-container">


        {/* Logo */}

        <LinkContainer to="/">

          <Navbar.Brand className="brand-logo">

            <FaStore className="brand-icon"/>

            Raja Shop

          </Navbar.Brand>

        </LinkContainer>



        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
        />



        <Navbar.Collapse id="basic-navbar-nav">


          {/* Search */}

          <div className="search-area">

            <SearchBox/>

          </div>




          {/* Right Menu */}


          <Nav className="header-menu">



            {/* Wishlist */}

            <LinkContainer to="/wishlist">

              <Nav.Link className="header-icon">

                <FaHeart size={23}/>

              </Nav.Link>

            </LinkContainer>





            {/* Cart */}

            <LinkContainer to="/cart">

              <Nav.Link className="header-icon cart-icon">


                <FaShoppingCart size={23}/>



                {
                  cartCount > 0 &&

                  <Badge
                    bg="danger"
                    pill
                    className="cart-badge"
                  >

                    {cartCount}

                  </Badge>

                }


              </Nav.Link>

            </LinkContainer>







            {/* User */}

            {
              userInfo ?


              (

                <NavDropdown

                  title={
                    <>

                    <FaUserCircle size={23}/>

                    <span className="ms-1">

                      {userInfo.name}

                    </span>

                    </>
                  }


                  id="user-dropdown"

                >




                <LinkContainer to="/profile">

                  <NavDropdown.Item>

                    My Profile

                  </NavDropdown.Item>

                </LinkContainer>




                <LinkContainer to="/myorders">

                  <NavDropdown.Item>

                    My Orders

                  </NavDropdown.Item>

                </LinkContainer>





                {
                  userInfo.isAdmin &&

                  <>


                  <NavDropdown.Divider/>


                  <LinkContainer to="/admin/dashboard">

                    <NavDropdown.Item>

                      Dashboard

                    </NavDropdown.Item>

                  </LinkContainer>




                  <LinkContainer to="/admin/products">

                    <NavDropdown.Item>

                      Products

                    </NavDropdown.Item>

                  </LinkContainer>




                  <LinkContainer to="/admin/orders">

                    <NavDropdown.Item>

                      Orders

                    </NavDropdown.Item>

                  </LinkContainer>




                  <LinkContainer to="/admin/users">

                    <NavDropdown.Item>

                      Users

                    </NavDropdown.Item>

                  </LinkContainer>


                  </>


                }



                <NavDropdown.Divider/>


                <NavDropdown.Item
                  onClick={logoutHandler}
                >

                  Logout

                </NavDropdown.Item>



                </NavDropdown>


              )



              :



              (


                <>


                <LinkContainer to="/login">

                  <Nav.Link className="login-btn">

                    Login

                  </Nav.Link>

                </LinkContainer>





                <LinkContainer to="/signup">

                  <Nav.Link className="register-btn">

                    Register

                  </Nav.Link>

                </LinkContainer>



                </>


              )

            }





          </Nav>




        </Navbar.Collapse>




      </Container>



    </Navbar>


  );

}



export default Header;