// Create a variable to require dotenv
require("dotenv").config();
// Create a variable to require request
var request = require('request');

// Using the require keyword lets us access all of the exports
// to require key.js
var stuff = require("./key");

// This will print everything in exports.
// console.log("--------------------------");
// console.log("ALL THE STUFF I NEED");
// console.log(stuff);
// console.log("--------------------------");

// Variable to require moment.js
var moment = require('moment');



// Takes in all of the command line arguments
var inputString = process.argv;

// Variable to capture the option that the user wants
var option = inputString[2];
// Variables for song, movie, and artists
var songName = inputString.slice(3).join(" ");
var movieName = inputString.slice(3).join(" ");
var ArtistName = inputString.slice(3).join(" ");

//switch-case statement 
switch (option) {
  case "spotify-this-song":
    spotify(songName);
    break;
  
  case "movie-this":
    movie(movieName);
    break;
  
  case "concert-this":
    concert(ArtistName);
    break;
  
  case "do-what-it-says":
    DoWhatit();
    break;
  }

// Spotify function
function spotify(songName) {
// var songName = inputString.slice(3).join(" ");
// Varible to require spotify api  
var Spotify = require('node-spotify-api');
// variable to access Spotify key info
var spotify = new Spotify(stuff.spotify);
console.log(spotify);

    spotify.search({ type: 'track', query: songName, limit: 1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }

      // Gets prited to console 
      console.log("The song's name is: " + JSON.stringify(data.tracks.items[0].name));
      console.log("The song's artist: " + JSON.stringify(data.tracks.items[0].album.artists[0].name));
      console.log("Preview Link: " + JSON.stringify(data.tracks.items[0].preview_url));
      console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name)); 
      });
     
  }

// Movie function
function movie(movieName) {
    // var option = inputString[2];
    // var movieName = inputString.slice(3).join(" ");

    
        // request to the OMDB API with the movie specified
    request("http://www.omdbapi.com/?" + "t=" + movieName + "=&plot=short&apikey=trilogy", function(error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
  
      // Gets logged to the console
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

  // Concert function
function concert(ArtistName) {
// var option = inputString[2];
// var ArtistName = inputString.slice(3).join(" ");
// var string1 = "";

 // request to the Bands in town API 
 request("https://rest.bandsintown.com/artists/" + ArtistName + "/events?app_id=codingbootcamp", function(error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
  
      // for (var venue in response.body) {
      //  string1 += response.body[venue];
     
      // Gets logged to the console
      console.log("Venue Name: " + (JSON.parse(response.body)[1].venue.name));
      console.log("Venue Location: " + (JSON.parse(response.body)[1].venue.city) + ", " + (JSON.parse(response.body)[1].venue.region));
      // Created a varibale for the date and time found in the response.body
      var datetime = (JSON.parse(response.body)[1].datetime);
      // Splits the date and time at the "T"; sends each piece to 2 different variables(array)
      var [date,b] = datetime.split("T");
      // Uses momemnt.js to reformat the date
      var newDate = moment(date).format('dddd, ' + 'MMMM Do YYYY');
      // Logs the new date to the console
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

// Function to read random.txt file and do what the file says
function DoWhatit() {

// Running the readFile module that's inside of fs.
// Includes the fs package for reading and writing packages; used fs extra package
const fs = require('fs-extra');
fs.readFile("random.txt", "utf8", function(err, data) {
  if (err) {
    return console.log(err);
  }
// Break string down by comma separation
// Splits the data at the comma, and sends each piece to two separate vairables; the variables a and b (in the array)
var [a,b] = data.split(",");
// Logs a and b. 
// a is what should be done; and b is the movie, artist, or song.
  console.log([a,b]);

// Switch case statement
switch (a) {
// If the case is Spotify.. then run the spotify function with the new variable inside
case "spotify-this-song":
console.log("------------------")
spotify(b);
break;

// If the case is movie.. then run the movie function with the new variable inside
case "movie-this":
console.log("------------------");
movie(b);
break;

// If the case is concert.. then run the concert function with the new variable inside
case "concert-this":
console.log("------------------");
concert(b);
break;
}
});

}