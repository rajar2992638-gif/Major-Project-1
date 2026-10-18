import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import {
  FaUsers,
  FaShoppingCart,
  FaRupeeSign,
  FaBoxOpen,
} from "react-icons/fa";

function DashboardScreen() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(
         "https://raja-ecommerce-backend.onrender.com/api/users/"
        );

        setUsers(data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);



  return (

    <Container fluid className="mt-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">📊 Admin Dashboard</h2>
          <p className="text-muted mb-0">
            Welcome back! Here's today's business overview.
          </p>
        </div>

        <div className="text-end">
          <h6 className="text-muted mb-1">Today's Revenue</h6>
          <h3 className="text-success fw-bold">₹45,320</h3>
        </div>
      </div>

      <Row>

        <Col md={3}>
          <Card className="shadow border-0 bg-primary text-white">
            <Card.Body>
              <FaUsers size={40} />
              <h3 className="mt-3">250</h3>
              <h5>Total Users</h5>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow border-0 bg-success text-white">
            <Card.Body>
              <FaBoxOpen size={40} />
              <h3 className="mt-3">120</h3>
              <h5>Products</h5>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow border-0 bg-warning text-dark">
            <Card.Body>
              <FaShoppingCart size={40} />
              <h3 className="mt-3">85</h3>
              <h5>Orders</h5>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow border-0 bg-danger text-white">
            <Card.Body>
              <FaRupeeSign size={40} />
              <h3 className="mt-3">₹2,45,000</h3>
              <h5>Total Sales</h5>
            </Card.Body>
          </Card>
        </Col>

      </Row>

      <Row className="mt-5">

        <Col md={8}>

          <Card className="shadow">

            <Card.Header>
              Recent Orders
            </Card.Header>

            <Card.Body>

              <Table hover responsive>

                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>User</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  <tr>
                    <td>#1001</td>
                    <td>Raja</td>
                    <td>₹15,000</td>
                    <td>
                      <span className="badge bg-success px-3 py-2">
                        Delivered
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td>#1002</td>
                    <td>Suba</td>
                    <td>₹6,200</td>
                    <td>
                      <span className="badge bg-warning text-dark px-3 py-2">
                        Pending
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td>#1003</td>
                    <td>Ram</td>
                    <td>₹2,800</td>
                    <td>
                      <span className="badge bg-info px-3 py-2">
                        Shipped
                      </span>
                    </td>
                  </tr>

                </tbody>

              </Table>

            </Card.Body>

          </Card>

        </Col>

        <Col md={4}>

          <Card className="shadow">

            <Card.Header>
              Latest Users
            </Card.Header>

            <Card.Body>

              <ul className="list-group">

                {users.map((user) => (
                  <li
                    key={user.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{user.name}</strong>
                      <br />
                      <small className="text-muted">{user.email}</small>
                    </div>

                    <span className="badge bg-success">
                      New
                    </span>
                  </li>
                ))}

              </ul>

            </Card.Body>

          </Card>

        </Col>

      </Row>

    </Container>
  );
}

export default DashboardScreen;