const express = require("express");
const path = require("path");
const http = require("http"); // Import the http module for creating the server
const socketIo = require("socket.io"); // Import Socket.IO

const app = express();
const server = http.createServer(app); // Create an HTTP server using Express app
const io = socketIo(server); // Attach Socket.IO to the server

// Define a route for the root endpoint
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
var users = 0;
// Set up a Socket.IO connection event
io.on("connection", (socket) => {
  //socket variable
  console.log("A user connected");

  //message event
  // setTimeout(() => {
  //   socket.send("sending msg from backend");
  //   console.log("msg");
  // }, 1000);
  // 1 custom event create on server side and catch on client side
  // 1 custom event create on client side and catch on server side

  // setTimeout(() => {
  //   socket.emit("myCustom event", {
  //     // emit used to create custom event
  //     description: "A custom msg from server side",
  //   });
  // }, 3000);
  // socket.on("myCustomEventFromFrontend", (data) => {
  //   console.log(data);
  // });
  // io.sockets.emit("broadcast", { message: users + "users connected" });// it is used to broad cast to every user
  users++;
  socket.emit("newUserConnect", { message: "hi welcome dear" });
  socket.broadcast.emit("newUserConnect", {
    message: users + " users connected",
  });
  io.sockets.emit("chatapp", "<p><h1>chatapp</h1></p>"); //used to show msg to every user who is connected
  socket.on("disconnect", () => {
    users--;
    // io.sockets.emit("broadcast", { message: users + "users connected" });
    socket.broadcast.emit("newUserConnect", {
      //Show msg to already connected users
      message: users + " users connected",
    });
    console.log("A user disconnected");
  });
});

// Set up the server to listen on a specific port
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
