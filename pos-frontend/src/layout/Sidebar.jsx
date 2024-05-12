import React from 'react'
import {  Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useLogoutMutation } from '../redux/slices/userApiSlice';

const Sidebar = () => {
  const [logout] = useLogoutMutation();


  const logoutHandler = async() => {
    try {
      const res = await logout().unwrap();
      if (res.message === "logged out successfully") {
        localStorage.clear();
        window.location.href = "/login";
      }
    } catch (error) {
    }
  };

  return (
<>
      <Navbar className="bg-body-tertiary">
      <LinkContainer to="/">
      <Navbar.Brand><i className="bi bi-house"></i> Home</Navbar.Brand>
      </LinkContainer>
    </Navbar>
    <br />

    <Navbar className="bg-body-tertiary">
      <LinkContainer to="/cart">
      <Navbar.Brand><i className="bi bi-cart4"></i> Cart</Navbar.Brand>
      </LinkContainer>
    </Navbar>
    <br />


    <Navbar className="bg-body-tertiary">
      <LinkContainer to="/bills">
      <Navbar.Brand><i className="bi bi-receipt"></i> Bills</Navbar.Brand>
      </LinkContainer>
    </Navbar>
    <br />


    <Navbar className="bg-body-tertiary">
      <LinkContainer  to="/items">
      <Navbar.Brand><i className="bi bi-list-check"></i> Items</Navbar.Brand>
      </LinkContainer>
    </Navbar>
    <br />


    {/* <Navbar className="bg-body-tertiary">
      <LinkContainer  to="/">
      <Navbar.Brand><i className="bi bi-person"></i> Customers</Navbar.Brand>
      </LinkContainer>
    </Navbar>
    <br /> */}
    <Navbar className="bg-body-tertiary">
      <LinkContainer to="/">
      <Navbar.Brand onClick={logoutHandler}><i className="bi bi-box-arrow-left"></i> Logout</Navbar.Brand>
      </LinkContainer>
    </Navbar>




</>
  )
}

export default Sidebar