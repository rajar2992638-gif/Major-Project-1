import React, { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  FaGooglePay,
  FaCreditCard,
  FaUniversity,
  FaMoneyBillWave,
  FaWallet,
  FaQrcode,
} from "react-icons/fa";

import { savePaymentMethod } from "../../actions/cartAction";
import "./PaymentScreen.css";


function PaymentScreen(){

const dispatch = useDispatch();
const navigate = useNavigate();


const [paymentMethod,setPaymentMethod] = useState("UPI");



const submitHandler=(e)=>{

e.preventDefault();

dispatch(savePaymentMethod(paymentMethod));

navigate("/placeorder");

};



return(

<div className="payment-container">


<Card className="payment-card shadow-lg">

<Card.Body>


<h2 className="text-center mb-4">
Choose Payment Method
</h2>



<Form onSubmit={submitHandler}>


<Row>


<Col md={5}>


{
[
["UPI","UPI (Google Pay / PhonePe / Paytm)",FaGooglePay],
["Card","Credit / Debit Card",FaCreditCard],
["NetBanking","Net Banking",FaUniversity],
["Wallet","Wallet",FaWallet],
["COD","Cash On Delivery",FaMoneyBillWave]

].map(([value,text,Icon])=>(


<div
key={value}
className={`payment-option ${
paymentMethod===value ? "active":""
}`}

onClick={()=>setPaymentMethod(value)}

>


<Form.Check

type="radio"

checked={paymentMethod===value}

onChange={()=>setPaymentMethod(value)}

label={
<>

<Icon className="me-2"/>

{text}

</>

}

/>


</div>


))


}



</Col>




<Col md={7}>


<div className="payment-details">


{

paymentMethod==="UPI" &&

<>

<h4>
<FaQrcode/> Scan & Pay
</h4>


<div className="qr-box">

<FaQrcode size={120}/>

</div>


<p>
Google Pay / PhonePe / Paytm
</p>


<Form.Control

placeholder="Enter UPI ID"

className="mb-3"

/>


<Button>
Verify UPI
</Button>


</>

}




{

paymentMethod==="Card" &&

<>

<h4>
Card Details
</h4>


<Form.Control

placeholder="Card Number"

className="mb-3"

/>



<Form.Control

placeholder="Card Holder Name"

className="mb-3"

/>


<Row>

<Col>

<Form.Control

placeholder="MM/YY"

/>

</Col>


<Col>

<Form.Control

placeholder="CVV"

/>

</Col>


</Row>


</>


}




{

paymentMethod==="NetBanking" &&

<>

<h4>
Select Bank
</h4>


<Form.Select className="mb-3">


<option>
Choose Bank
</option>


<option>
State Bank of India
</option>


<option>
HDFC Bank
</option>


<option>
ICICI Bank
</option>


<option>
Axis Bank
</option>


</Form.Select>


<Button>
Continue
</Button>


</>


}




{

paymentMethod==="Wallet" &&

<>


<h4>
Wallet Payment
</h4>



<Form.Select className="mb-3">


<option>
Select Wallet
</option>


<option>
Paytm Wallet
</option>


<option>
PhonePe Wallet
</option>


<option>
Amazon Pay
</option>


</Form.Select>



<Form.Control

placeholder="Mobile Number"

/>


</>


}




{

paymentMethod==="COD" &&

<>


<h4>
Cash On Delivery
</h4>


<p className="text-success">

Pay after receiving your product.

</p>


</>

}


</div>



</Col>



</Row>




<div className="text-center mt-4">


<Button

type="submit"

variant="success"

size="lg"

>

Continue

</Button>


</div>



</Form>


</Card.Body>


</Card>


</div>


)

}


export default PaymentScreen;