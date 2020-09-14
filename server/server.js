const express = require("express")
const mongoose = require('mongoose')

const Message = require('./models/message')

// Create server to serve index.html
const app = express()
const http = require('http').Server(app)
const port = process.env.PORT || 3000

// Routing
const path = require('path')
app.use(express.static(path.join(__dirname, "..", "build")))

// Socket.io serverSocket
const io = require('socket.io')(http)

// Start server listening process
http.listen(port, () => {
    console.log(`Server listening on port ${port}.`)
})

// Connect to mongo
mongoose.connect('mongodb+srv://user_0:abc1234@cluster0.darhh.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
db = mongoose.connection

db.on('error', error => {
    console.log(error)
})
db.once('open', () => {
    console.log('MongoDB connected!')
    io.on('connection', socket => {
        const sendStatus = s => {
            socket.emit('status', s)
        }

        // First time running
        Message.find()
            .limit(100)
            .sort({ _id: 1 })
            .exec((err, res) => {
                if (err) throw err

                socket.emit('init', res)
            })

        socket.on('input', data => {
            const id = data.id;
            const price = data.price;
            const message = data.message;
            const date = data.date;

            // Insert message
            const messages = new Message({ id, price, message, date })
            messages.save(err => {
                if (err) console.error(err)
                socket.broadcast.emit('output', data)

                // Saved!
                sendStatus({
                    messages: 'Message sent',
                    clear: true
                })
            })
        })

        socket.on('clear id', id => {
            // Remove data with specific id
            Message.deleteOne({'id': id}, () => {
                // Emit cleared
                socket.broadcast.emit('id cleared', id)
            })
        })

        socket.on('clear all', () => {
            // Remove all chats from collection
            Message.deleteMany({}, () => {
                // Emit cleared
                socket.broadcast.emit('all cleared')
            })
        })
    })
})
