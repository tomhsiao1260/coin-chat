const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const MessageSchema = new Schema({
	id: {
		type: Number,
		required: true,
	},
	price: {
		type: String,
	},
	message: {
		type: String,
	},
	date: {
		type: Date, 
	}
})

// Creating a table within database with the defined schema
const Message = mongoose.model('message', MessageSchema)

// Exporting table for querying and mutating
module.exports = Message
