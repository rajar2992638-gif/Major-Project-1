import React, { useEffect } from "react";
import {
  Row,
  Col,
  Container,
  Button,
  Card
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
  const { loading, error, products } = productsList;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <Container fluid className="px-4">

      {!keyword && (
        <>
          <Carousel
            autoPlay
            infiniteLoop
            interval={4000}
            showThumbs={false}
            showStatus={false}
            showIndicators={true}
            swipeable={true}
          >

            <div className="text-banner">
              <h1>WELCOME TO RAJA SHOP</h1>
              <p>Your One-Stop Online Shopping Destination</p>
              <button>Shop Now</button>
            </div>

            <div className="text-banner">
              <h1>Latest Gadgets & Electronics</h1>
              <p>Upgrade Your Life With Smart Products</p>
              <button>Explore Now</button>
            </div>

            <div className="text-banner">
              <h1>Trendy Fashion Collection</h1>
              <p>Style That Matches Your Personality</p>
              <button>Shop Now</button>
            </div>

            <div className="text-banner">
              <h1>Amazing Deals & Offers</h1>
              <p>Grab Your Favourite Products Today</p>
              <button>View Deals</button>
            </div>

            <div className="text-banner">
              <h1>Quality Products</h1>
              <p>Fast Delivery • Best Service</p>
              <button>Start Shopping</button>
            </div>

          </Carousel>

          <div className="category-menu">

  <Link to="/category/Mobiles">
    <Button className="category-btn mobile-btn">
      📱 Mobiles
    </Button>
  </Link>

  <Link to="/category/Laptops">
    <Button className="category-btn laptop-btn">
      💻 Laptops
    </Button>
  </Link>

  <Link to="/category/Headphones">
    <Button className="category-btn headphone-btn">
      🎧 Headphones
    </Button>
  </Link>

  <Link to="/category/Watches">
    <Button className="category-btn watch-btn">
      ⌚ Watches
    </Button>
  </Link>
{/* 
  <Link to="/category/Camera">
    <Button className="category-btn camera-btn">
      📷 Camera
    </Button>
  </Link> */}

  <Link to="/category/Gaming">
    <Button className="category-btn gaming-btn">
      🎮 Gaming
    </Button>
  </Link>

</div>



          <h2 className="text-center fw-bold mb-4">
            {keyword ? `Search Results: "${keyword}"` : " Latest Products"}
          </h2>
          {
            loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <>
                {/* Today's Deals */}
                <div className="my-5">
                  <h3 className="fw-bold mb-4">⚡ Today's Deals</h3>

                  <Row className="g-4">

                    <Col md={3}>
                      <Card className="offer-card shadow text-center">
                        <Card.Body>
                          <h5>📱 Smartphones</h5>
                          <h3 className="text-danger">50% OFF</h3>
                          <Button variant="danger">
                            Shop Now
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col md={3}>
                      <Card className="offer-card shadow text-center">
                        <Card.Body>
                          <h5>💻 Laptops</h5>
                          <h3 className="text-success">40% OFF</h3>
                          <Button variant="success">
                            Buy Now
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col md={3}>
                      <Card className="offer-card shadow text-center">
                        <Card.Body>
                          <h5>⌚ Smart Watches</h5>
                          <h3 className="text-warning">60% OFF</h3>
                          <Button variant="warning">
                            Explore
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col md={3}>
                      <Card className="offer-card shadow text-center">
                        <Card.Body>
                          <h5>🎧 Headphones</h5>
                          <h3 className="text-primary">35% OFF</h3>
                          <Button variant="primary">
                            View
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>

                  </Row>
                </div>

                {/* Product Section */}

                <h3 className="fw-bold mt-5 mb-4">
                  🛍️ Trending Products
                </h3>

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


                <Row className="mb-4">

                  <Col md={4}>
                    <Card className="offer-card text-center shadow">
                      <Card.Body>
                        <h3>🔥 Mega Sale</h3>
                        <p>Up to 70% OFF</p>
                        <Button variant="danger">
                          Shop Now
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col md={4}>
                    <Card className="offer-card text-center shadow">
                      <Card.Body>
                        <h3>🚚 Free Delivery</h3>
                        <p>Orders Above ₹999</p>
                        <Button variant="success">
                          Buy Now
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card className="offer-card text-center shadow">
                      <Card.Body>
                        <h3>💳 Bank Offer</h3>
                        <p>10% Instant Cashback</p>
                        <Button variant="primary">
                          Explore
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>

                </Row>
              </>
            )
          }



          {/* Festival Banner */}

          {/* Festival Banner */}

<Card className="festival-banner mt-5 text-center shadow-lg">

  <Card.Body>

    <h2>🎉 Festival Sale</h2>

    <h4>Up To 80% OFF</h4>

    <p>
      Mobiles • Laptops • Fashion • Electronics
    </p>

    <Button
      className="shop-btn"
      size="lg"
    >
      Shop Now
    </Button>

  </Card.Body>

</Card>

        </>
      )}
    </Container>
  );
}

export default Home;