const mongoose = require('mongoose')
const Schema = mongoose.Schema

const model = new Schema({
    title: {
        type: String,
        required: true
    }, 
    body: {
        type: String,
        required: true
    }
}, {timestamps: true })

const blog = mongoose.model('Blog', model);
module.exports= blog;