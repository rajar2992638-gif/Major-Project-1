import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Card, Table, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { listMyOrders } from "../../actions/orderAction";


function OrderDetailsScreen() {

  const dispatch = useDispatch();

  const { id } = useParams();

  const orderId = id;


  const orderList = useSelector(
    (state) => state.orderMyList
  );


  const { orders=[] } = orderList;


  const order = orders.find(
    (item)=> item._id.toString() === orderId
  );


  useEffect(()=>{

    dispatch(listMyOrders());

  },[dispatch]);



  return (

    <Container className="mt-4">


      <Card className="shadow border-0">


        <Card.Header className="bg-primary text-white">

          <h3>
            Order Details
          </h3>

        </Card.Header>


        <Card.Body>


        {
          order ? (

            <>

            <h5>
              Order ID : {order._id}
            </h5>


            <p>
              Date : {order.createdAt.substring(0,10)}
            </p>


            <p>
              Total : ₹{order.totalPrice}
            </p>


            <Badge bg="warning">
              Processing
            </Badge>



            <hr/>


            <h4>
              Products
            </h4>


            <Table striped bordered>


            <thead>

              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>

            </thead>


            <tbody>


            {
              order.orderItems.map((item)=>(

                <tr key={item._id}>

                  <td>
                    {item.name}
                  </td>

                  <td>
                    {item.qty}
                  </td>

                  <td>
                    ₹{item.price}
                  </td>


                </tr>

              ))
            }


            </tbody>


            </Table>


            </>


          ):(

            <h4>
              Order Not Found
            </h4>

          )

        }


        </Card.Body>


      </Card>


    </Container>

  );

}


export default OrderDetailsScreen;