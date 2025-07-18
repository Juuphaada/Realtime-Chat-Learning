import { useContext } from "react";
import {Alert, Button, Form, Row,Col,Stack} from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
    //const {user} =  useContext(AuthContext) //get returned data from AuthContext.jsx 
    const {
        registerInfo, 
        updateRegisterInfo, 
        registerUser,
        registerError,
        isRegisterloading,
    } = useContext(AuthContext);
    
    return ( 
    <>
    <Form onSubmit={registerUser}>
        <Row style={{
            height: "100vh",
            justifyContent:"center",
            paddingTop: "10%"
        }}> {/*Name field*/}

            <Col xs = {6}>
                <Stack gap={3}>
                    <h2>Register</h2>
                    {/*<h2>{user.name}</h2>*/}

                    <Form.Control type="text" placeholder="Name" onChange={(e)=>
                        updateRegisterInfo({...registerInfo, name: e.target.value})}/>

                    <Form.Control type="email" placeholder="Email" onChange={(e)=>
                        updateRegisterInfo({...registerInfo, email: e.target.value})}/>

                    <Form.Control type="password" placeholder="Password" onChange={(e)=>
                        updateRegisterInfo({...registerInfo, password: e.target.value})}/>

                    {/*show loading status */}
                    <Button variant="primary" type="submit">
                        {isRegisterloading ? "Creating your account" : "Register"}
                    </Button>
                    
                    {/**check if we have an error */}
                    {
                        registerError?.error && ( 
                        <Alert variant="danger">
                        {/*message is coming from ou backend we save*/}
                            <p>{registerError?.message}</p>
                        </Alert>)
                    }
                    
                </Stack>
            </Col>
        </Row>
    </Form>
    </>);
};

export default Register;