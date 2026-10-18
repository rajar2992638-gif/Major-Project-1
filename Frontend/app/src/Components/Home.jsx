import React, { useEffect } from "react";
import {
  Row,
  Col,
  Container,
  Button,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Home.css";

import ProductScreen from "./Screens/ProductScreen";
import Loader from "./Loader";
import Message from "./Message";
import { listProducts } from "../actions/productAction";

function Home() {
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const productsList = useSelector((state) => state.productsList);
  const { loading, error, products = [] } = productsList;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  const categories = [
    {
      name: "Mobiles",
      icon: "📱",
      className: "mobile-btn",
    },
    {
      name: "Laptops",
      icon: "💻",
      className: "laptop-btn",
    },
    {
      name: "Headphones",
      icon: "🎧",
      className: "headphone-btn",
    },
    {
      name: "Watches",
      icon: "⌚",
      className: "watch-btn",
    },
    {
      name: "Gaming",
      icon: "🎮",
      className: "gaming-btn",
    },
  ];

  const deals = [
    {
      title: "Smartphones",
      icon: "📱",
      offer: "Up to 50% OFF",
      button: "Shop Now",
      variant: "danger",
      link: "/category/Mobiles",
    },
    {
      title: "Laptops",
      icon: "💻",
      offer: "Up to 40% OFF",
      button: "Buy Now",
      variant: "success",
      link: "/category/Laptops",
    },
    {
      title: "Smart Watches",
      icon: "⌚",
      offer: "Up to 60% OFF",
      button: "Explore",
      variant: "warning",
      link: "/category/Watches",
    },
    {
      title: "Headphones",
      icon: "🎧",
      offer: "Up to 35% OFF",
      button: "View",
      variant: "primary",
      link: "/category/Headphones",
    },
  ];

  return (
    <Container fluid className="px-3 px-md-4">

      {/* ================= HERO SECTION ================= */}

      {!keyword && (
        <>
          <Carousel
            autoPlay
            infiniteLoop
            interval={4000}
            showThumbs={false}
            showStatus={false}
            showIndicators
            swipeable
            emulateTouch
          >
            <div className="text-banner">
              <h1>WELCOME TO RAJA SHOP</h1>
              <p>
                Your One-Stop Online Shopping Destination
              </p>

              <Link to="/products">
                <Button variant="light">
                  Shop Now →
                </Button>
              </Link>
            </div>

            <div className="text-banner">
              <h1>Latest Gadgets & Electronics</h1>
              <p>
                Upgrade Your Life With Smart Products
              </p>

              <Link to="/category/Mobiles">
                <Button variant="light">
                  Explore Now →
                </Button>
              </Link>
            </div>

            <div className="text-banner">
              <h1>Trendy Fashion Collection</h1>
              <p>
                Style That Matches Your Personality
              </p>

              <Link to="/products">
                <Button variant="light">
                  Shop Now →
                </Button>
              </Link>
            </div>

            <div className="text-banner">
              <h1>Amazing Deals & Offers</h1>
              <p>
                Grab Your Favourite Products Today
              </p>

              <Link to="/products">
                <Button variant="light">
                  View Deals →
                </Button>
              </Link>
            </div>

            <div className="text-banner">
              <h1>Quality Products</h1>
              <p>
                Fast Delivery • Best Service
              </p>

              <Link to="/products">
                <Button variant="light">
                  Start Shopping →
                </Button>
              </Link>
            </div>
          </Carousel>

          {/* ================= CATEGORY MENU ================= */}

          <div className="category-menu">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/category/${category.name}`}
              >
                <Button
                  className={`category-btn ${category.className}`}
                >
                  {category.icon} {category.name}
                </Button>
              </Link>
            ))}
          </div>

          {/* ================= DEALS ================= */}

          <section className="my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold mb-0">
                ⚡ Today's Deals
              </h3>

              <Link to="/products">
                <Button variant="outline-dark">
                  View All
                </Button>
              </Link>
            </div>

            <Row className="g-4">
              {deals.map((deal) => (
                <Col
                  key={deal.title}
                  xs={12}
                  sm={6}
                  lg={3}
                >
                  <Card className="offer-card shadow-sm h-100 text-center">
                    <Card.Body className="d-flex flex-column justify-content-center">
                      <div className="fs-1 mb-2">
                        {deal.icon}
                      </div>

                      <h5 className="fw-bold">
                        {deal.title}
                      </h5>

                      <h4 className="fw-bold mb-3">
                        {deal.offer}
                      </h4>

                      <Link to={deal.link}>
                        <Button
                          variant={deal.variant}
                          className="w-100"
                        >
                          {deal.button} →
                        </Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </section>
        </>
      )}

      {/* ================= PRODUCT TITLE ================= */}

      <section className="mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">
            {keyword
              ? `Search Results for "${keyword}"`
              : "🛍️ Trending Products"}
          </h2>

          {!keyword && (
            <Link to="/products">
              <Button variant="outline-dark">
                View All Products
              </Button>
            </Link>
          )}
        </div>

        {/* ================= PRODUCTS ================= */}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error}
          </Message>
        ) : products.length === 0 ? (
          <Card className="text-center shadow-sm my-5">
            <Card.Body className="py-5">
              <div className="fs-1 mb-3">
                🔍
              </div>

              <h4 className="fw-bold">
                No Products Found
              </h4>

              <p className="text-muted">
                We couldn't find any products matching your search.
              </p>

              <Link to="/">
                <Button variant="dark">
                  Back to Home
                </Button>
              </Link>
            </Card.Body>
          </Card>
        ) : (
          <Row className="g-4">
            {products.map((product) => (
              <Col
                key={product._id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
              >
                <ProductScreen product={product} />
              </Col>
            ))}
          </Row>
        )}
      </section>

      {/* ================= EXTRA OFFERS ================= */}

      {!keyword && (
        <>
          <section className="my-5">
            <Row className="g-4">

              <Col xs={12} md={4}>
                <Card className="offer-card text-center shadow-sm h-100">
                  <Card.Body className="py-4">
                    <div className="fs-1">🔥</div>

                    <h3 className="fw-bold">
                      Mega Sale
                    </h3>

                    <p className="text-muted">
                      Get amazing discounts on selected products.
                    </p>

                    <Link to="/products">
                      <Button variant="danger">
                        Shop Now →
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} md={4}>
                <Card className="offer-card text-center shadow-sm h-100">
                  <Card.Body className="py-4">
                    <div className="fs-1">🚚</div>

                    <h3 className="fw-bold">
                      Free Delivery
                    </h3>

                    <p className="text-muted">
                      Free delivery on orders above ₹999.
                    </p>

                    <Link to="/products">
                      <Button variant="success">
                        Start Shopping →
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} md={4}>
                <Card className="offer-card text-center shadow-sm h-100">
                  <Card.Body className="py-4">
                    <div className="fs-1">💳</div>

                    <h3 className="fw-bold">
                      Bank Offers
                    </h3>

                    <p className="text-muted">
                      Enjoy special offers on eligible payments.
                    </p>

                    <Link to="/products">
                      <Button variant="primary">
                        Explore →
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>

            </Row>
          </section>

          {/* ================= FESTIVAL BANNER ================= */}

          <Card className="festival-banner mt-5 mb-5 text-center shadow-lg">
            <Card.Body className="py-5">

              <div className="fs-1 mb-2">
                🎉
              </div>

              <h2 className="fw-bold">
                Festival Sale
              </h2>

              <h4 className="fw-bold">
                Up To 80% OFF
              </h4>

              <p>
                Mobiles • Laptops • Fashion • Electronics
              </p>

              <Link to="/products">
                <Button
                  className="shop-btn"
                  size="lg"
                >
                  Shop Now →
                </Button>
              </Link>

            </Card.Body>
          </Card>
        </>
      )}

    </Container>
  );
}

export default Home;