const express = require('express');
const http = require('http');
require('dotenv').config()
const cors = require('cors');
const socket = require('socket.io');
const bookSocket = require('./sockets/bookSocket');
require('./config/db')()
const bookRoutes = require('./routes/bookRoutes')

const app = express();
app.use(express.json());

const server = http.createServer(app);

const io = socket(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'UPDATE', 'DELETE']
    }
});
app.use(cors({ origin: "*" }));

app.use((req, res, next) => {
    req.io = io;
    next()
})

app.use("/api/books", bookRoutes);
bookSocket(io);


app.use('/', (req, res) => {
    try {
        res.status(200).send({
            status: true,
            message: "setup success"
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        })
    }
})


server.listen(8080, () => {
    console.log('server is listing in: http://localhost:8080');
})