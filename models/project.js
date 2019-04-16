'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ProjectSchema = Schema({
    name : String,
    description: String,
    category: String,
    langs: String,
    year: Number,
    image: String
})

module.exports = mongoose.model('Project', ProjectSchema);