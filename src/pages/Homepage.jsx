import { Alert }  from "react-bootstrap";
import { Button } from "react-bootstrap";
import './Homepage.scss';

const Homepage = () => {
    return ( 
        <div className="homepage">
            <Alert variant="success">This is success alert!</Alert>
            <h1>This is the Homepage</h1>
            <Button variant="primary">Click Me</Button>
        </div>
     );
}
 
export default Homepage;