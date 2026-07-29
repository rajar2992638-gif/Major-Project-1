import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Image,
} from "react-bootstrap";
import { FaCamera, FaSave, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function EditProfileScreen() {
  const [name, setName] = useState("Raja");
  const [email, setEmail] = useState("raja@gmail.com");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    alert("Profile Updated Successfully");
  };

  return (
    <Container className="py-4">
      <Row>

        <Col md={4}>
          <Card className="shadow border-0">

            <Card.Body className="text-center">

              <Image
                src="https://i.pravatar.cc/300"
                roundedCircle
                width="170"
                height="170"
              />

              <div className="mt-3">

                <Button variant="outline-primary">
                  <FaCamera className="me-2" />
                  Change Photo
                </Button>

              </div>

              <hr />

              <h4>{name}</h4>

              <p className="text-muted">{email}</p>

            </Card.Body>

          </Card>
        </Col>

        <Col md={8}>

          <Card className="shadow border-0">

            <Card.Header className="bg-primary text-white">

              <h3>Edit Profile</h3>

            </Card.Header>

            <Card.Body>

              <Form onSubmit={submitHandler}>

                <Row>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                  </Col>

                </Row>

                <Row>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                      />
                    </Form.Group>
                  </Col>

                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>

                  <Form.Select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option>Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </Form.Select>

                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>

                <Row>

                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Pincode</Form.Label>
                      <Form.Control
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                      />
                    </Form.Group>
                  </Col>

                </Row>

                <div className="d-flex justify-content-between">

                  <Link to="/profile">
                    <Button variant="secondary">
                      <FaArrowLeft className="me-2" />
                      Back
                    </Button>
                  </Link>

                  <Button type="submit" variant="primary">
                    <FaSave className="me-2" />
                    Save Changes
                  </Button>

                </div>

              </Form>

            </Card.Body>

          </Card>

        </Col>

      </Row>
    </Container>
  );
}

export default EditProfileScreen;