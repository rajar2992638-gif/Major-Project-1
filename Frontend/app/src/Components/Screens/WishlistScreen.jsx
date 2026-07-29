import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
} from "react-bootstrap";
import {
  FaHeart,
  FaShoppingCart,
  FaTrash,
  FaStar,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./WishlistScreen.css";

function WishlistScreen() {
  const navigate = useNavigate();

  const defaultWishlist = [
    {
      _id: 1,
      name: "Apple iPhone 16",
      image: "https://via.placeholder.com/300x300",
      price: 79999,
      oldPrice: 89999,
      rating: 4.8,
      discount: "11% OFF",
    },
    {
      _id: 2,
      name: "Samsung Galaxy S25",
      image: "https://via.placeholder.com/300x300",
      price: 69999,
      oldPrice: 79999,
      rating: 4.6,
      discount: "12% OFF",
    },
    {
      _id: 3,
      name: "OnePlus 13",
      image: "https://via.placeholder.com/300x300",
      price: 59999,
      oldPrice: 65999,
      rating: 4.7,
      discount: "9% OFF",
    },
  ];

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");

    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    } else {
      setWishlist(defaultWishlist);
      localStorage.setItem(
        "wishlist",
        JSON.stringify(defaultWishlist)
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter(
      (item) => item._id !== id
    );
    setWishlist(updatedWishlist);
  };

  return (
    <Container className="wishlist-page mt-4">

      <div className="wishlist-header">
        <h2>
          <FaHeart className="heart-icon" /> My Wishlist
        </h2>

        <Badge bg="danger">
          {wishlist.length} Items
        </Badge>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center mt-5">
          <h2>❤️ Your Wishlist is Empty</h2>

          <Button
            variant="primary"
            className="mt-3"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </Button>
        </div>
      ) : (
        <Row>
          {wishlist.map((product) => (
            <Col
              lg={3}
              md={4}
              sm={6}
              xs={12}
              key={product._id}
              className="mb-4"
            >
              <Card className="wishlist-card h-100">

                <div className="wishlist-image-box">

                  <Card.Img
                    variant="top"
                    src={product.image}
                    className="wishlist-image"
                  />

                  <Badge
                    bg="success"
                    className="discount-badge"
                  >
                    {product.discount}
                  </Badge>

                </div>

                <Card.Body>

                  <Card.Title className="product-title">
                    {product.name}
                  </Card.Title>

                  <div className="rating-box mb-2">
                    <Badge bg="success">
                      {product.rating}
                      <FaStar className="ms-1" />
                    </Badge>
                  </div>

                  <h4 className="price text-primary">
                    ₹{product.price}
                  </h4>

                  <p
                    className="old-price"
                    style={{
                      textDecoration: "line-through",
                      color: "gray",
                    }}
                  >
                    ₹{product.oldPrice}
                  </p>

                  <div className="d-grid gap-2">

                    <Button
                      variant="warning"
                      onClick={() =>
                        navigate(`/product/${product._id}`)
                      }
                    >
                      <FaShoppingCart className="me-2" />
                      Add To Cart
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() =>
                        removeFromWishlist(product._id)
                      }
                    >
                      <FaTrash className="me-2" />
                      Remove
                    </Button>

                  </div>

                </Card.Body>

              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default WishlistScreen;