const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Record = new Schema({
  key: {
    type: String
  },
  value: {
    type: String
  },
  createdAt: {
    type: mongoose.Schema.Types.Date
  },
  counts: {
    type: [Number]
  }
})

mongoose.model('Record', Record);