import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBox() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="d-flex align-items-center w-100"
    >
      <input
        type="text"
        placeholder="🔍 Search for products..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={{
          height: "52px",
          borderRadius: "15px 0 0 15px",
          border: "2px solid #ffc107",
          fontSize: "16px",
          paddingLeft: "18px",
          boxShadow: "none",
        }}
        className="form-control"
      />

      <button
        type="submit"
        className="btn btn-warning fw-bold"
        style={{
          height: "52px",
          width: "120px",
          borderRadius: "0 15px 15px 0",
        }}
      >
        🔍 Search
      </button>
    </form>
  );
}

export default SearchBox;