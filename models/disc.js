const mongoose = require('mongoose')

const discSchema = new mongoose.Schema({
    name: String,
    speed: Number,
    glide: Number,
    turn: Number,
    fade: Number,
    inTheBag: Boolean,
})
const Disc = mongoose.model('Disc', discSchema);

module.exports = Disc;