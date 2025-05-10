// Set up route

import { Routes,Route,Navigate } from "react-router-dom";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";

function App(){
  //get user data from AuthContext to here
  const {user} = useContext(AuthContext);

  return (
  <ChatContextProvider user = {user}>
    <NavBar/>
    {/*component form ./components/NavBar */}
    <Container className="text-secondary"> 
    {/*Container is bootstrap component, work like <div> in html*/}
      
      <Routes> {/* Set up page route*/}
        <Route path="/" element={user ? <Chat/>: <Login/>} /> {/*if user exit show chat, if no back to login page*/}
        <Route path="/register" element={user ? <Chat/>:<Register/>} /> {/*and if user exit ,cant go to Register or login agian*/}
        <Route path="/login" element={user ? <Chat/>:<Login/>} />
        <Route path="*" element={<Navigate to="/"/>} /> 
        {/*when page doesnt exist go to loot(chat page)*/}
      </Routes>
    </Container>
  </ChatContextProvider>
  );
}

export default App;