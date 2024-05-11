import React, { useState } from 'react'
import { Button, Col, Image, Row, Table } from 'react-bootstrap'
import { useDeleteItemMutation, useGetItemsQuery, useGetOneItemQuery } from '../redux/slices/itemsApiSlice';
import AddItemModel from '../components/AddItemModel';
import swal from 'sweetalert';
import toast from 'react-hot-toast';
import EditItemModal from '../components/EditItemModal';
import { LinkContainer } from 'react-router-bootstrap';

const Items = () => {
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showEditItemModal, setShowEditItemModal] = useState(false);
const [editedItemId , setEditedItemId] = useState();
  const {data : items , refetch : refetchItems} = useGetItemsQuery();
  const [deleteItem] = useDeleteItemMutation();


  const onDeleteItem = async(itemId) => {
    try {

      swal({
        title: "Are you sure you want delete this item?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then(async(willDelete) => {
        if (willDelete) {
          const res = await deleteItem(itemId).unwrap();
          console.log(res);
          if (res === "item deleted successfully") {
            toast.success(res);
            refetchItems();
          }
          }
      });
    
    } catch (error) {
      // toast.error()
    }
  };

  const onChooseItemUpdate = (itemId) => {
   setShowEditItemModal(true);
   setEditedItemId(itemId);
  };
  return (
<>
<EditItemModal showEditItemModal={showEditItemModal} setShowEditItemModal={setShowEditItemModal} refetchItems={refetchItems}
    editedItemId={editedItemId}
/>
<AddItemModel showAddItemModal={showAddItemModal} setShowAddItemModal={setShowAddItemModal} refetchItems={refetchItems}/>
  <Row className='align-items-center my-4'>
    <Col>
      <h3>Items</h3>
    </Col>
    <Col className='pe-5 text-end '>
      <Button onClick={() => setShowAddItemModal(true)} variant='success'>Add Item</Button>
    </Col>
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
            <th>Stock</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
      {items?.map((item , index) => 
        <tr key={item?._id}>
          <td>{index + 1}</td>
        <LinkContainer  style={{cursor : "pointer"}} to={`/items/${item?._id}`}>
        <td>{item?.name}</td>
        </LinkContainer>
        <LinkContainer  style={{cursor : "pointer"}} to={`/items/${item?._id}`}>
            <td>
            <Image src={item?.image?.url} fluid width={100} height={100}/>
            </td>
            </LinkContainer>
            <td>$ {item?.price}</td>
            <td>{item?.countInStock}  {item?.countInStock > 1 ? "Items" : "Item"}</td>
            <td>
            <td> {item?.category?.name} </td>
  
            </td>
            <td>
            <i className="bi bi-trash3-fill fs-4 me-3 text-danger" onClick={() => onDeleteItem(item?._id)} style={{cursor : "pointer"}}></i>
            <i className="bi bi-pencil-square fs-4 text-primary" onClick={() => onChooseItemUpdate(item?._id)} style={{cursor : "pointer"}}></i>
            </td>
          </tr>
      )}
        </tbody>
      </Table>
    </Col>
  </Row>
</>
  )
}

export default Items