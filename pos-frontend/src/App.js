import { Col, Container, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';
import Footer from './layout/Footer';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

function App() {
  const {userInfo} = useSelector(state => state.auth)
  return (

<>
<Header/>
<Container fluid>

<Row className='my-5'>

{userInfo && userInfo?.name &&  
<>
<Col md={3}> <Sidebar/> </Col>
<Col md={9}>  <Outlet/>  </Col>
</>
}
{!userInfo && !userInfo?.name &&  
<>
<Col md={12}>  <Outlet/>  </Col>
</>
}

{/* <Col md={3}> <Sidebar/> </Col>
<Col md={9}>  <Outlet/>  </Col> */}

  </Row>

  </Container>
  <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  toastOptions={{
    // Define default options
    duration: 5000,
    style: {
      background: '#363636',
      color: '#fff',
    },
    // Default options for specific types
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>
  <Footer/>
</>
  );
}

export default App;
