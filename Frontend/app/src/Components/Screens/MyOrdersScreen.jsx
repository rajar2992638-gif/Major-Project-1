import React, { useEffect } from "react";
import {
  Container,
  Table,
  Badge,
  Button,
  Card,
} from "react-bootstrap";

import { FaEye, FaShoppingBag } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { listMyOrders } from "../../actions/orderAction";


function MyOrdersScreen() {

  const dispatch = useDispatch();
  const navigate = useNavigate();


const orderList = useSelector(
  (state) => state.orderMyList
);


const {
  loading,
  orders,
  error
} = orderList;


  useEffect(() => {

    dispatch(listMyOrders());

  }, [dispatch]);


  return (

    <Container className="mt-4">


      <Card className="shadow border-0">


        <Card.Header className="bg-primary text-white">

          <h3>
            <FaShoppingBag className="me-2"/>
            My Orders
          </h3>

        </Card.Header>



        <Card.Body>


          {loading && <h4>Loading Orders...</h4>}


          {error && (
            <h5 className="text-danger">
              {error}
            </h5>
          )}



          {!loading && orders.length === 0 && (

            <h5>
              No Orders Found
            </h5>

          )}



          {!loading && orders.length > 0 && (

          <Table striped hover responsive>


            <thead>

              <tr>

                <th>Order ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th></th>

              </tr>

            </thead>



            <tbody>


            {orders.map((order)=>(


              <tr key={order._id}>


                <td>
                  {order._id}
                </td>


                <td>
                  {order.createdAt.substring(0,10)}
                </td>


                <td>
                  ₹{order.totalPrice}
                </td>


                <td>

                  <Badge
                    bg={
                      order.isPaid
                      ? "success"
                      : "danger"
                    }
                  >

                    {order.isPaid
                    ? "Paid"
                    : "Pending"}

                  </Badge>


                </td>



                <td>

                  <Badge
                    bg={
                      order.isDelivered
                      ? "success"
                      : "warning"
                    }
                  >

                    {order.isDelivered
                    ? "Delivered"
                    : "Processing"}

                  </Badge>


                </td>



                <td>


                  <Button

                    variant="dark"

                    size="sm"

                    onClick={() =>
                      navigate(`/order/${order._id}`)
                    }

                  >

                    <FaEye className="me-1"/>

                    Details

                  </Button>


                </td>


              </tr>


            ))}


            </tbody>


          </Table>

          )}


        </Card.Body>


      </Card>


    </Container>

  );
}


export default MyOrdersScreen;