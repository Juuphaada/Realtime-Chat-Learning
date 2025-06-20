import { useContext } from "react";
import { useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { unreadNotificationsFunc } from "../../utils/unrealNotifications";
import moment from "moment";

const Notification = () => {

    const [isOpen, setIsOpen] = useState(false);
    const {user} = useContext(AuthContext);
    const {notifications,userChats,allUsers} = useContext(ChatContext);

    //filter , only unread notification will show up in notification box
    const unreadNotifications = unreadNotificationsFunc(notifications)
    const modifiedNotifications = notifications.map((n) => {
        const sender = allUsers.find(user => user._id === n.senderId)
        return {
            ...n,
            senderName : sender?.name,
        }
    });

    console.log("unreadNoti",unreadNotifications);
    console.log("modiNoti",modifiedNotifications);

    return ( <div className="notifications">
        <div className="notification-icon" onClick={()=> setIsOpen(!isOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chat-left-text-fill" viewBox="0 0 16 16">
            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z"/>
            </svg>
            {unreadNotifications?.length === 0 ? null :(
                <span className="notification-count">
                    <span>{unreadNotifications?.length}</span>
                </span>
            )}
        </div>
        {isOpen? (
            <div className="notifications-box">
                <div className="notifications-header">
                    <h3>Notifications</h3>
                    <div className="mark-as-read"> Mark all as read</div>
                </div>
                
                {modifiedNotifications?.length === 0 
                ? <span className="notification">No notification yet..</span>
                : null}
                    {modifiedNotifications && modifiedNotifications.map((n, index) => {
                        return <div key={index} className={n.isRead ? 'notification':'notification not-read'}> 
                            <span>{`${n.senderName} sent you a new meassage`}</span>
                            <span className="notification-time">{moment(n.date).calendar()}</span>
                        </div>
                })}
                </div>
        ) :null}
        
    </div> 
    );
}
 
export default Notification;