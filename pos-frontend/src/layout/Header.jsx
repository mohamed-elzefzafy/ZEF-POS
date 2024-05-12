import React from 'react'
import { Container, Navbar , Badge, Nav, Image  } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Header = () => {
  const {cartItems} = useSelector(state => state.cart);
  const {userInfo} = useSelector(state => state.auth)
  return (
    <header >
    <Navbar bg='dark' variant='dark' expand="lg" collapseOnSelect className=''>
<Container fluid>
<LinkContainer to='/'>
<Navbar.Brand className='text-warning fw-bold fs-5'>

<div className='p-2' style={{border : "2px solid gold" , borderRadius : "10px"}}> Zef-POS</div>
</Navbar.Brand>
</LinkContainer>



{userInfo && userInfo?.name &&  
<div className='d-flex gap-3 align-items-center '>
    {/* <Link className='fs-2 text-warning ' to="/cart"> */}
    <Image src={userInfo?.profilePhoto?.url} fluid width={40} height={40} roundedCircle/>
  {/* </Link> */}
    <LinkContainer className='fs-2 text-warning ' to="/cart">
        <div className='fs-4 '>{userInfo?.name}</div>
  </LinkContainer>

    <Link className='fs-2 text-warning ms-3' to="/cart">
  {cartItems.length > 0 && <Badge bg="danger" className="rounded-circle fs-6"> {cartItems?.length} </Badge>}
  <i className="bi bi-cart4"></i>
  </Link>
</div>
}

{!userInfo&& !userInfo?.name &&
    <div className='d-flex text-warning gap-4 '>
                <LinkContainer to="/login">
                  <Nav.Link>
                    {" "}
                    <i className="bi bi-person"></i> Login
                  </Nav.Link>
                </LinkContainer>

                <LinkContainer to="/register">
                  <Nav.Link>
                    {" "}
                    <i className="bi bi-person"></i> Register
                  </Nav.Link>
                </LinkContainer>
              </div>
  }

</Container>

    </Navbar>
  </header>
  )
}

export default Header