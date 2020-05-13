function getRandomBookOfTheWeek(){
    var bookOfTheWeek = require('fullstack-book-of-the-week').default;
    //var bookOfTheWeek2=bookOfTheWeek()();
    bookOfTheWeek=bookOfTheWeek()()
    return bookOfTheWeek;
}
function getRandomBookEach(){
var ranbook = require('booktoread')
ranbook=ranbook.random()
return ranbook;
}

module.exports = {
    getRandomBookOfTheWeek: getRandomBookOfTheWeek,
    getRandomBookEach: getRandomBookEach
}
