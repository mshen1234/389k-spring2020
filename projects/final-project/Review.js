var mongoose = require('mongoose');
mongoose.Promise = global.Promise

var reviewSchema = new mongoose.Schema({
    rating:{
        type: Number,
        min: 0.0,
        max: 5.0,
        required: true
    },
    comment: {
        type: String
    },
    author: {
        type: String,
        required: true
    }
});

//Let's define a second schema
var bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    pages:{
        type: Number,
        min: 0.0,
        max: 10000000000000000.0,
        required: true
    },
    year:{
        type: Number,
        required: true
    },
    genre:{
        type: String,
        required: true
    },
    reviews:[reviewSchema]
});

var Book = mongoose.model('Book', bookSchema);
var Reviews=mongoose.model('Reviews', reviewSchema);
module.exports = {
  Book, Reviews}
