const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
const Schema = mongoose.Schema;


let Month = new Schema({
    user_name: { type: String, required: true },
    month: { type: String, required: true},
    current_budget: { type: Number, required: true }
})

module.exports = mongoose.model('Month', Month);