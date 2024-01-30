const express = require("express");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

var users = 0;

// Set up a Socket.IO connection event
// Namespaces in socket
// '/' default connection  (custom-namespace )
var cnsp = io.of("/custom-namespace");
cnsp.on("connection", (socket) => {
  console.log("A user connected");

  cnsp.emit("customEvent", "tester event called ");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Set up the server to listen on a specific port
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
