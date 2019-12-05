const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
const Schema = mongoose.Schema;


let Expense = new Schema({
    user_name: { type: String, required: true },
    month: { type: String },
    date: { type: Date },
    description: { type: String },
    value: { type: Number }
})

module.exports = mongoose.model('Expense', Expense);