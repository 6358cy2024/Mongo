const mongoose = require('mongoose');

mongoose.connection('mongodb://127.0.0.1:27017/transformer_db');

module.exports = mongoose.connection;