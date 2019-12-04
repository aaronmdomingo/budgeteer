const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
const Schema = mongoose.Schema;


let Expense = new Schema({
    user_name: { type: String, required: true, unique: true },
    month: { type: String },
    date: { type: Date },
    value: { type: Number }
})

module.exports = mongoose.model('Expense', Expense);