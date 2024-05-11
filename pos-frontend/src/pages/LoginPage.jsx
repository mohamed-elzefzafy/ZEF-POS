import { useState } from "react";
import { Alert, Button, Col, Container, Form, FormGroup, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLoginApiMutation } from "../redux/slices/userApiSlice";
import { useDispatch } from "react-redux";
import { loginAction } from "../redux/slices/authSlice";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);

  const [loginApi , {isLoading  , error}] = useLoginApiMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget.elements;

    const email = form.email.value;
    const password = form.password.value;

    if (e.currentTarget.checkValidity() === true && email && password) {
      try {
        const res = await loginApi({email , password}).unwrap();
        if (res?.loggedIn === "success") {
          dispatch(loginAction({...res}))
          toast.success("you logged in successfully");
          // setTimeout(() => {
            navigate("/");
          // }, 2000);
        }
      } catch (error) {
        // toast.error(error?.data?.message);
      }

    }

    setValidated(true);
  };
  return (
    <Container className="mt-5">
      <Row className="d-flex justify-content-md-center align-items-center mt-5 fw-bold fs-5">
        <Col xs={12} md={6}>
          <h1>Login</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
            <Button className="my-3 w-100" type="submit">
              Login
            </Button>
            <p className="text-center">
              You don't have account ? <Link to="/register">Register</Link>
            </p>

            {isLoading ?  <Loader/> : error ? (<Alert variant="danger">{error?.data?.message}</Alert>) : null  }
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
