

const mongoose = require('mongoose')


chatSchema = new mongoose.Schema ({
    content : {
        type: String
    },
    user: {
        type: String
    },
    roomId: {
        type: String
    }
})


const chat = mongoose.model('Chat', chatSchema)

module.exports = chat