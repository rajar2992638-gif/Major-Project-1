import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../Loader";
import Message from "../Message";
import { listProducts } from "../../actions/productAction";

const MobilesScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const {
    loading,
    error,
    products = [],
  } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const mobileProducts = products.filter(
    (product) =>
      product.category &&
      product.category.toLowerCase() === "mobile"
  );

  return (
    <>
      <h2 className="my-3">📱 Mobile Products</h2>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {mobileProducts.length === 0 ? (
            <h4>No Mobile Products Found</h4>
          ) : (
            mobileProducts.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <div className="border rounded p-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="img-fluid"
                  />
                  <h5 className="mt-2">{product.name}</h5>
                  <h6>₹{product.price}</h6>
                </div>
              </Col>
            ))
          )}
        </Row>
      )}
    </>
  );
};

export default MobilesScreen;