import React from "react";
import Spinner from "react-bootstrap/Spinner";
import "./Loader.css";

function Loader() {
  return (
    <div className="loader-container">

      <Spinner
        animation="border"
        variant="primary"
        className="loader-spinner"
      />

      <h5 className="loader-text">
        Loading...
      </h5>

    </div>
  );
}

export default Loader;