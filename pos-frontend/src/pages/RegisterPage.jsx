import { useState } from "react";
import { Button, Col, Container, Form, FormGroup, Image, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterApiMutation } from "../redux/slices/userApiSlice";
import { useDispatch } from "react-redux";
import { loginAction } from "../redux/slices/authSlice";
import Loader from '../components/Loader';
import toast from "react-hot-toast";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [validated, setValidated] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
const [registerApi , {isLoading} ] = useRegisterApiMutation();

  const handleSubmit = async(e) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget.elements;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const profilePhoto = form.profilePhoto.files[0];


    if (
      e.currentTarget.checkValidity() === true &&
      name &&
      email &&
      password
    ) {
      const formData = new FormData();
      formData.append("name" , name);
      formData.append("email" , email);
      formData.append("password" , password);
        formData.append("profilePhoto" , profilePhoto);

    

      try {
        const res = await registerApi(formData).unwrap();
        if (res?.loggedIn === "success") {
          dispatch(loginAction({...res})) 
          toast.success("you registered successfully");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } 
      
      } catch (error) {
        toast.error(error?.data?.message)
      }
    }

    setValidated(true);
  };
  return (
    <Container className="mt-5">
      <Row className="d-flex justify-content-md-center align-items-center mt-5 fw-bold fs-5">
        <Col xs={12} md={6}>
          <h1>Register</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your last name"
                name="name"
                required
                minLength={2}
              />
              <Form.Control.Feedback type="invalid">
                Please enter your name
              </Form.Control.Feedback>
            </Form.Group>

            <FormGroup>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                className="my-2"
                placeholder="Email"
                name="email"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter your email
              </Form.Control.Feedback>
            </FormGroup>
            <FormGroup>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                className="my-2"
                placeholder="Password"
                name="password"
                required
                minLength={6}
              />
              <Form.Control.Feedback type="invalid">
                Please enter your password
              </Form.Control.Feedback>
            </FormGroup>

          {profileImage !== null &&   <Image src={profileImage ? URL.createObjectURL(profileImage) : null} fluid width="150px" height="150px"/>}

            <FormGroup>
              <Form.Label>Profile Image</Form.Label>
              <Form.Control
                type="file"
                className="my-2"
                name="profilePhoto"
                onChange={(e) => setProfileImage(e.target.files[0])}
              />
            </FormGroup>

            <Button className="my-3 w-100" type="submit">
              Register
            </Button>
            <p className="text-center">
              Already have an account ? <Link to="/login">Login</Link>
            </p>
            {isLoading &&   <Loader/>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
