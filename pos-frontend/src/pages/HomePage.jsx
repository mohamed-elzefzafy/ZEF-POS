import React from 'react'
import { useGetItemsQuery } from '../redux/slices/itemsApiSlice';
import {Col, Row } from 'react-bootstrap';
import Item from '../components/Item';


const HomePage = () => {
  const {data : items} = useGetItemsQuery();
  console.log(items);
  const filterdItems = items?.filter(item => item.countInStock >0);
  return (
  <>
    <Row className='my-4'> 
    <h3>Categories</h3>
    </Row>
    <Row >
      {filterdItems?.map(item => 
      <Col xs={12} sm={6} md={6} lg={4}>
          <Item item={item}/>
      </Col>
      
      )}
    </Row>
  </>
  )
}

export default HomePage