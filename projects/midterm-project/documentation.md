
# PROJECT NAME

---

Name: Megan Shen

Date: 4/9/20

Project Topic: Book Reviews

URL: http://localhost:3000/

---


### 1. Data Format and Storage

Data point fields:
- `Field 1`: Book Title     `Type: String`
- `Field 2`: Pages          `Type: Integer`
- `Field 3`: Rating         `Type: Integer`
- `Field 4`: Book Slug      `Type: String`
- `Field 5`: Book Tags      `Type: [String]`
- `Field 6`: Author         `Type: String`
- `Field 7`: Review         `Type: String`

Schema:
```javascript
{
  "title":String,
  "pages":Integer,
  "rating":Integer,
  "slug":String,
  "tags":[String],
  "Author":String,
  "reviews":String
}
```

### 2. Add New Data

HTML form route: `/create`

POST endpoint route: `/api/create`

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
      "title":"THE GREAT GATSBY",
      "pages":218,
      "rating":1,
      "slug":"THE_GREAT_GATSBY",
      "tags":["classic","mysterious"],
      "Author":"SCOTT FITZGERALD",
      "reviews":"this was overhyped"
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/allBookReviews`

### 4. Search Data

Search Field: title

### 5. Navigation Pages

Navigation Filters
1. Most recent highest rated book -> `/getHighestRecentRatedBook`
2. Get all books labeled classic -> `/getAllclassics`
3. Get all authors alphabetically -> `/getAuthorsAlphabetical`
4. Get all the titles alphabetically -> `/getTitlesAlphabetical`
5. Get the longest book -> `/getLongestBook`
