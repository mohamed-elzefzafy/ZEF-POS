import { Spinner } from "react-bootstrap";


const Loader = ({width="100px" , height="100px" }) => {
  return (
  <Spinner
    animation="border"
    role="status"
    style={{
      width: width,
      height: height,
      margin : "auto",
      display : "block",
      color : "#0d6efd"
    }}
  />
  )
}

export default Loader;