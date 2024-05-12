import { Col, Row, Table } from 'react-bootstrap'
import { useGetBillsQuery, useGetOneBillQuery } from '../redux/slices/billsApiSlice'
import BillDetailsModal from './../components/BillDetailsModal';
import { useRef, useState } from 'react';


const Bills = () => {
const [showBillDetailsModal, setShowBillDetailsModal] = useState(false)
  const {data : bills} = useGetBillsQuery();
const [billId, setBillId] = useState();


const  handleOpenBillModal = (id) => {
  setBillId(id);
  setShowBillDetailsModal(true);
};
  return (
  
    <>
<BillDetailsModal showBillDetailsModal={showBillDetailsModal} setShowBillDetailsModal={setShowBillDetailsModal} billId={billId}/>
      <Row className='align-items-center my-4'>
        <Col>
          <h3>Bills</h3>
        </Col>
        <Col className='pe-5 text-end '>
    
        </Col>
      </Row>
    
      <Row>
        <Col>
        <Table responsive striped>
            <thead>
              <tr>
                <th>Serial</th>
                <th>ID</th>
                <th>Customer</th>
                <th>Subtotal</th>
                <th>Tax</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
    
            <tbody>
          {bills?.map((bill , index) => 
            <tr key={bill?._id}>
              <td>{index + 1}</td>
              <td>{bill?._id}</td>
                <td>{bill?.customerName}</td>
                <td>{bill?.totalPrice}</td>
                <td>{bill?.tax}</td>
                <td>{bill?.subTotal}</td>
                <td  style={{cursor : "pointer"}}>
                <i className="bi bi-eye text-primary fs-4 " onClick={() => handleOpenBillModal(bill?._id)}></i>
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

export default Bills