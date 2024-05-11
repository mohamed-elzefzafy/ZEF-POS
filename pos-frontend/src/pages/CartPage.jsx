import React, { useState } from 'react'
import { Button, Col, Form, Image, Modal, Row, Table } from 'react-bootstrap'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { removeFromCart, updateItemQty } from '../redux/slices/cartSlice';
import ChargeBillModal from '../components/ChargeBillModal';

const CartPage = () => {
const dispatch = useDispatch();
const [newItemQty, setNewItemQty] = useState();
const [showBillModal, setShowBillModal] = useState(false);
  const {cartItems , totalPrice} = useSelector(state => state.cart);

  const deleteItemFromCart = (id) => {
dispatch(removeFromCart(id));
  }

  const updateItemQuantityHandler = ( id , qty) => {
    dispatch(updateItemQty({id  ,  qty }));
  };
  return (
<>
{cartItems.length > 0 ? 
(
  <>
  <Row>
    <Col> <h2>Cart</h2> </Col>
  </Row>
  <Row>
    <Col>


  <Table responsive striped>
        <thead>
          <tr>
            <th>Serial</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
      {cartItems.map((item , index) => 
        <tr key={item?._id}>
          <td>{index + 1}</td>
          <td>{item?.name}</td>
            <td>
            <Image src={item?.image?.url} fluid width={100} height={100}/>
            </td>
            <td>$ {item?.price}</td>
            <td>
            <Form.Control 
as="select"
defaultValue={item?.qty}
onChange={(e) => updateItemQuantityHandler(item._id , e.target.value)}
>
{[...Array(item.countInStock).keys()].map(qty => 
<option key={qty + 1} value={qty + 1}>{qty + 1}</option>
)}
</Form.Control>

  
            </td>
            <td>
            <i className="bi bi-trash3-fill fs-5 text-danger" onClick={() => deleteItemFromCart(item?._id)}></i>
            </td>
          </tr>
      )}
        </tbody>
      </Table>


    </Col>
  </Row>

  <Row>
    <Col md={8}></Col>
    <Col md={4}>
    
      <h4>Total amount :  <span className='text-danger'>$ {totalPrice}</span> </h4>
    </Col>
  </Row>

  <Row>
    <Col md={8}></Col>
    <Col md={4}>
    
    <Button type="button" size="lg" variant="danger" onClick={() => setShowBillModal(true)}>Charge Bill</Button>
    </Col>
  </Row>
  </>
) :
(
  
  <Row>
    <Col>
      <h3>
        Cart is Empty
      </h3>
    </Col>
  </Row>
)
 }
<ChargeBillModal showBillModal={showBillModal} setShowBillModal={setShowBillModal}/>
</>
  )
}

export default CartPage