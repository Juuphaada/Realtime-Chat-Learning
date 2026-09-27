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
- Mongoose
- Socket.IO

Security:
- JWT
- bcrypt

Storage:
- Cloudinary
- MongoDB
- ioredis

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

APIs Protection
- Express-rate-limit

Date & Time:
- Moment.js

User Experience:
- React Input Emoji

## Tools
- Git
- Postman

## Running Project Locally

### Brief MongoDB Deployment Guide

1. Create a MongoDB account at [MongoDB Atlas](https://account.mongodb.com?utm_source=chatgpt.com).

2. Go to **Database & Network Access > Database Users** and create a new database user with **Password Authentication**.

3. Create a new cluster. You can select **MongoDB for VS Code** if you want to connect and manage the database through VS Code.

4. Get the cluster **Connection String** and replace `<db_password>` with the password of your database user.

5. In the `.env` file, assign the connection string to the `ATLAS_URI` variable:

```env
ATLAS_URI=mongodb+srv://<username>:<db_password>@<cluster-url>/<database-name>
```

6. Start the Chat Server. The server should connect to MongoDB successfully.

> If the connection fails, check that your MongoDB cluster is running and that your current IP address is allowed in **Network Access**.

### Setting Up Redis

Redis is used as a local Docker container.

1. Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop/).

2. Open PowerShell and create a Redis container:

```powershell
docker run -d --name YOUR_DOCKER_CONTAINER_NAME -p 6379:6379 redis:7-alpine
```

3. Check Docker Desktop to make sure the Redis container is running.

4. In the `.env` file, set the `REDIS_URL` variable:

```env
REDIS_URL=redis://localhost:6379
```

5. Keep the Redis container running before starting the Chat Server.

> You can check the Redis container status with:
>
> ```powershell
> docker ps
> ```

### Running the Project

The project consists of three services: **Chat Server**, **Client**, and **Socket Server**.

#### 1. Start the Chat Server

Open a terminal in the `chat-server` folder:

```bash
cd chat-server
node index.js
```

#### 2. Start the Client

Open another terminal in the `chat-client` folder:

```bash
cd chat-client
npm run dev
```

#### 3. Start the Socket Server

Open another terminal in the `socket` folder:

```bash
cd socket
nodemon
```

After all three services are running, open the client URL shown by Vite in your browser.


## Usage
- At the register page (http://localhost:xxxx/register), fill out the registration form and submit it.
- Wait for the page to redirect to the user chat.
- To add a friend, go to the tab above. There are boxes containing the names of other users (other users must be registered before). Click on one or more users to add them.
- In the friends list, click on a friend’s account to open the chat box.
- Type a message in the message box and click the send icon.
- To send an image, click the image icon to upload an image, then click the send icon.
- when there're new message from other user, there are notification marking on the icon of the top-right of the page, click the icon to see details and select at message to open the chat box that new message is form.
- Loging out by click at the logout link at the top-right of the page.


