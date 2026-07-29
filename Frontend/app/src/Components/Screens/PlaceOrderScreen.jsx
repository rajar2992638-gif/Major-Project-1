import React, { useEffect } from "react";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import Message from "../Message";
// createOrder action not available in actions file; dispatching request directly
import { ORDER_CREATE_RESET } from "../../constants/orderConstants";
import { createOrder } from "../../actions/orderAction";

function PlaceOrderScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const orderCreate = useSelector((state) => state.orderCreate);

  const {
    loading,
    success,
    error,
    order,
  } = orderCreate;

  const itemsPrice = Number(
    cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)
  );

  const shippingPrice = itemsPrice > 1000 ? 0 : 100;

  const taxPrice = Number((itemsPrice * 0.18).toFixed(2));

  const totalPrice = Number(
    (itemsPrice + shippingPrice + taxPrice).toFixed(2)
  );

useEffect(() => {
  if (success) {
    dispatch({
      type: ORDER_CREATE_RESET,
    });

    localStorage.removeItem("cartItems");

    navigate("/ordersuccess");
  }
}, [dispatch, success, navigate]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
  };
  return (
    <Row>
      <Col md={8}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h3>Shipping Address</h3>

            <p>
              {shippingAddress.address}, {shippingAddress.city}
            </p>

            <p>
              {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
          </ListGroup.Item>

          <ListGroup.Item>
            <h3>Payment Method</h3>

            <p>{paymentMethod}</p>
          </ListGroup.Item>

          <ListGroup.Item>
            <h3>Order Items</h3>

            {cartItems.length === 0 ? (
              <Message>Your Cart is Empty</Message>
            ) : (
              cartItems.map((item) => (
                <Row key={item._id} className="mb-3">
                  <Col>{item.name}</Col>

                  <Col>
                    {item.qty} × ₹{item.price}
                  </Col>

                  <Col>
                    ₹{(item.qty * item.price).toFixed(2)}
                  </Col>
                </Row>
              ))
            )}
          </ListGroup.Item>
        </ListGroup>
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>Order Summary</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              Items : ₹{itemsPrice}
            </ListGroup.Item>

            <ListGroup.Item>
              Shipping : ₹{shippingPrice}
            </ListGroup.Item>

            <ListGroup.Item>
              GST : ₹{taxPrice}
            </ListGroup.Item>

            <ListGroup.Item>
              <h4>Total : ₹{totalPrice}</h4>
            </ListGroup.Item>

            {loading && <Loader />}

            {error && (
              <Message variant="danger">
                {error}
              </Message>
            )}

            <ListGroup.Item>
              <Button
                className="w-100"
                variant="success"
                disabled={cartItems.length === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default PlaceOrderScreen;

