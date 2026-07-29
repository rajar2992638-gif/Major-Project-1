import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Image,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaShoppingBag,
  FaHeart,
  FaMapMarkerAlt,
  FaLock,
  FaSignOutAlt,
  FaCamera,
  FaAngleRight,
} from "react-icons/fa";

import "./ProfileScreen.css";

import { Link } from "react-router-dom";

function ProfileScreen() {
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const uploadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
      localStorage.setItem("profileImage", reader.result);
    };
    reader.readAsDataURL(file);
  };

  // stat cards data -> flip card la use pannurom
  const statCards = [
    {
      icon: <FaShoppingBag size={30} />,
      front: "12",
      label: "Total Orders",
      back: "Last order: iPhone 15 Pro",
      color: "stat-blue",
    },
    {
      icon: <FaHeart size={30} />,
      front: "5",
      label: "Wishlist Items",
      back: "Tap Wishlist to view saved items",
      color: "stat-pink",
    },
    {
      icon: <FaEnvelope size={30} />,
      front: "₹18,500",
      label: "Total Purchase",
      back: "Across 12 orders this year",
      color: "stat-green",
    },
  ];

  return (
    <div className="profile-page py-4">
      <Row>
        {/* LEFT SIDEBAR */}
        <Col lg={3} md={4} className="mb-4">
          <Card className="profile-sidebar shadow-sm border-0">
            <Card.Body className="text-center">
              <div className="profile-image-box">
                <Image
                  src={
                    profileImage
                      ? profileImage
                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  roundedCircle
                  className="profile-image"
                />
                <label className="camera-btn">
                  <FaCamera />
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={uploadImage}
                  />
                </label>
              </div>

              <h4 className="mt-3 fw-bold">
                {userInfo?.name || "Guest User"}
              </h4>
              <p className="text-muted mb-0">
                {userInfo?.email || "guest@gmail.com"}
              </p>
            </Card.Body>

            <ListGroup variant="flush">
              <ListGroup.Item action onClick={() => navigate("/profile/edit")}>
                <FaUser className="me-2 text-primary" />
                My Profile
                <FaAngleRight className="float-end mt-1" />
              </ListGroup.Item>

              <ListGroup.Item action onClick={() => navigate("/myorders")}>
                <FaShoppingBag className="me-2 text-success" />
                My Orders
                <FaAngleRight className="float-end mt-1" />
              </ListGroup.Item>

              <ListGroup.Item action onClick={() => navigate("/wishlist")}>
                <FaHeart className="me-2 text-danger" />
                Wishlist
                <FaAngleRight className="float-end mt-1" />
              </ListGroup.Item>

              <ListGroup.Item action>
                <FaMapMarkerAlt className="me-2 text-warning" />
                Saved Address
                <FaAngleRight className="float-end mt-1" />
              </ListGroup.Item>
              <Link
                to="/change-password"
                className="menu-item"
              >
                <FaLock />
                <span>Change Password</span>
                <span>›</span>
              </Link>
              <ListGroup.Item className="border-0">
                <Button variant="danger" className="w-100">
                  <FaSignOutAlt className="me-2" />
                  Logout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

        {/* RIGHT SIDE */}
        <Col lg={9} md={8}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">My Account Dashboard</h4>
            </Card.Header>

            <Card.Body>
              {/* Flip Stat Cards */}
              <Row className="mb-4">
                {statCards.map((stat, index) => (
                  <Col md={4} className="mb-3" key={index}>
                    <div className="flip-card">
                      <div className="flip-card-inner">
                        <div className={`flip-card-front ${stat.color}`}>
                          <div className="stat-icon">{stat.icon}</div>
                          <h3 className="fw-bold mb-0">{stat.front}</h3>
                          <p className="mb-0">{stat.label}</p>
                        </div>
                        <div className={`flip-card-back ${stat.color}`}>
                          <p className="mb-0">{stat.back}</p>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>

              {/* Personal Information */}
              <Card className="shadow-sm border-0 mb-4">
                <Card.Header className="bg-light">
                  <h5 className="mb-0">Personal Information</h5>
                </Card.Header>

                <Card.Body>
                  <Row>
                    <Col md={6} className="mb-3">
                      <label className="fw-bold">Full Name</label>
                      <div className="info-box">
                        {userInfo?.name || "Guest User"}
                      </div>
                    </Col>

                    <Col md={6} className="mb-3">
                      <label className="fw-bold">Email Address</label>
                      <div className="info-box">
                        {userInfo?.email || "guest@gmail.com"}
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              {/* Recent Activity */}
              <Card className="shadow-sm border-0 mb-4">
                <Card.Header className="bg-light">
                  <h5 className="mb-0">Recent Activity</h5>
                </Card.Header>

                <ListGroup variant="flush">
                  <ListGroup.Item>📦 Last Order : iPhone 15 Pro</ListGroup.Item>
                  <ListGroup.Item>❤️ Wishlist : 5 Products</ListGroup.Item>
                  <ListGroup.Item>📍 Default Address Saved</ListGroup.Item>
                  <ListGroup.Item>🎉 Flipkart Plus Member</ListGroup.Item>
                </ListGroup>
              </Card>

              {/* Quick Actions */}
              <Row>
                <Col md={6} className="mb-3">
                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={() => navigate("/myorders")}
                  >
                    <FaShoppingBag className="me-2" />
                    View My Orders
                  </Button>
                </Col>

                <Col md={6} className="mb-3">
                  <Button
                    variant="danger"
                    className="w-100"
                    onClick={() => navigate("/wishlist")}
                  >
                    <FaHeart className="me-2" />
                    Open Wishlist
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProfileScreen;