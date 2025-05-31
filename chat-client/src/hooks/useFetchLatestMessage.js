// about show latest message on UserChat
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { baseUrl, getRequest } from "../utils/services";

export const useFecthLatestMessage = (chat) => {
    const { newMessage, notifications } = useContext(ChatContext);
    const [latestMessage, setLatestMessage] = useState(null) ;

    useEffect(() =>{
        // request request messages using chatID
        const getMessages = async () => {
            const response = await getRequest(`${baseUrl}/messages/${chat?._id}`);
            if (response.error) {
                return console.log("Error getting messages...", error);
            }
            const lastMessage = response[response?.length - 1];
            setLatestMessage(lastMessage);
        };
        getMessages();
    }, [newMessage, notifications]) ;

    return { latestMessage };
};