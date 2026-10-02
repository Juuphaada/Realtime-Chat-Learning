import {Stack} from "react-bootstrap";
import InputEmoji from "react-input-emoji";

const ChatInput = ({
    textMessage,
    setTextMessage,
    sendTextMessage,
    user,
    currentChat,
    imageInputRef,
    handleFileChange,
    isMessageSending
}) => {

    const handleSendMessage = () => {
        sendTextMessage(
            textMessage,
            user,
            currentChat._id,
            setTextMessage
        );
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <Stack
            direction="horizontal"
            gap={3}
            className="chat-input flex-grow-0"
        >
            <InputEmoji
                value={textMessage}
                onChange={setTextMessage}
                onKeyDown={handleKeyPress}
                fontFamily="nunito"
                borderColor="rgba(72,112,223,0.2)"
            />

            <button onClick={() => imageInputRef.current?.click()} >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-image-alt" viewBox="0 0 16 16">
                    <path d="M7 2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m4.225 4.053a.5.5 0 0 0-.577.093l-3.71 4.71-2.66-2.772a.5.5 0 0 0-.63.062L.002 13v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4.5z"/>
                </svg>
            </button>

            <input
                id="file-upload"
                type="file"
                className="d-none"
                ref={imageInputRef}
                onChange={(e) => handleFileChange(e.target.files)}
                multiple
                accept="image/*"
            />

            <button
                className="send-btn"
                onClick={handleSendMessage}
                disabled={isMessageSending}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                </svg>
            </button>
        </Stack>
    );
};

export default ChatInput;