require("dotenv").config();

// Using the require keyword lets us access all of the exports
// in our ess.js file
var stuff = require("./key");

// This will print everything in exports.
console.log("--------------------------");
console.log("ALL THE STUFF I NEED");
console.log(stuff);
console.log("--------------------------");

// variable to access keys info
var spotify = new Spotify(keys.spotify);