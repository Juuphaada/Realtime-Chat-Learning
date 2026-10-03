import {useContext,useState, useRef,useEffect} from "react";
import React from "react";
import {Component} from "react";
import {Stack,Form} from "react-bootstrap";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import moment from "moment";
import InputEmoji from "react-input-emoji";
import ChatInput from "./ChatInput";
import { PhotoProvider, PhotoView } from 'react-photo-view';

const ChatBox = () => {
    const {user} = useContext(AuthContext);
    const {currentChat, 
        messages,
        isMessagesLoading,
        sendTextMessage,
        handleFileChange,
        imageQueueRef,
        deleteImage,
        imagesPreview,
        sendingImages,
        isMessageSending} = useContext(ChatContext);
    const {recipientUser} = useFetchRecipientUser(currentChat,user);
    const [textMessage, setTextMessage] = useState("");
    const scroll = useRef();
    const imageInputRef = useRef(null);

    console.log("textMessage",textMessage);
        
    //when new message appear scroll chat down to that new message
    useEffect(()=>{
        scroll.current?.scrollIntoView({behavior:"smooth"});
    },[messages]);

    if (!user) {
        return <p style={{textAlign:"center", width:"100%"}}>Loading user...</p>;
    }

    if (!recipientUser) return(
            <p style={{textAlign:"center", width: "100%"}}>
                No conversation selected yet...
            </p>
    );

    if(isMessagesLoading)
        return (
            <p style={{textAlign:"center", width:"100%"}}>Loading Chat...</p>
    );

    return (
    
    <Stack gap={4} className="chat-box">
        <div className="chat-header">
            <strong>{recipientUser?.name}</strong>
        </div>

        <Stack gap={3} className="messages">
        
        <PhotoProvider>
        
            {messages && 
            
                messages.map((message, index) => (
                    <React.Fragment key={message._id || index}>
                        {message.text && (
                                <Stack 
                                key={index} 
                                className={`${message?.senderId === user?._id 
                                ? "message self align-self-end flex-grow-0"
                                : "message align-self-start flex-grow-0"}`}
                                ref = {scroll}
                                > 
                                    <span>{message.text}</span>
                                    <span className="message-footer">{moment(message.createdAt).calendar()}</span>
                                </Stack>

                        )}
                        {message.image && (
                            <div className={`${message?.senderId === user?._id 
                                    ? "align-self-end flex-grow-0"
                                    : "align-self-start flex-grow-0"}`}
                            >

                                <PhotoView src={message.image}>
                                    
                                    <img
                                        src={message.image}
                                        alt="Attachment"
                                        className={`${message?.senderId === user?._id 
                                            ? "custom-image-message"
                                            : "custom-image-message"}`}
                                        
                                        ref = {scroll}
                                        //className="sm:max-w-[200px] rounded-md mb-2"
                                    />
                                </PhotoView>

                                <p className="align-self-end flex-grow-1" style={{fontSize: 12}}>
                                    {moment(message.createdAt).calendar()}
                                </p>
                                
                            </div>
                        )}
                    </React.Fragment>
                ))
            }
        </PhotoProvider>   

        </Stack>

        {imagesPreview.length === 0 ? null :(
            <div
                style={{
                    maxHeight: "250px",
                    minHeight: "150px",
                    overflowY: "auto",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                    gap: "12px",
                    padding: "8px",
                }}
            >
                {imagesPreview.map((img, index) => (
                    <div
                        key={index}
                        style={{
                            position: "relative",
                        }}
                    >
                        <button
                            disabled = {sendingImages}
                            onClick={() => deleteImage(index)}
                            style={{
                                position: "absolute",
                                top: 5,
                                right: 5,
                                zIndex: 1,
                            }}
                        >
                            ✕
                        </button>

                        <img
                            src={img}
                            alt={`preview-${index}`}
                            style={{
                                width: "100%",
                                height: "120px",
                                objectFit: "cover",
                                borderRadius: "8px",
                            }}
                        />
                    </div>
                ))}
            </div>
        )}

        <ChatInput
            textMessage={textMessage}
            setTextMessage={setTextMessage}
            sendTextMessage={sendTextMessage}
            user={user}
            currentChat={currentChat}
            imageInputRef={imageInputRef}
            handleFileChange={handleFileChange}
            isMessageSending={isMessageSending}
        />
        
        
    </Stack>
    );
};
 
export default ChatBox;