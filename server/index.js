const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const http = require('http');
const socket = require('./socket');

const app = express();
const server = http.createServer(app);

const io = socket.init(server);

require('dotenv').config();

const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || origin === 'http://localhost:3000') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(uri, {});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const tasksRouter = require('./routes/tasks');
const usersRouter = require('./routes/users');

app.use('/task', tasksRouter);
app.use('/user',usersRouter);

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});