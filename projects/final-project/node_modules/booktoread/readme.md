## What Is It?
booktoread is a node module that returns an award winning book for you to read.

## How Do I Get It?
Install it with npm:
```bash
npm install booktoread
```
Then require it in your project.
```js
var book = require('booktoread')
```
## The Methods

```js
book.random()
```

This will return a random book.

```js
book.randomDouble()
```

This will return a random book that won multiple awards in one year.

```js
book.all()
```

This will return the array of all books.


## Data Format

The book object is formatted like so:

```js
{
  title: 'Ancillary Justice',
  winner: ['Hugo', 'Nebula'],
  year: '2014',
  author_first: 'Ann',
  author_last: 'Leckie',
  publisher: 'Orbit Books',
  amazonLink: 'http://www.amazon.com/Ancillary-Justice-Imperial-Radch-Leckie/dp/031624662X/ref=sr_1_1?s=books&ie=UTF8&qid=1454441537&sr=1-1&keywords=ancillary+justice'
}
```
Where book.year is the year the book won the awards. Usually this denotes the book was published the year prior.

## Contributions
booktoread is open source. Contribute today at [https://github.com/dlinch/booktoread](https://github.com/dlinch/booktoread)!
