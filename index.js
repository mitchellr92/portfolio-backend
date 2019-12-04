const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const knex = require("knex");
const dbConfig = require("./knexfile.js");
const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(cors());
server.use(morgan());

const PORT = 1234;

server.post("/api/message", (req, res) => {
  const newMessage = req.body;

  if (newMessage.name && newMessage.email && newMessage.message) {
    db("message")
      .insert(newMessage)
      .then(itemId => {
        res.status(200).json(itemId);
      })
      .catch(err => {
        res.status(500).json({ message: "Failed to send message" });
      });
  } else {
    res.status(500).json({ message: "Missing name, email or message" });
  }
});

server.get("/api/message", (req, res) => {
  db("message")
    .then(messages => {
      res.status(200).json(messages);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get messages" });
    });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
