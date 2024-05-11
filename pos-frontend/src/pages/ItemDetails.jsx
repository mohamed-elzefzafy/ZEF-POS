import { Link, useParams } from "react-router-dom"
import {  Alert, Button, Card, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { useGetOneItemQuery } from "../redux/slices/itemsApiSlice";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addToCart } from "../redux/slices/cartSlice";


const ItemDetails = () => {
  const {id} = useParams();
  const {data : item , isLoading , refetch , error} = useGetOneItemQuery(id);

  const dispatch = useDispatch();
  const [itemCartQty, setItemCartQty] = useState(1);
const addToCartHandler = (item , qty) => {
  dispatch(addToCart({...item , qty}));
}
  return (
    <>
          <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
    {isLoading ? (
    <Loader/>
    ) : error ? (
      <Alert variant="danger">{error?.data?.message || error?.message}</Alert>
    ) : (

      <>

      <Row>
        <Col md={5}>
    <Image src={item?.image?.url} fluid alt={item?.name}/>
        </Col>

        <Col md={4}>
          <ListGroup variant="flush">
<ListGroup.Item>
  <h3> <span className="text-danger ">Name</span> : {item?.name}</h3>
</ListGroup.Item>
<ListGroup.Item>
<h3> <span className="text-danger ">Category</span> : {item?.category?.name} </h3> 
</ListGroup.Item>

<ListGroup.Item>
<h3> <span className="text-danger ">Price</span> : ${item?.price } </h3> 
  
</ListGroup.Item>



          </ListGroup>
        </Col>

        <Col md={3}>
<Card>
  <ListGroup >
    <ListGroup.Item>
      <Row>
        <Col>
          price : 
        </Col>
        <Col>
          <strong>{item.price}</strong>
        </Col>
      </Row>
    </ListGroup.Item>
    <ListGroup.Item>
      <Row>
        <Col>
          status : 
        </Col>
        <Col>
          <strong>{item?.countInStock > 0 ?"in Stock" : "out of stock"}</strong>
        </Col>
      </Row>
    </ListGroup.Item>
    {item?.countInStock > 0 &&
    <ListGroup.Item>
      <Row>
        <Col>
          qty : 
        </Col>

        <Col>
        <Form.Control 
as="select"
value={itemCartQty}
onChange={(e) => setItemCartQty(Number(e.target.value))}
>
{[...Array(item?.countInStock).keys()].map(qty => 
<option key={qty + 1} value={qty + 1}>{qty + 1}</option>
)}
</Form.Control>
        </Col>
      </Row>
    </ListGroup.Item>
    }
    <ListGroup.Item>
      <Button className="btn-block" 
      disabled={item?.countInStock <= 0}
      type="button"
      onClick={() => addToCartHandler(item , +itemCartQty)}
      >
        Add to cart
      </Button>
    </ListGroup.Item>
  </ListGroup>
</Card>
        </Col>
      </Row>
      </>
    )}


    </>
  )
}

export default ItemDetails
