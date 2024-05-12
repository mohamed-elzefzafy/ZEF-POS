import React, { useRef } from 'react'
import { Button, Col, ListGroup, Modal, Row, Table } from 'react-bootstrap'
import { useGetOneBillQuery } from '../redux/slices/billsApiSlice';
import { useReactToPrint } from 'react-to-print';

const BillDetailsModal = ({showBillDetailsModal , setShowBillDetailsModal , billId}) => {

  const {data : oneBill} = useGetOneBillQuery(billId);
  const componentRef = useRef();
  console.log(oneBill);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
<div>
      <Modal
  
    style={{ padding: "50px" }}
    show={showBillDetailsModal}
    className="p-5 fs-xs-7 fs-md-5 fw-md-bold"
    size="lg"
  >
    <Modal.Header className="p-3 d-flex justify-content-between">
      <Modal.Title>
        {" "}
        <div className="fs-5">Bill Details</div>{" "}
      </Modal.Title>
      <i
        className="bi bi-x-circle text-danger fs-3"
        style={{ cursor: "pointer" }}
        onClick={() => setShowBillDetailsModal(false)}
      ></i>
    </Modal.Header>
    <Modal.Body>
<ListGroup variant="flush"   ref={componentRef}>
  <ListGroup.Item>
  <Row>
  <Col> <h3>Zef-POS</h3> </Col>
  <Col className='text-end '>
   <h6>9 new street shobra - Cairo</h6>
   <h6>Phone number : 024825866</h6>
    </Col>
</Row>
  </ListGroup.Item>
  <ListGroup.Item>
    <Row>
      <Col>Name : {oneBill?.customerName}</Col>
    </Row>
    <Row>
    <Col>Phone number : {oneBill?.customerPhoneNumber}</Col>
    </Row>
    <Row>
    <Col>date : {oneBill?.createdAt.substring(0 , 10)}</Col>
    </Row>
  </ListGroup.Item>
  <ListGroup.Item>
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>total Item</th>
        </tr>
      </thead>
      <tbody>
  {oneBill?.cartItems.map(item => 
  
    <tr>
          <td>{item?.name}</td>
          <td>{item?.price}</td>
          <td>{item?.qty}</td>
          <td>{item?.price * item?.qty}</td>
    
        </tr>
  )}

        <tr>
          <td>
<h5>SubTotal : $ {oneBill?.totalPrice}</h5>
          </td>
        </tr>
        <tr>
          <td>
          <h5>Tax : $ {oneBill?.tax}</h5>
          </td>
        </tr>

        <tr>
          <td>
          <h3>Final Total : $ {oneBill?.subTotal}</h3>
          </td>
        </tr>
      </tbody>

    </Table>
  </ListGroup.Item>

</ListGroup>
  <ListGroup.Item className='text-end '>
    <Button variant='success' onClick={handlePrint}>Print Bill</Button>
  </ListGroup.Item>
    </Modal.Body>
  </Modal>
</div>
  )
}

export default BillDetailsModal