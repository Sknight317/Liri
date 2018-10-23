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



var Spotify = require('node-spotify-api');
// variable to access keys info
var spotify = new Spotify(stuff.spotify);
console.log(spotify);
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  });