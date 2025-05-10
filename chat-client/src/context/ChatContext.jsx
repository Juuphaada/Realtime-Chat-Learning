import { createContext , useState,useEffect} from "react";
import { baseUrl,getRequest,postRequest } from "../utils/services";
import { useCallback } from "react";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextProvider = ({children,user}) => {
    //"user" main user

    const [userChats, setUserChats] = useState(null); // for geting a user
    const [isUserChatsLoading, setisUserChatsLoading] = useState(false);
    const [userChatsError, setuserChatsError] = useState(null);
    const [potentialChats, setPotentialChats] = useState([]); // list of users that haven't chat with main user yet
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null);
    const [sendTextMessageError, setSendTextMessageError] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const [socket, setSocket] = useState(null);
    const [onlineUsers,setOnlineUsers] = useState([]);

    // connect client to socket server
    useEffect(()=>{
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket);

        return () => {
            newSocket.disconnect() 
            // return clean up function , if you no longer using it or try to re connect
        }
    },[user]); // whatever there're new user set new socket

    // add online users
    useEffect(()=>{
        if(socket === null) return;
        socket.emit("addNewUser", user?._id) //emit trigger an event
        // sent user id throw parameter
        // if socket is null, we unable to trigger an event

        socket.on("getOnlineUsers",(res)=>{ // recieved an event
            setOnlineUsers(res);
        }); // get list of online users from socket server
    },[socket]);
    
    useEffect(()=>{
        if (socket === null) return;

        const recipientId = currentChat?.members.find((id)=>id !== user?._id); // find chat that user are currently active

        socket.emit("sendMessage",{...newMessage,recipientId})
    },[newMessage]);

    // recive message from socket
    useEffect(()=>{
        if (socket === null) return;

        socket.on("getMessage", res => {
            if(currentChat?._id !== res.chatId) return   
            setMessages((prev) => [...prev,res]) //res : a new message
        })

        return () =>{
            socket.off("getMessage")
        }
    },[socket,currentChat]);

    useEffect(()=>{
        const getUsers = async() =>{
        // to get PotentialChats
        // (get users who dont have chat box with main user yet)

            const response = await getRequest(`${baseUrl}/users`);
            // get every user

            if(response.error){
                return console.log("Error fetching users", response);
            }

            // filter to get all user at a time , response is in array of users, to find if some of that user have same chat with main user
            const pChats = response.filter((u)=>{
                let isChatCreated = false;

                if(user?._id === u._id) return false;
                // we wont add main user to users array
                // so when it coming to same user id just return false

                if(userChats){ //if main user have any Chats

                    // .some is array methoud that return Boolean
                    isChatCreated = userChats?.some((chat)=>{
                        //true if user is a member of chat that main user got (if that user ever chat with main user )
                        return chat.members[0] === u._id || chat.members[1] === u._id ;
                    });

                }
                // want to return ture if chat isnt created
                return !isChatCreated;
            });
            setPotentialChats(pChats);
        };
        getUsers();
    },[userChats]);

    // get all chats that main user exist
    useEffect(() => {
        const getUserChats = async()=>{ 
            // check if main user exist then get users id
            if(user?._id){
                setisUserChatsLoading(true)
                setuserChatsError(null);

                const response = await getRequest(`${baseUrl}/chats/${user?._id}`)
                setisUserChatsLoading(false)

                if(response.error){
                    return setuserChatsError(response)
                }

                setUserChats(response)
            }
        }
        getUserChats()
    },[user]);

    useEffect(() => {
        const getMessages = async()=>{ 
            // check if main user exist then get users id
            setIsMessagesLoading(true);
            setMessagesError(null);

            const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`);
            setIsMessagesLoading(false);

            if(response.error){
                return setMessagesError(response);
            }

            setMessages(response);
        };
        getMessages();
    },[currentChat]);

    const sendTextMessage = useCallback(async(textMessage,sender,currentChatId, setTextMessage) => {
        if(!textMessage) return console.log("You must type something...")  

        const response = await postRequest(
            `${baseUrl}/messages`,
            JSON.stringify({
            chatId: currentChatId,
            senderId: sender._id,
            text: textMessage
            })
        ); 

        if(response.error){
            return setSendTextMessageError(response);
        }

        setNewMessage(response); 
        //use this new message tell socket server that we have new message and update recipient
        setMessages((prev)=>[...prev,response]);
        setTextMessage("");

    },[]);

    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat)
    },[])

    //creat new chat for main user
    const createChat = useCallback(async(firstId,secondId)=>{
        const response = await postRequest(`${baseUrl}/chats`, JSON.stringify({
            firstId,secondId,
            })
        );
        if(response.error){
            return console.log("Error creating chat", response);
        }

        setUserChats((prev)=>[...prev,response]);
    },[]);

    return (
    <ChatContext.Provider value = {{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateCurrentChat,
        messages,
        isMessagesLoading,
        messagesError,
        currentChat,
        sendTextMessage,
        onlineUsers
    }}>
        {children}
    </ChatContext.Provider>
    );
};