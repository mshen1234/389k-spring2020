// This is a subset of the states.
// Use this to actually run the game
// (assume this is the full set of states.
// This will make it easier to test.
var states = ["Idaho", "South Dakota", "Hawaii", "Alaska", "Alabama", "New York"];
var statesCap2 = ["IDAHO", "SOUTH DAKOTA", "HAWAII", "ALASKA", "ALABAMA", "NEW YORK"];
// These are all the states. It maps the state name to the number which you'll
// want to use in your API call.
var missedMapCap={
  "IDAHO": "114,560",
  "SOUTH DAKOTA": "25,490",
  "HAWAII": "16,215",
  "ALASKA": "22,425",
  "ALABAMA": "151,385",
  "NEW YORK": "2,705,225",
}



var abvMap = {
    "Alabama": "01",
    "Alaska": "02",
    "Arizona": "04",
    "Arkansas": "05",
    "California": "06",
    "Colorado": "08",
    "Connecticut": "09",
    "Delaware": "10",
    "District Of Columbia": "11",
    "Florida": "12",
    "Georgia": "13",
    "Hawaii": "15",
    "Idaho": "16",
    "Illinois": "17",
    "Indiana": "18",
    "Iowa": "19",
    "Kansas": "20",
    "Kentucky": "21",
    "Louisiana": "22",
    "Maine": "23",
    "Maryland": "24",
    "Massachusetts": "25",
    "Michigan": "26",
    "Minnesota": "27",
    "Mississippi": "28",
    "Missouri": "29",
    "Montana": "30",
    "Nebraska": "31",
    "Nevada": "32",
    "New Hampshire": "33",
    "New Jersey": "34",
    "New Mexico": "35",
    "New York": "36",
    "North Carolina": "37",
    "North Dakota": "38",
    "Ohio": "39",
    "Oklahoma": "40",
    "Oregon": "41",
    "Pennsylvania": "42",
    "Rhode Island": "44",
    "South Carolina": "45",
    "South Dakota": "46",
    "Tennessee": "47",
    "Texas": "48",
    "Utah": "49",
    "Vermont": "50",
    "Virginia": "51",
    "Washington": "53",
    "West Virginia": "54",
    "Wisconsin": "55",
    "Wyoming": "56",
};

var cap=["ALABAMA",
  "ALASKA",
  "ARIZONA",
  "ARKANSAS",
  "CALIFORNIA",
  "COLORADO",
  "CONNECTICUT",
  "DELAWARE",
  "FLORIDA",
  "GEORGIA",
  "HAWAII",
  "IDAHO",
  "ILLINOIS",
  "INDIANA",
  "IOWA",
  "KANSAS",
  "KENTUCKY",
  "LOUISIANA",
  "MAINE",
  "MARYLAND",
  "MASSACHUSETTS",
  "MICHIGAN",
  "MINNESOTA",
  "MISSISSIPPI",
  "MISSOURI",
  "MONTANA",
  "NEBRASKA",
  "NEVADA",
  "NEW HAMPSHIRE",
  "NEW JERSEY",
  "NEW MEXICO",
  "NEW YORK",
  "NORTH CAROLINA",
  "NORTH DAKOTA",
  "OHIO",
  "OKLAHOMA",
  "OREGON",
  "PENNSYLVANIA",
  "RHODE ISLAND",
  "SOUTH CAROLINA",
  "SOUTH DAKOTA",
  "TENNESSEE",
  "TEXAS",
  "UTAH",
  "VERMONT",
  "VIRGINIA",
  "WASHINGTON",
  "WEST VIRGINIA",
  "WISCONSIN",
  "WYOMING"
];

var capMap={
  "ALABAMA": "01",
  "ALASKA": "02",
  "ARIZONA": "04",
  "ARKANSAS": "05",
  "CALIFORNIA": "06",
  "COLORADO": "08",
  "CONNECTICUT": "09",
  "DELAWARE": "10",
  "DISTRICT OF COLUMBIA": "11",
  "FLORIDA": "12",
  "GEORGIA": "13",
  "HAWAII": "15",
  "IDAHO": "16",
  "ILLINOIS": "17",
  "INDIANA": "18",
  "IOWA": "19",
  "KANSAS": "20",
  "KENTUCKY": "21",
  "LOUISIANA": "22",
  "MAINE": "23",
  "MARYLAND": "24",
  "MASSACHUSETTS": "25",
  "MICHIGAN": "26",
  "MINNESOTA": "27",
  "MISSISSIPPI": "28",
  "MISSOURI": "29",
  "MONTANA": "30",
  "NEBRASKA": "31",
  "NEVADA": "32",
  "NEW HAMPSHIRE": "33",
  "NEW JERSEY": "34",
  "NEW MEXICO": "35",
  "NEW YORK": "36",
  "NORTH CAROLINA": "37",
  "NORTH DAKOTA": "38",
  "OHIO": "39",
  "OKLAHOMA": "40",
  "OREGON": "41",
  "PENNSYLVANIA": "42",
  "RHODE ISLAND": "44",
  "SOUTH CAROLINA": "45",
  "SOUTH DAKOTA": "46",
  "TENNESSEE": "47",
  "TEXAS": "48",
  "UTAH": "49",
  "VERMONT": "50",
  "VIRGINIA": "51",
  "WASHINGTON": "53",
  "WEST VIRGINIA": "54",
  "WISCONSIN": "55",
  "WYOMING": "56",
};
var alreadyseen =[];

/*
 * The majority of this project is done in JavaScript.
 *
 * 1. Start the timer when the click button is hit. Also, you must worry about
 *    how it will decrement (hint: setInterval).
 * 2. Check the input text with the group of states that has not already been
 *    entered. Note that this should only work if the game is currently in
 * 3. Realize when the user has entered all of the states, and let him/her know
 *    that he/she has won (also must handle the lose scenario). The timer must
 *    be stopped as well.
 *
 * There may be other tasks that must be completed, and everyone's implementation
 * will be different. Make sure you Google! We urge you to post in Piazza if
 * you are stuck.
 */
 var written=0;
 var left=50;
 var forgot=[];
 var secc;
 var x22;
 var writ2=0;

function myFunction() {
  var sec;
  var x = document.getElementById("fname").value;
   var x2 =x.toUpperCase();
   //check if not guessed make a div, jquery append

 if (cap.includes(x2) && !alreadyseen.includes(x2)){
   alreadyseen.push(x2);
   written+=1;
   left-=1;
   if (statesCap2.includes(x2)){
     writ2+=1;
   }

$( ".container" ).append( "<p id="+x2+">"+ x2 +"</p>" );
var first1;
var number=capMap[x2];

   $.get("https://api.census.gov/data/2013/language?get=EST,LANLABEL,NAME&for=state:"+ number +"&LAN=625",function(json){
     var first=json[1];
     sec=first[0];
     sec=numberWithCommas(sec);

     $("p").hover(
       function() {
         $(this).append($( "<b> "+sec+ "</b>"));
         this.substring(sec.length);
       }, function() {
        $(this).find( "b" ).last().remove();
       }
     );

   });
}

 //display the correct state, add to total, decr, put in new array of states found,
//use div container, jquery append to display list of state names

 }

 function numberWithCommas(x) {
     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
 }
