import { Container,Nav,Navbar,Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import Notification from "./chat/Notification";


//NavigeteBar in hoem page (chat)
const NavBar = () => {
    // get user variable , logoutUser funtion
    const {user,logoutUser} = useContext(AuthContext);

    return (
    <Navbar bg="dark" className="mb-4" style={{height:"3.75rem"}}>
        <Container>
            <h2>
                <Link to="/" className="link-light text-decoration-none"> 
                    ChattApp
                </Link> 
                {/**link will take us back to home when click ChattApp text**/}
                {/*className="link-light... , use bootstrap to edit ChattApp text to normal white*/}
            </h2>
            
            {/*if user state exist show text with username*/}
            {user && (
            <>
                <span className="text-warning">logged in as {user?.name}</span>
                {/*yellow text in navigeter bar*/}
            </>
            )}

            <Nav>
                <Stack direction="horizontal" gap={3}>
                    {/*if user state exist show only 'logout' button*/}
                    {user && (
                    <>
                    <Notification/>
                        <Link onClick={()=> logoutUser()} to="/login"className="link-light text-decoration-none">
                        Logout
                        </Link>
                    </>
                    )}

                    {/*if user state don't exist show only 'login' and 'register' button*/}
                    {!user && (
                    <>   
                        <Link to="/login"className="link-light text-decoration-none">
                        Login
                        </Link>
                        <Link to="/register"className="link-light text-decoration-none">
                        Register
                        </Link>
                    </>
                    )}
                    
                </Stack>
            </Nav>

        </Container>
    </Navbar>);
}

export default NavBar;