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





// Takes in all of the command line arguments
var inputString = process.argv;

// Parses the command line argument to capture the option that the user wants
var option = inputString[2];
var songName = inputString.slice(3).join(" ");
if(option === "spotify-this-song") {
    
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

    var option = inputString[2];
    var movieName = inputString.slice(3).join(" ");

    if(option === "movie-this") {
        // Then run a request to the OMDB API with the movie specified
    request("http://www.omdbapi.com/?" + "t=" + movieName + "=&plot=short&apikey=trilogy", function(error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
  
      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      console.log(JSON.parse(body));
    }
  });
  
    }