import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useContext } from "react";

const PotentialChats = () => {
    // show list of user that have not chat with main user yet
    const {user} = useContext(AuthContext);
    const {potentialChats , createChat , onlineUsers} = useContext(ChatContext);

    console.log("user in potenchat",user);
    console.log("onlineUsers in potenchat",onlineUsers);

    return(
    <>
        <div className="all-users">
        {potentialChats && 
            potentialChats.map((u,index)=>{
                return(
                    <div className="single-user" key={index} onClick={()=>createChat(user._id, u._id)}> 
                        {/* user._id : id of main user ,
                        u._id    : id of potential user */}
                        {u.name}
                        <span className={onlineUsers?.some((user) => user?.userId === u?._id )? "user-online":""}></span>
                    </div>
                );
            })}
        </div>
    </>
    )   
};

export default PotentialChats;