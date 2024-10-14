const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {type:String, required: true},
    description: {type:String, required: true},
    status: {type: String},
    date: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('task', taskSchema);