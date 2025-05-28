const { Server } = require("socket.io");

const io = new Server({cors:"http://localhost:5173"}); // localhost:5173 is client side address

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("new connection", socket.id);

  // socket.on :  listen to a connection, listen to event from cilent and action
  socket.on("addNewUser",(userId) => { //reciveing user id from client
    !onlineUsers.some(user => user.userId === userId) &&
        //perfroming onlineUsers.push when online user not equet user id from client
        //(add new [userId] with new created [socketId] when userId not alredy in [onlineUsers] yet)
        onlineUsers.push({
            userId,
            socketId: socket.id
        });

    // io.emit : to trigger an event, and it recivened by client
    io.emit("getOnlineUsers",onlineUsers); // send list of online user to client side
    // onlineUser: list for identify socket.id for privete message and identify user who online at that time
  });

// add message
socket.on("sendMessage",(message)=>{
  const user = onlineUsers.find(user => user.userId === message.recipientId) // if user that chat with main user is online

  if(user){
    //send message to recived client
    io.to(user.socketId).emit("getMessage",message) 

    // send notification
    io.to(user.socketId).emit("getNotification",{
      senderId: message.senderId,
      isRead: false,
      date: new Date(),
    });
  }
});

  socket.on("disconnect",()=>{
    onlineUsers = onlineUsers.filter((user)=>user.socketId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });
});

io.listen(3000);// this port need to be diffrent form client and server port