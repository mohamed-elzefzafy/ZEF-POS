import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Form,
  FormGroup,
  Image,
  Modal,
  Row,
} from "react-bootstrap";
import Loader from "./Loader";
import { useGetCategoriesQuery } from "../redux/slices/categoriesApiSlice";
import { useAddItemMutation, useGetOneItemQuery, useUpdateItemMutation } from "../redux/slices/itemsApiSlice";
import toast from "react-hot-toast";
import request from "../utils/request";

const EditItemModal = ({ showEditItemModal, setShowEditItemModal , refetchItems , editedItemId}) => {
  const [validated, setValidated] = useState(false);
  const {data : oneItem  , isLoading : getOneLOading , error : getOneError } = useGetOneItemQuery(editedItemId);

const [image, setImage] = useState();
const [name, setName] = useState(oneItem?.name);
const [countInStock, setCountInStock] = useState(oneItem?.countInStock);
const [price, setPrice] = useState(oneItem?.price);
const [category, setCategory] = useState(oneItem?.category);

  const [imageErrorMessage, setImageErrorMessage] = useState("");

  const { data: categories } = useGetCategoriesQuery();

  const [addItem, { isLoading, error }] = useAddItemMutation();
  const [] = useUpdateItemMutation();


  console.log(oneItem);

  useEffect(()=>{
    setName(oneItem?.name);
    setCountInStock(oneItem?.countInStock);
    setPrice(oneItem?.price);
    setCategory(oneItem?.category);

  },[editedItemId , oneItem])
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget.elements;

    const name = form.name.value;
    const price = form.price.value;
    const category = form.category.value;
    const countInStock = form.countInStock.value;
  

    if (
      e.currentTarget.checkValidity() === true && name && countInStock &&  price && category ) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("countInStock", countInStock);
      formData.append("image", image);

      try {
        // const res =  await updateProduct({productId, formData}).unwrap();
        const res = await request.put(`/api/v1/items/update-item/${editedItemId}` , formData);
        console.log(res.data.message);
        if (res.data.message === "item updated successfully") {
          toast.success(res.data.message);
          setShowEditItemModal(false);
          refetchItems();
         }
        } catch (error) {
        }
      
    }

    setValidated(true);
  };

  return (
    <Modal
      style={{ padding: "50px" }}
      show={showEditItemModal}
      className="p-5 fs-xs-7 fs-md-5 fw-md-bold text-primary"
      size="lg"
    >
      <Modal.Header className="p-3 d-flex justify-content-between">
        <Modal.Title>
          {" "}
          <div className="fs-3">Edit Item</div>{" "}
        </Modal.Title>
        <i
          className="bi bi-x-circle text-danger fs-3"
          style={{ cursor: "pointer" }}
          onClick={() => setShowEditItemModal(false)}
        ></i>
      </Modal.Header>
      <Modal.Body>
  {getOneLOading ? <Loader/> : getOneError ? <Alert variant="danger"> {getOneError.data.meassage}</Alert> :
  
  (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Item name"
                  name="name"
                  defaultValue={oneItem?._id === editedItemId ? name : null}
                  required
                  minLength={2}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter item name
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Price"
                  name="price"
                  defaultValue={oneItem?._id === editedItemId ? price : null}
                  required
                  minLength={2}
                />
                <Form.Control.Feedback type="invalid">
                  Please add the Price
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row></Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>count in Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Count"
                  name="countInStock"
                  defaultValue={oneItem?._id === editedItemId ? countInStock : null}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please the count
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col>
              <p>Category</p>
              <Form.Select name="category" style={{ marginTop: -6 }}
                onChange={(e) => setCategory(e.target.value)}
                value={oneItem?._id === editedItemId ? category?._id : null}>
                <option >Select</option>
                {categories?.map((category) => (
                  <option key={category?._id} value={category?._id}>{category.name}</option>
                ))}
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col>

                <Row className="my-2">
                  <Col>
                    <Image
                      src={image ? URL.createObjectURL(image) : oneItem?.image?.url }
                      fluid
                      width="100px"
                      height="100px"
                    />
                  </Col>
                </Row>

              <FormGroup>
                <Form.Label>Item Image</Form.Label>
                <Form.Control
                  type="file"
                  className="my-2"
                  name="image"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </FormGroup>

              {/* {imageErrorMessage !== "" && (
                <Alert variant="danger">{imageErrorMessage}</Alert>
              )} */}
            </Col>
          </Row>

          <Modal.Footer>
            <Row className="d-flex justify-content-between w-100">
              <Col md={6}>
                {/* <h6>ssss</h6> */}
                {/* {isLoading ? (<Loader height="50px" width="50px"/>) : error ? <Alert>{error.message}</Alert> : null} */}
              </Col>
              <Col md={6} className="d-flex justify-content-end gap-2">
                <Button onClick={() => setShowEditItemModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">save</Button>
              </Col>
            </Row>
          </Modal.Footer>
        </Form>
  )
  
  }
      </Modal.Body>
    </Modal>
  );
};

export default EditItemModal;