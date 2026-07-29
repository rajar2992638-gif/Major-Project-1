import React, { useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../../actions/cartAction";

function CartScreen() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const qty = location.search
    ? Number(location.search.split("=")[1])
    : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <Row>
      <Col md={8}>
        <h2>Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <h5>Your Cart is Empty</h5>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row className="align-items-center">
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>

                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>
                      {item.name}
                    </Link>
                  </Col>

                  <Col md={2}>₹{item.price}</Col>

                  <Col md={2}>
                    Qty : {item.qty}
                  </Col>

                  <Col md={2}>
                    ₹{item.qty * item.price}
                  </Col>

                  <Col md={1}>
                    <Button
                      variant="danger"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      X
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>
                Total (
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                ) Items
              </h4>

              <h4>
                ₹
                {cartItems.reduce(
                  (acc, item) => acc + item.qty * item.price,
                  0
                )}
              </h4>
            </ListGroup.Item>

            <ListGroup.Item>
            
              <Button
                className="w-100"
                disabled={cartItems.length === 0}
                onClick={() => navigate("/shipping")}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CartScreen;