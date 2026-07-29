import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";

function Message({ variant, children, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <Alert variant={variant} dismissible onClose={onClose}>
      {children}
    </Alert>
  );
}

export default Message;
