import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import {Container, Stack} from "react-bootstrap"
import UserChat from "../components/chat/UserChat";
import {AuthContext} from "../context/AuthContext"
import PotentialChats from "../components/chat/PotentialChats";
import ChatBox from "../components/chat/ChatBox";

const Chat = () => {
    const {user} = useContext(AuthContext);

    const {userChats,
        isUserChatsLoading,
        updateCurrentChat} = useContext(ChatContext);

    return (
        <Container>
            <PotentialChats/>

            {/*check if have any chat*/}
            {/*if true (no any chat) then not display anything*/}
            {/*if flase (there are chats) display stack component*/}

            {userChats?.length < 1 ? null : (
            <Stack direction="horizontal" gap={4} className="align-items-start">

                {/*list of chats*/}
                <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
                    {isUserChatsLoading && <p>Loading chats...</p>}
                    {userChats?.map((chat,index)=>{
                        return(
                            <div key={index} onClick = {()=>updateCurrentChat(chat)}>
                                <UserChat chat={chat} user={user}/>
                            </div>
                        )
                    })}

                </Stack>

                {/*display chat Box*/}
                <ChatBox/>
        
            </Stack>
        )}
        </Container>
    );
};

export default Chat;