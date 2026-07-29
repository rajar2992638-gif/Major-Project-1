import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { signup } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import { Link, useLocation, useNavigate } from "react-router-dom";

function SignupScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const [message, setMessage] = useState("");

  const userSignup = useSelector((state) => state.userSignup);
  const { error, loading, userInfo } = userSignup;
  const handleClose = () => setMessage("");

  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    termsAccepted: false,
  });

  const [formErrors, setFormErrors] = useState({
    firstname: null,
    lastname: null,
    email: null,
    password: null,
    confirmpassword: null,
    termsAccepted: null,
  });

  useEffect(() => {
    if (userInfo) {
      setMessage("Account Created Successfully 🎉");

      const timer = setTimeout(() => {
        navigate(redirect);
      }, 3000); // 3 seconds

      return () => clearTimeout(timer);
    }
  }, [userInfo, navigate, redirect]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormValues((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    validateField(name, newValue);
  };

  const getValidationClass = (name) => {
    if (
      formValues[name] === "" ||
      formValues[name] === false ||
      formErrors[name] === null
    )
      return "";
    return formErrors[name] ? "is-invalid" : "is-valid";
  };

  const clearForm = () => {
    setFormValues({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpassword: "",
      termsAccepted: false,
    });
  };

  const validateField = (name, value) => {
    let errorMessage = null;

    switch (name) {
      case "firstname":
      case "lastname":
        if (!value) errorMessage = "This field is required...";
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) errorMessage = "Invalid email format...";
        break;

      case "password":
        if (value.length < 6)
          errorMessage = "Password must be at least 6 characters";
        break;

      case "confirmpassword":
        if (value !== formValues.password)
          errorMessage = "Passwords do not match...";
        break;

      case "termsAccepted":
        if (!value) errorMessage = "You must accept the terms and conditions..";
        break;

      default:
        break;
    }

    setFormErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
  };

  const isFormValid = () => {
    const noErrors = Object.values(formErrors).every((err) => err === null);
    const allFilled =
      formValues.firstname !== "" &&
      formValues.lastname !== "" &&
      formValues.email !== "" &&
      formValues.password !== "" &&
      formValues.confirmpassword !== "" &&
      formValues.termsAccepted === true;
    return noErrors && allFilled;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      signup(
        formValues.firstname,
        formValues.lastname,
        formValues.email,
        formValues.password
      )
    );
    clearForm()
    setMessage("Signup is Success");
    navigate("/login");
  };

  return (
    <Container>
      <Row>
        <Col md="3"></Col>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger" onClose={handleClose}>
            {error}
          </Message>
        ) : message ? (
          <Message variant="success" onClose={handleClose}>
            {message}
          </Message>
        ) : (
          <Col md="6">
            <Form onSubmit={submitHandler}>
              <br />
              <h3 className="text-center">Signup Here</h3>

              {error && <Message variant="danger">{error}</Message>}
              {message && <Message variant="success">{message}</Message>}
              {loading && <Loader />}

              <Form.Group controlId="firstname">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your first name"
                  name="firstname"
                  value={formValues.firstname}
                  onChange={handleChange}
                  isInvalid={!!formErrors.firstname}
                  className={getValidationClass("firstname")}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.firstname}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="lastname" className="mt-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your last name"
                  name="lastname"
                  value={formValues.lastname}
                  onChange={handleChange}
                  isInvalid={!!formErrors.lastname}
                  className={getValidationClass("lastname")}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.lastname}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="email" className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your Email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  isInvalid={!!formErrors.email}
                  className={getValidationClass("email")}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="pass1" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                  placeholder="Enter your Password"
                  isInvalid={!!formErrors.password}
                  className={getValidationClass("password")}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="pass2" className="mt-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmpassword"
                  value={formValues.confirmpassword}
                  onChange={handleChange}
                  isInvalid={!!formErrors.confirmpassword}
                  className={getValidationClass("confirmpassword")}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.confirmpassword}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Check
                  label="Agree to terms and conditions"
                  name="termsAccepted"
                  checked={formValues.termsAccepted}
                  onChange={handleChange}
                  isInvalid={!!formErrors.termsAccepted}
                />
              </Form.Group>

              <Button
                className="mt-3"
                variant="success"
                type="submit"
                disabled={!isFormValid()}
              >
                SIGNUP
              </Button>
              <Row className="mt-3">
                <Col>
                  Already have an account?{" "}
                  <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                    Login
                  </Link>
                </Col>
              </Row>
            </Form>
          </Col>
        )}
        <Col md="3"></Col>
      </Row>
    </Container>
  );
}

export default SignupScreen;