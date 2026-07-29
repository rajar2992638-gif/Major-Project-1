import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../../actions/userAction";

function LoginScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const redirect = location.search
    ? location.search.split("=")[1]
    : "/";

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: null,
    password: null,
  });

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });

    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = null;

    switch (name) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(value)) {
          error = "Invalid Email";
        }
        break;

      case "password":
        if (value.length < 6) {
          error = "Password must contain at least 6 characters";
        }
        break;

      default:
        break;
    }

    setFormErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const getValidationClass = (name) => {
    if (formValues[name] === "") return "";

    return formErrors[name] ? "is-invalid" : "is-valid";
  };

  const isFormValid = () => {
    return (
      Object.values(formErrors).every((err) => err === null) &&
      Object.values(formValues).every((value) => value !== "")
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      login(
        formValues.email,
        formValues.password
      )
    );
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>

          <h2 className="my-4 text-center">
            Login
          </h2>

          {loading && <Loader />}

          {error && (
            <Message variant="danger">
              {error}
            </Message>
          )}

          <Form onSubmit={submitHandler}>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>

              <Form.Control
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formValues.email}
                onChange={handleChange}
                className={getValidationClass("email")}
              />

              <Form.Control.Feedback type="invalid">
                {formErrors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>

              <Form.Control
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formValues.password}
                onChange={handleChange}
                className={getValidationClass("password")}
              />

              <Form.Control.Feedback type="invalid">
                {formErrors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              type="submit"
              variant="success"
              className="w-100"
              disabled={!isFormValid()}
            >
              LOGIN
            </Button>

          </Form>

        </Col>
      </Row>
    </Container>
  );
}

export default LoginScreen;