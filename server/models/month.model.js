const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
const Schema = mongoose.Schema;


let Month = new Schema({
    user_name: { type: String, required: true },
    month: { type: String, unique: true },
    current_budget: { type: Number }
})

module.exports = mongoose.model('Month', Month);