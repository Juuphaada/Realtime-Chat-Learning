//Context API, can be able to easily access a shared data globally
import { useCallback } from "react";
import {createContext,useState} from "react";
import { postRequest } from "../utils/services.js";
import { baseUrl } from "../utils/services.js";
import {useEffect } from 'react';

// create AuthContext
export const AuthContext = createContext();

//provider componant containing our data
//{children} is the components that are the child of AuthContextProvider component
export const AuthContextProvider = ({ children }) => {
    /*const [user,setUser] = useState({
    * name: "Charles", }); 
    * //initial value of user name "Charles"
    */

    const [user,setUser] = useState(null);
    //for rendering the error when registering 
    const [registerError, setRegisterError] = useState(null)
    // add some loading status
    const [isRegisterloading, setIsRegisterLoading] = useState(false)
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email:"",
        password:"",
    });

    // login error state
    const [loginError, setloginError] = useState(null)
    const [isLoginLoading, setIsLoginLoading] = useState(false)
     // loginInfo for handing the state of login
    const [loginInfo, setloginInfo] = useState({
        email:"",
        password:"",
    });

    console.log("User", user);
    console.log("loginInfo",loginInfo);

    //whenever we refeash browser, there still user's state(still log in as that user)
    useEffect(()=>{
        const user = localStorage.getItem("User"); // get this registed user from local storage
        setUser(JSON.parse(user));//our user now available in state
    },[]);
    

    //use callback hook
    // (info) => {}, a callback funtion
    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
        // update info through our provider
    },[]);

    const updateLoginInfo = useCallback((info) => {
        setloginInfo(info);
        // udate info through our provider
    },[]);

    //funtion for able to register a user 
    const registerUser = useCallback(async(e) => {
        // now we able to perform our post request right here
        //by just call postRequest from "sevices.js" and passing anything

        // event to prevent the form from refreshing the page when submit form
        e.preventDefault();

        setIsRegisterLoading(true); // our load and registration is going on
        setRegisterError(null); // to make sure we dont have a error when we are beginning to make the request 

        // parem1 : url , read 'baseUrl' variable from "service.jsx"
        // parem2 : a Json object
        const response = await postRequest(
            `${baseUrl}/users/register`, 
            JSON.stringify(registerInfo)
        );

        // after we have completed this request 
        //we can say that our registration has stop happening
        // after that we will either log in the user of will show error mesagge
        setIsRegisterLoading(false);

        // if error exited
        if(response.error){
            return setRegisterError(response);
        }

        // save the user to the local storage
        // so we can get the user back whenever we refresh our browser, and do not have to login again
        localStorage.setItem("User",JSON.stringify(response))
        
        // setUser to be our response
        setUser(response)

    },[registerInfo]);

    //login funtion, similler to register funtion
    const loginUser = useCallback(async(e)=>{
        
        e.preventDefault()

        setIsLoginLoading(true)
        setloginError(null)

        const response = await postRequest(
            `${baseUrl}/users/login`, 
            JSON.stringify(loginInfo)
        );

        setIsLoginLoading(false)

        if(response.error){
            return setloginError(response)
        }

        localStorage.setItem("User",JSON.stringify(response))
        setUser(response)

    },[loginInfo]); 

    //funtion for logout user
    const logoutUser = useCallback(()=>{
        localStorage.removeItem("User"); //remove user state
        setUser(null);
    },[]);


    //return a component provided by AuthContext object
    return (  
        <AuthContext.Provider 
            //set value to be an object , we can extract multiple values form here
            value = {{ 
                user,
                registerInfo,
                updateRegisterInfo,
                registerUser,
                registerError,
                isRegisterloading,
                logoutUser,
                loginUser,
                loginError,
                loginInfo,
                updateLoginInfo,
                isLoginLoading
            }} // this value object can be acess in  {children} components(<App>)
        > 
        {/*pass "user" object, we can extract multiple values form here*/} 
        {/*pass all other components that will be making use AuthContext data in here */}

        {children} {/**now we can access user, registerInfo, updateRegisterInfo in this {children} components*/}

        </AuthContext.Provider> 
    );
};