/* eslint-disable react/jsx-pascal-case */
import React, { useState } from 'react'
import { Button, Card, Col, Row , FormGroup , Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart } from '../redux/slices/cartSlice'



const Item = ({item}) => {
  const dispatch = useDispatch();
  const [itemCartQty, setItemCartQty] = useState(1);
const addToCartHandler = (item , qty) => {
  dispatch(addToCart({...item , qty}));
}
  return (
    <Card className="p-4 mb-3">
    <Link to={`/items/${item._id}`}>
      <Card.Img src={item?.image.url} variant="top" width="200px" height="200px" style={{objectFit : "contain"}}/>
    </Link>
    <Card.Body>
    <Link to={`/items/${item._id}`}>
    <Card.Title as="div" className="product-title">
    <strong>{item?.name}</strong>
    </Card.Title>
    </Link>

  <Row>
    <Col>
    <Card.Text as="h5">
       ${item.price}
    </Card.Text>
    </Col>
    <Col>
    
    </Col>
  </Row>
  <Row>
  <Col className="d-flex  flex-column  align-items-center ">
<Form.Control 
type="number"
placeholder="0"
className="mt-2 w-75"
value={itemCartQty}
onChange={(e) => setItemCartQty(e.target.value)}
min={1}
max={item?.countInStock}
>

</Form.Control>

    <Button  className="mt-2 w-75" onClick={() => addToCartHandler(item , +itemCartQty)} variant="success">Add to Card</Button>
    </Col>
  </Row>
    </Card.Body>
  </Card>
  )
}

export default Item