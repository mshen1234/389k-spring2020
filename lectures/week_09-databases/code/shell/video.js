var mongoose = require('mongoose');
mongoose.Promise=global.Promise;

//first define schema, this will hold attributes
var reviewSchema=new mongoose.Schema({
  rating: {
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
