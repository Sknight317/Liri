# Liri

This is an app I created using node.js called LIRI Bot. The application is able to take in user input through the command line and bring the user back data using several APIs. This app uses Spotify for songs, Bands in Town for concerts, and OMDB for movies.

The liri.js file is the main JavaScript file with the code to make the application run. Within this file, I have created four different functions. Each function returns different data depending on the information the user types in the command line. User informtion is captured using process.argv. I then created a switch-case statement to have each function run when the user types in a certain option.

For instance, when the user types spotify-this-song and the name of a song, the user will be shown information from the Spotify API about the song they have chosen.

When the user types movie-this and the name of a movie, the user will be shown information from the OMDB API about the movie they have chosen.

When the user types concert-this and the name of a singer/artist, the user will be shown information from the Bands in Town API about the artist they have chosen.

When the user types do-what-it-says, the DoWhatit function will be run. This function uses the fs node package to read the text inside of the random.txt file and run the command that is typed.

[![Watch the video](https://img.youtube.com/vi/K92Si8RX3lE/0.jpg)](https://youtu.be/K92Si8RX3lE)
<br>
**Click the picture to watch the video.**