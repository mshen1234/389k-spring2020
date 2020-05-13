var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var _ = require("underscore");

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

// $(" .classname #id")


/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */

var marked = require('marked');
/*
var fs = require('fs');
var handlebars = exphbs.handlebars;
var dataUtil = require("./data-util");

var PORT = 8000;
*/
var dataUtil = require("./data-util");

dataUtil.restoreOriginalData();
var _DATA = dataUtil.loadData().blog_posts;


/// MIDDLEWARE
/*
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main', partialsDir: "views/partials/" }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));
*/

app.get('/',function(req,res){

var tags = dataUtil.getAllTags(_DATA);

  res.render('home',{
    data: _DATA,
    tags: tags
  });

})
//View Data
app.get("/api/allBookReviews", function(req, res) {
  var tags=[]
_.each(_DATA, function(i) {
  tags.push(i)
})
  res.json(tags);
});

app.get("/create", function(req, res) {
    res.render('create');
});

app.post('/api/create', function(req, res) {
    var body = req.body;

    // Transform tags and content
    body.tags = body.tags.split(" ");


    body.title=body.title.toUpperCase();
    body.Author=body.Author.toUpperCase();
    body.slug=body.slug.toUpperCase();
    body.rating=parseInt(body.rating);
    body.pages=parseInt(body.pages);

    // Save new blog post
    _DATA.push(req.body);
    dataUtil.saveData(_DATA);
    res.redirect("/");
});

app.get("/api/title/:title", function(req, res) {
    var id = String(req.params.title);
    var result = _.findWhere(_DATA, { title: id })
    if (!result) return res.json({});
    res.json(result);
});

app.get("/post/:slug", function(req, res) {
  var _slug = req.params.slug;
  var blog_post = _.findWhere(_DATA, { slug: _slug });
  if (!blog_post) return res.render('404');
  res.render('post', blog_post);
});


app.get("/getHighestRecentRatedBook", function(req, res) {
//res.json({});
//var t = String(req.params.type);
var highest =0;
var slugg;
_.each(_DATA, function(i) {
  var num=parseInt(i.rating);
  if (num>highest){
    highest=num;
    slugg=i.slug;
  }
})
var blog_post=_.findWhere(_DATA, { slug: slugg });
  res.render('highestRating', blog_post);
});


app.get("/getAllclassics", function(req, res) {
//res.json({});
//var t = String(req.params.type);
//var highest =0;
var arr=[];

_.each(_DATA, function(i) {
  var taggs=i.tags
  //console.log(taggs)
  if (taggs.includes("classic")){
    arr.push(String(i.title));
  }
})
//var blog_post=_.findWhere(_DATA, { slug: slugg });
//console.log(arr)
var html = {apidata: arr};
  //res.render('getAllclassics', arr);
  res.render('getAllclassics', html);
});


app.get("/getAuthorsAlphabetical", function(req, res) {
var arr=[];
_.each(_DATA, function(i) {
  arr.push(i.Author)
})
arr=arr.sort();
var html={apidata: arr};
res.render('getAuthorsAlphabetical', html);
});

app.get("/getTitlesAlphabetical", function(req, res) {
var arr=[];
_.each(_DATA, function(i) {
  arr.push(i.title)
})
arr=arr.sort();
var html={apidata: arr};
res.render('getTitlesAlphabetical', html);
});

app.get("/getLongestBook", function(req, res) {
var highest =0;
var slugg;
_.each(_DATA, function(i) {
  var num=parseInt(i.pages);
  if (num>highest){
    highest=num;
    slugg=i.slug;
  }
})
var blog_post=_.findWhere(_DATA, { slug: slugg });
  res.render('getLongestBook', blog_post);
});

/*
app.get('/tag/:related_words', function(req, res) {
    var tags = dataUtil.getAllTags(_DATA);
    var tag = req.params.tag;
    var posts = [];
    _DATA.forEach(function(post) {
        if (post.tags.includes(tag)) {
            posts.push(post);
        }
    });
    res.render('home', {
        tag: tag,
        data: posts,
        tags: tags
    });
});
*/

app.listen(3000, function() {
    console.log('Listening on port 3000!');
});
