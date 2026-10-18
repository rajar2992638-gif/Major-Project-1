import React, { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { FaCheckCircle } from "react-icons/fa";
import successSound from "../../assets/success.mp3";

function OrderSuccessScreen() {
  const navigate = useNavigate();
  const [showConfetti] = useState(true);

//  const navigate = useNavigate();

useEffect(() => {
  const audio = new Audio(successSound);
  audio.volume = 1;

  audio.play().catch((err) => {
    console.log("Audio play failed:", err);
  });

  setTimeout(() => {
    navigate("/myorders");
  }, 5000);
}, [navigate]);

  return (
    <>
      {showConfetti && <Confetti recycle={false} numberOfPieces={400} />}

      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg,#d4fc79 0%,#96e6a1 100%)",
        }}
      >
        <Card
          className="shadow-lg border-0 text-center p-5"
          style={{
            maxWidth: "650px",
            width: "100%",
            borderRadius: "25px",
          }}
        >
          <FaCheckCircle
            color="green"
            size={100}
            className="mb-3"
          />

          <h1 className="text-success fw-bold">
            Order Placed Successfully!
          </h1>

          <p className="fs-5 text-muted mt-3">
            Thank you for shopping with
          </p>

          <h3 className="fw-bold text-dark">
            ECOMMERCE RAJA SHOP
          </h3>

          <div className="alert alert-success mt-4">
            <h5>🎉 Your order has been confirmed.</h5>

            <p className="mb-0">
              Your order is being prepared for shipment.
            </p>
          </div>

          <p className="text-secondary">
            Redirecting to My Orders in 5 seconds...
          </p>

          <div className="d-grid gap-3 mt-3">
            <Link to="/">
              <Button
                variant="success"
                size="lg"
                className="w-100"
              >
                Continue Shopping
              </Button>
            </Link>

            <Link to="/myorders">
              <Button
                variant="outline-primary"
                size="lg"
                className="w-100"
              >
                View My Orders
              </Button>
            </Link>
          </div>
        </Card>
      </Container>
    </>
  );
}

export default OrderSuccessScreen;