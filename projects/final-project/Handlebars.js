var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise=global.Promise;
var dotenv = require('dotenv');
var Book1 = require('./Review');
var Book=Book1.Book;
var Reviews=Book1.Reviews;
var _ = require("underscore");
var booksReviewed=0;
var usersOn=0;

const toJsonSchema = require('to-json-schema');

var data;

// Setup Express App
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http); //changed

var dataUtil = require("./data-util");
var connectCounter=0;

// Load envirorment variables
dotenv.config();
mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error', function() {
   console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.get('/', function(req, res) {
  //render main2.handlebars
    Book.find({}).lean().exec(function(err, book) {
      if (err) throw err;
      //io.emit('rendering book', book);
      //book.reviews=toJsonSchema(book.reviews);
      //book.reviews=JSON.parse(book.reviews)
      //console.log("here are the reviews")
      //console.log(Reviews);
      //console.log(book.reviews)
      //console.log(JSON.stringify(book.reviews));
      res.render('book', {book:book});
    });
    //res.render('book', { book:data });
});

app.get("/create", function(req, res) {
    res.render('create');
});

app.post('/create', function(req, res) {
  //var t=String(req.params.title).toUpperCase();
  //console.log(t);
  /*
  Book.findOne({ title: t},function(err,book){
        if (err) throw err;
        return;
        if (book){
          book.reviews.push({
              rating: parseInt(req.body.rating),
              comment: req.body.comment,
              author: req.body.author,
          });
          book.save(function(err) {
              if (err) throw err;
              res.send('Sucessfully added book.');
              return res.redirect("/");
          });
        }else {
        */
          var upper=(req.body.title).toUpperCase();
          var book11 = new Book({
              //title: req.body.title,
              title: upper,
              pages: parseInt(req.body.pages),
              genre: req.body.genre,
              year: parseInt(req.body.year),
              reviews: []
          });

          var review11=new Reviews({
            rating: parseFloat(req.body.rating),
            comment: req.body.comment,
            author: req.body.author
          });

        book11.reviews.push(
          {
            rating: parseFloat(req.body.rating),
            comment: req.body.comment,
            author: req.body.author,
          }
        );
      //}

         //Saving the updated book
         review11.save(function(err){
           if (err) throw err;
         });
        book11.save(function(err) {
            if (err) throw err;
            io.emit('new book', book11); //change
            //res.send('Sucessfully added book.');
            return res.redirect("/");
        });
});
//});

app.get("/getRandomBookOfWeek", function(req, res) {
var bookOfTheWeek=dataUtil.getRandomBookOfTheWeek();
var tags=[]
tags=tags.push(bookOfTheWeek);
res.render('getRandomBook', bookOfTheWeek);
});

app.get("/getNewRandomBook", function(req, res) {
  var tags=[]
  var ranbook=dataUtil.getRandomBookEach();
  res.render('getNewRandomBook',ranbook);
});

app.get("/getClassic", function(req, res) {
  Book.findOne({ genre: 'classic' }).exec(function (err, book){
    res.render('classic',book);
  });
});

app.get("/getHistorical", function(req, res) {
  Book.findOne({ genre: 'historical' }).exec(function (err, book){
    res.render('historical',book);
  });
});

app.get("/getSciFy", function(req, res) {
  Book.findOne({ genre: 'science fiction' }).exec(function (err, book){
    res.render('scify',book);
  });
});

app.get('/book', function(req, res) {
    Book.find({}, function(err, book) {
        res.send(book)
    });
});


app.get('/book/:id', function(req, res) {
    Book.findById(req.params.id, function(err, book) {
        if (err) throw err;
        if(!book){return res.send('No movie with that id');}
        res.send(book);
    });
});

app.get('/about', function(req, res) {
    res.render('about');
});


app.post('/book', function(req, res) {
    // Create new book
    console.log("posting book");
    var t=String(req.body.title).toUpperCase();
    var book = new Book({
        title: t,
        pages: parseInt(req.body.pages),
        genre: req.body.genre,
        year: parseInt(req.body.year),
        reviews: []
    });
    // Save book to database
    booksReviewed+=1;
    book.save(function(err) {
        if (err) throw err;
        io.emit('new book', book); //CHANGE
        io.emit('changed',booksReviewed);
        return res.send('Succesfully inserted book.');
    });
});

app.post('/bookreview/:id', function(req, res) {
    // Add a review
    //Find the given book
    Book.findOne({ _id: req.params.id },function(err,book){
        if (err) throw err;
        if (!book) return res.send('No book found with that ID.');
        //Creating the review schema
        book.reviews.push({
            rating: parseFloat(req.body.rating),
            comment: req.body.comment,
            author: req.body.author,
        });
         //Saving the updated book
        book.save(function(err) {
            if (err) throw err;
            res.send('Sucessfully added review.');
        });
    });
});

app.delete('/book/:id', function(req, res) {

    Book.findByIdAndRemove(req.params.id, function(err, book) {
        if (err) throw err;
        if(!book){return res.send('No book with that id');}
        booksReviewed-=1;
        io.emit('changed',booksReviewed);
        res.send('book deleted!');
    });
});
/*
app.delete('/review/:reviewid', function(req, res){
Reviews.findByIdAndRemove(req.params.reviewid, function(err, book) {
    if (err) throw err;
    if(!book){return res.send('No review with that id');}
    res.send('review deleted!');
  });
});
*/
app.delete('/deleteClassic', function(req, res) {
Book.deleteOne({ genre: 'classic' }, function (err,book) {
  if (err) return handleError(err);
  if (book){
    booksReviewed-=1;
    io.emit('changed',booksReviewed);
  }
  res.send('a classic, if listed, was deleted');
  // deleted at most one tank document
});
});

//changed

io.on('connection', function(socket) {
    console.log('NEW connection');
    var s=String(socket.client.conn.server.clientsCount);
    //document.getElementById("myHeader2").innerHTML = s;

io.emit('userLog',s);
    /*
        - Handle listening for "messages" socket.on(message, function(msg)){...}
        - Sending out messages to ALL clients currently connected io.emit(message, contentOfMessage)
    */
   //Task 1 - Step 1: Listen for a new chat message

/*
    socket.on('Connection', function(msg) {
        //Task 2 - Step 2: Emit new chat message to all clients currently connected
        io.emit('chat message', msg);
    })
  */

    socket.on('disconnect', function() {
        console.log('User has disconnected');
        var s=String(socket.client.conn.server.clientsCount);
        io.emit('userLog',s);
    });


    socket.on('new book', function(mov) {
        $('#bokList').append($('<article><li class=title>').text(mov.title + ': ' + mov.genre +': '+ mov.pages
+' pages: published'+ mov.year +': Review'+ mov.reviews));
    })

    socket.on('userLog', function(mov) {
      $('#myHeader2').text(mov)
    })

    socket.on('changed',function(num){
      console.log("here is num")
      console.log(num);
      $('#myHeader2').append($('<li>').text(num));
    });

});


http.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
