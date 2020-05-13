
# PROJECT NAME
Final PROJECT
---

Name: Megan Shen

Date: 5/12/20

Project Topic: Book Reviews

URL: http://localhost:3000/

---


### 1. Data Format and Storage

Data point fields:
- `Field 1`: Book Title     `Type: String`
- `Field 2`: Pages          `Type: Integer`
- `Field 3`: Rating         `Type: Integer`
- `Field 4`: Year           `Type: Integer`
- `Field 5`: Genre          `Type: String`
- `Field 6`: Author         `Type: String`
- `Field 7`: Review         `Type: String`

Schema:
```javascript
reviewSchema {
    "rating":{
        "type": Number,
        min: 0.0,
        max: 5.0,
        required: true
    },
    "comment": {
        type: String
    },
    "author": {
        type: String,
        required: true
    }
}
bookSchema {
    "title":{
        type: String,
        required: true
    },
    "pages":{
        type: Number,
        min: 0.0,
        max: 10000000000000000.0,
        required: true
    },
    "year":{
        type: Number,
        required: true
    },
    "genre":{
        type: String,
        required: true
    },
    "reviews":[reviewSchema]
}

```

### 2. Add New Data

HTML form route: `/create`

POST endpoint route: `/create`

Example Node.js POST request to endpoint:
```javascript
var request = require("request");

var options = {
    method: 'POST',
    url: 'http://localhost:3000/api/create',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    form: {
      "title":"JANE EYRE",
      "pages":290,
      "year":1847,
      "genre":"classic",
      "Reviews":[
      "rating":4,
      "author":"Charlotte",
      "comment":"Jane was ok"
    ]
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/book`

### 4. Search Data

Search Field: title

### 5. Navigation Pages

Navigation Filters
1. About Page -> `/about`
2. Get a random programming book -> `/getRandomBookOfWeek`
3. Get a classic novel -> `/getClassic`
4. Get a science fiction novel -> `/getSciFy`
5. Get a historical novel -> `/getHistorical`
6. Get a random award winning novel -> `/getNewRandomBook`

### 6. Sockets
Sockets are used to both update the list of book reviews without refreshing,
and to display the number of users on the home site

### 7. API
The endpoints are
1) app.get('/', function(req, res) {  ->      which displays the home page
2) app.get("/create", function(req, res) { -> which displays the page
                                              for the user to submit a review

3) app.get("/getRandomBookOfWeek", function(req, res) {  -> 3-8 listed in Navigation
4) app.get("/getNewRandomBook", function(req, res) {
5) app.get("/getClassic", function(req, res) {
6) app.get("/getHistorical", function(req, res) {
7) app.get("/getSciFy", function(req, res) {
8) app.get('/about', function(req, res) {

9) app.get('/book', function(req, res) { -> returns all data points as JSON
10) app.get('/book/:id', function(req, res) { -> gets a book with id in param

11) app.post('/create', function(req, res) {          -> saves the data the user inputted in the create pages
12) app.post('/book', function(req, res) {            -> adds a new book with empty review
13) app.post('/bookreview/:id', function(req, res) {  -> posts a review to an existing book
14) app.delete('/book/:id', function(req, res) {      -> deletes a book with the id in param
15) app.delete('/deleteClassic', function(req, res) { -> deletes a classic genre book

### 8. Modules
The modules
module.exports = {
    getRandomBookOfTheWeek: getRandomBookOfTheWeek,
    getRandomBookEach: getRandomBookEach
}
which I use in my project, is exported in my data-util.js file

### 9. NPM Packages
The 2 packages I used were npm install fullstack-book-of-the-week and npm install booktoread.
I explained in my About page but the first one gives programming books while the
other gives an award winning book.
