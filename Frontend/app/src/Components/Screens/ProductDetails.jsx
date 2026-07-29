import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../Loader";
import Message from "../Message";
import { listProductDetails } from "../../actions/productAction";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const productDetails = useSelector(
    (state) => state.productDetails
  );

  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  // Add To Cart
  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  // Add To Wishlist
  const addToWishlistHandler = () => {
    if (!product) return;

    let wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    const exist = wishlist.find(
      (item) => item._id === product._id
    );

    if (exist) {
      alert("❤️ Product already in Wishlist");
      return;
    }

    wishlist.push(product);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );

    alert("✅ Product Added To Wishlist");
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {/* Product Image */}
          <Col md={6}>
            <div style={{ position: "relative" }}>
              <Image
                src={product?.image}
                alt={product?.name}
                fluid
              />

              <Button
                variant="light"
                onClick={addToWishlistHandler}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  padding: "0",
                  fontSize: "20px",
                  border: "1px solid #ddd",
                  background: "#fff",
                  zIndex: 1000,
                }}
              >
                ❤️
              </Button>
            </div>
          </Col>

          {/* Product Details */}
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product?.name}</h3>
              </ListGroup.Item>

              <ListGroup.Item>
                Price: <strong>₹{product?.price}</strong>
              </ListGroup.Item>

              <ListGroup.Item>
                Description: {product?.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          {/* Purchase Box */}
          <Col md={3}>
            <ListGroup>

              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>₹{product?.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product?.countInStock > 0
                      ? "In Stock"
                      : "Out Of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

              {product?.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>

                    <Col>
                      <Form.Select
                        value={qty}
                        onChange={(e) =>
                          setQty(Number(e.target.value))
                        }
                      >
                        {[...Array(product.countInStock).keys()].map(
                          (x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          )
                        )}
                      </Form.Select>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  className="w-100"
                  type="button"
                  onClick={addToCartHandler}
                  disabled={product?.countInStock === 0}
                >
                  🛒 Add To Cart
                </Button>
              </ListGroup.Item>

            </ListGroup>
          </Col>

        </Row>
      )}
    </>
  );
};

export default ProductDetails;