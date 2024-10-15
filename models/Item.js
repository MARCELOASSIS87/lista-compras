const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  purchased: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Item', itemSchema);
