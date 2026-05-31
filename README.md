A real-time chat application that user can send messages to other users, receive messages and notify the new message. This project was developed to learn and practice JavaScript, node.js and React.js for developing web application. Thank to Chaoo Charles, The project was inspired by and developed with guidance from a tutorial. furthermore, I would add more feature to make this application more comprehensive.

## Features
- User registration
- User login
- View all other user accounts.
- Add other users as friends.
- Real-time chat with friends (texting)
- Real-time incoming message notifications
- Display users’ current online status.

### Add-on Feature
- Sending image in chat

## Backend Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO

Security:
- JWT
- bcrypt

Storage:
- Cloudinary

## Frontend Tech Stack

Core:
- React
- Vite

UI:
- Bootstrap
- React Bootstrap

Routing:
- React Router DOM

Real-time Communication:
- Socket.IO Client

Date & Time:
- Moment.js

User Experience:
- React Input Emoji

## Tools
- Git
- Postman

## Execute the project
1. Open "chat-server" folder in terminal and run the server.
''' cd chat-server
''' node index.js 
2. Open "chat-client" folder in terminal and run the client's site.
''' cd chat-client
''' npm run dev
3. Open "socket" folder in terminal and run the soceket server.
''' cd socket
''' nodemon

## Usage
- At the register page (http://localhost:xxxx/register), fill out the registration form and submit it.
- Wait for the page to redirect to the user chat.
- To add a friend, go to the tab above. There are boxes containing the names of other users (other users must be registered before). Click on one or more users to add them.
- In the friends list, click on a friend’s account to open the chat box.
- Type a message in the message box and click the send icon.
- To send an image, click the image icon to upload an image, then click the send icon.
- when there're new message from other user, there are notification marking on the icon of the top-right of the page, click the icon to see details and select at message to open the chat box that new message is form.
- Loging out by click at the logout link at the top-right of the page.

