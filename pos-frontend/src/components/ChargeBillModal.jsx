import React, { useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useAddBillMutation } from '../redux/slices/billsApiSlice';
import request from './../utils/request';
import { clearCart } from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const ChargeBillModal = ({showBillModal, setShowBillModal}) => {
  const [validated, setValidated] = useState(false);
  const {cartItems , totalPrice} = useSelector(state => state.cart);

  const [customerName, setCustomerName] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [paymentMode, setPaymentMode] = useState("");


  const [addBill] = useAddBillMutation();
const dispatch = useDispatch();
const navigate = useNavigate();
  const handleClose = () => {
    setShowBillModal(false);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // const form = e.currentTarget.elements;

    // const customerName = form.customerName.value;
    // const customerPhoneNumber = form.customerPhoneNumber.value;
    // const paymentMode = form.paymentMode.value;


    if (e.currentTarget.checkValidity() === true && customerName && customerPhoneNumber) {
      try {
        const res = await addBill({customerName , customerPhoneNumber , paymentMode , totalPrice , cartItems}).unwrap();
        console.log(res);
        dispatch(clearCart())
        handleClose();
        navigate("/bills")
        if (res?.message === "Bill created successfully") {
    
          toast.success(res?.message);
  
        }
      } catch (error) {
        toast.error(error?.data?.message);
      }

    }

    setValidated(true);
  };


  return (
<Modal show={showBillModal} onHide={handleClose}>
<Modal.Header className="p-3 d-flex justify-content-between">
        <Modal.Title>
          {" "}
          <div className="fs-3">Add Item</div>{" "}
        </Modal.Title>
        <i
          className="bi bi-x-circle text-danger fs-3"
          style={{ cursor: "pointer" }}
          onClick={() => setShowBillModal(false)}
        ></i>
      </Modal.Header>
        <Modal.Body>
        <Form noValidate validated={validated}  onSubmit={handleSubmit}>
        
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label >Customer Name</Form.Label>
          <Form.Control
          type="text"
          name='customerName'
          placeholder="Name"
          required
          onChange={(e) => setCustomerName(e.target.value)}
           />
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label >Phone Number</Form.Label>
          <Form.Control 
          type="text"
          name='customerPhoneNumber'
          placeholder="Phone"
          required
          onChange={(e) => setCustomerPhoneNumber(e.target.value)}
          />
        </Form.Group>
  
        <Form.Select onChange={(e) => setPaymentMode(e.target.value)} aria-label="Default select example" className="mb-4" >
      <option>Payment Mode</option>
    {["cash" , "credit"].map(paymentMetod => 
    
      <option key={paymentMetod} value={paymentMetod}>{paymentMetod === "cash" ? "Cash" : "Credit"}</option>

    )}
    </Form.Select>
  
  

      </Form>

      <Row>
        <Col md={6}>
      <h5>  SubTotal : {totalPrice}</h5>
        </Col>
        <Col md={6}></Col>
      </Row>

      <Row>
        <Col md={6}>
      <h5>  Tax : {totalPrice * 10 /100}</h5>
        </Col>
        <Col md={6}></Col>
      </Row>
      <Row>
          <Col>
          <hr />
        <h3>  Final Total : {totalPrice + totalPrice *10/100}</h3>
          </Col>
         </Row>
         </Modal.Body>
         <Modal.Footer>
      

         <Row>
          <Col>
          <Button variant="primary" onClick={handleSubmit}>Generate Bill</Button>
          </Col>
         </Row>
  
          
        </Modal.Footer>
      </Modal>

  )
}

export default ChargeBillModal