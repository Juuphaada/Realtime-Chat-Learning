import { useContext } from "react";
import {Alert, Button, Form, Row,Col,Stack} from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Login = () => {

    // extract information from AuthContext.jsx
    const {
    loginUser,
    loginError,
    loginInfo,
    updateLoginInfo,
    isLoginLoading} = useContext(AuthContext);

    {/**similler to register user*/}
    return ( 
    <>
    <Form onSubmit = {loginUser}>{/**call loginUser funtion*/}
        <Row style={{
            height: "100vh",
            justifyContent:"center",
            paddingTop: "10%"
        }}> {/*Name field*/}
            <Col xs = {6}>
                <Stack gap={3}>
                    <h2>Login</h2>
                    <Form.Control type="email" placeholder="Email" 
                    onChange = {(e) => updateLoginInfo({...loginInfo, email: e.target.value})}/>
                    <Form.Control type="password" placeholder="Password"
                    onChange = {(e) => updateLoginInfo({...loginInfo, password: e.target.value})}/>
                    <Button variant="primary" type="submit">
                        {isLoginLoading? "Getting you in...":"Login"}
                    </Button>

                    {loginError?.error && (
                    <Alert variant="danger">
                        <p>{loginError?.message}</p>
                    </Alert>
                    )}
         
                </Stack>
            </Col>
        </Row>
    </Form>
    </>
    )
}

export default Login;