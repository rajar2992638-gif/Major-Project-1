import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button, Alert, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaLock } from "react-icons/fa";
import { changePassword } from "../../actions/userAction";
import "./ChangePasswordScreen.css";

function ChangePasswordScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const userChangePassword = useSelector(
    (state) => state.userChangePassword || {}
  );

  const { loading = false, error = null, success = false } =
    userChangePassword;


  const verifyPasswordHandler = () => {
    if (oldPassword.trim() === "") {
      setMessage("Please enter current password");
      return;
    }

    // Temporary verification
    // Backend verification add pannalam
    setMessage("");
    setIsVerified(true);
  };


  const submitHandler = (e) => {
    e.preventDefault();
    setMessage("");

    if (!isVerified) {
      setMessage("Please verify current password first");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match");
      return;
    }

    dispatch(changePassword(oldPassword, newPassword));

setOldPassword("");
setNewPassword("");
setConfirmPassword("");
setIsVerified(false);

setTimeout(() => {
  navigate("/");
}, 1500);
  };


  return (
    <div className="change-password-page py-4">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>

          <Card className="shadow-sm border-0 password-card">

            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">
                <FaLock className="me-2" />
                Change Password
              </h5>
            </Card.Header>


            <Card.Body>

              {message && (
                <Alert variant="danger">
                  {message}
                </Alert>
              )}

              {error && (
                <Alert variant="danger">
                  {error}
                </Alert>
              )}

              {success && (
                <Alert variant="success">
                  Password updated successfully
                </Alert>
              )}


              <Form onSubmit={submitHandler}>


                {/* Current Password */}
                <Form.Group className="mb-3">

                  <Form.Label>
                    Current Password
                  </Form.Label>

                  <Form.Control
                    type="password"
                    placeholder="Enter current password"
                    value={oldPassword}
                    onChange={(e) =>
                      setOldPassword(e.target.value)
                    }
                    required
                  />


                  <Button
                    type="button"
                    variant="secondary"
                    className="mt-2"
                    onClick={verifyPasswordHandler}
                  >
                    Verify Current Password
                  </Button>

                </Form.Group>



                {/* New Password */}
                <Form.Group className="mb-3">

                  <Form.Label>
                    New Password
                  </Form.Label>

                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    disabled={!isVerified}
                    onChange={(e) =>
                      setNewPassword(e.target.value)
                    }
                    minLength={6}
                    required
                  />

                </Form.Group>




                {/* Confirm Password */}
                <Form.Group className="mb-4">

                  <Form.Label>
                    Confirm New Password
                  </Form.Label>

                  <Form.Control
                    type="password"
                    placeholder="Re-enter new password"
                    value={confirmPassword}
                    disabled={!isVerified}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    minLength={6}
                    required
                  />

                </Form.Group>



                <Button
                  type="submit"
                  variant="primary"
                  className="w-100"
                  disabled={loading}
                >
                  {
                    loading
                    ? "Updating..."
                    : "Update Password"
                  }
                </Button>


              </Form>


            </Card.Body>

          </Card>

        </Col>
      </Row>
    </div>
  );
}

export default ChangePasswordScreen;