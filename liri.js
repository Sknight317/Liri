require("dotenv").config();

var request = require('request');

// Using the require keyword lets us access all of the exports
// in our ess.js file
var stuff = require("./key");

// This will print everything in exports.
console.log("--------------------------");
console.log("ALL THE STUFF I NEED");
console.log(stuff);
console.log("--------------------------");

// Variable to require moment.js
var moment = require('moment');



// Takes in all of the command line arguments
var inputString = process.argv;

// Parses the command line argument to capture the option that the user wants
var option = inputString[2];
var songName = inputString.slice(3).join(" ");
var movieName = inputString.slice(3).join(" ");
var ArtistName = inputString.slice(3).join(" ");
// We will then create a switch-case statement (if-else would also work).
// The switch-case will direct which function gets run.
switch (option) {
  case "spotify-this-song":
    spotify();
    break;
  
  case "movie-this":
    movie();
    break;
  
  case "concert-this":
    concert();
    break;
  
  case "do-what-it-says":
    DoWhat();
    break;
  }

function spotify() {
// var songName = inputString.slice(3).join(" ");

    
var Spotify = require('node-spotify-api');
// variable to access Spotify key info
var spotify = new Spotify(stuff.spotify);
console.log(spotify);
    spotify.search({ type: 'track', query: songName, limit: 1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }

       
      console.log("The song's name is: " + JSON.stringify(data.tracks.items[0].name));
      console.log("The song's artist: " + JSON.stringify(data.tracks.items[0].album.artists[0].name));
      console.log("Preview Link: " + JSON.stringify(data.tracks.items[0].preview_url));
      console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name)); 
      });
    
  }

function movie() {
    var option = inputString[2];
    var movieName = inputString.slice(3).join(" ");

    
        // Then run a request to the OMDB API with the movie specified
    request("http://www.omdbapi.com/?" + "t=" + movieName + "=&plot=short&apikey=trilogy", function(error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
  
      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      // console.log(JSON.parse(body));
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
    }
  });
  
    
  }

function concert() {
var option = inputString[2];
var ArtistName = inputString.slice(3).join(" ");
var string1 = "";

 // Then run a request to the OMDB API with the movie specified
 request("https://rest.bandsintown.com/artists/" + ArtistName + "/events?app_id=codingbootcamp", function(error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
  
      // for (var venue in response.body) {
      //  string1 += response.body[venue];
     
      // Parse the body of the site 
      
      
      console.log("Venue Name: " + (JSON.parse(response.body)[1].venue.name));
      console.log("Venue Location: " + (JSON.parse(response.body)[1].venue.city) + ", " + (JSON.parse(response.body)[1].venue.region));
      var datetime = (JSON.parse(response.body)[1].datetime);
      // Sets variable equal to an array, and splits the date and time at the "T"; sends each piece to 2 different variables
      var [date,b] = datetime.split("T");
      // Uses momemnt.js to reformat the date
      var newDate = moment(date).format('dddd, ' + 'MMMM Do YYYY')
      console.log("Date of Event: " + newDate);
      console.log("------------------------------")
      
      // console.log("Venue Name: " + (response.body)[i].venue.name +
      // “\r”;
      // console.log("Venue Location: " + response.body);
      // console.log("Date of Event: " + response.body);
    // }
  }    
});
 
}

function DoWhat() {

// Running the readFile module that's inside of fs.
// Includes the fs package for reading and writing packages
const fs = require('fs-extra');
fs.readFile("random.txt", "utf8", function(err, data) {
  if (err) {
    return console.log(err);
  }
// Break string down by comma separation
// var output = data.split(",");
var [a,b] = data.split(",");
  console.log([a,b]);
// b.split("\"");
// console.log("new b:" + b)
// Loop through new array
// for (var i = 0; i < output.length; i++) {

  // Print each element (item) of the array/
//   console.log(output[i]);
  
// }
if(a === "spotify-this-song") {
console.log("a: " + a);
console.log("b: " +b);
var songName = b;
console.log("Song: " + songName);
console.log("------------------")
spotify();
}
if (a === "movie-this") {
  console.log(a);
  var b = movieName;
  console.log(movieName);
  movie();
}
if (a === "concert-this") {
  console.log(a);
  var b = ArtistName;
  console.log(ArtistName);
  movie();
}

});

}