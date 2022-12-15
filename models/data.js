const mongoose = require('mongoose')

const Schema = mongoose.Schema


const schema = new Schema({
   user: String,
   data: String
})

const Data = mongoose.model('Data', schema)

module.exports = {Data , schema}
