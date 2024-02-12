const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const userRouter = require('./src/routes/userRouter');

// Connect to MongoDB
const uri =
  'mongodb+srv://dipin:dnPLzeD2UX3lNmFO@cluster0.8hagc3d.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(uri);

const app = express();

// Middleware: Ensure correct `express.json()` import
app.use(express.json());

// Your route for the root URL
app.get('/', (req, res) => {
  res.send('call get');
});

app.use('/user', userRouter);

// Create HTTP server and listen on port 3000
const server = http.createServer(app);

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
