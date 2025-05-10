import { useEffect,useState } from "react";
import { baseUrl,getRequest } from "../utils/services";

export const useFetchRecipientUser = (chat,user) =>{
    // "user" at parameter will be call "main user"

    const [recipientUser,setRecipientUser] = useState(null);
    const [error,setError] = useState(null);

    // useEffect to fetch our other user from the DB  
    // but before do that , we should know the ID of the other user that ever chat with main user

    const recipientId = chat?.members.find((id)=>id !== user?._id);
    // access chat members, find users Id that are member of chat and return Ids
    // which isn't equle to main user's id 

    useEffect(()=>{
        const getUser = async() => {
            if(!recipientId) return null;

            const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);
            if(response.error){
                return setError(response);
            }
            setRecipientUser(response);
        };
        getUser();
    },[recipientId]);

    return {recipientUser};
};