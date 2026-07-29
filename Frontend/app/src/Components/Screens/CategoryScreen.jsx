import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ProductScreen from "./ProductScreen";
import Loader from "../Loader";
import Message from "../Message";
import { listProducts } from "../../actions/productAction";

const CategoryScreen = () => {
  const { category } = useParams();

  const dispatch = useDispatch();

  const productsList = useSelector((state) => state.productsList);
  const { loading, error, products = [] } = productsList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const categoryProducts = products.filter(
    (product) =>
      product.category &&
      product.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <>
      <h2 className="my-4 text-center">
        {category.toUpperCase()} PRODUCTS
      </h2>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {categoryProducts.length === 0 ? (
            <h3 className="text-center">No Products Found</h3>
          ) : (
            categoryProducts.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <ProductScreen product={product} />
              </Col>
            ))
          )}
        </Row>
      )}
    </>
  );
};

export default CategoryScreen;