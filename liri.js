//Configuring package to keep API key information private
require("dotenv").config();

//Grabs npm packages & API keys and stores data in variables
var request = require('request');
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var fs = require("fs");

//Accessing command-line arguments
var command = process.argv[2];
var userInput = process.argv[3]

//Enabling access to API keys
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

//Twitter function- This will show your last 20 tweets and when they were created
function getTwitter(){
	var params = {
		user_id: "LeslieLikesCode",
		count: 20
	};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			for (var i = 0; i < tweets.length; i++) {

				console.log(tweets[i].created_at + " You tweeted: " + tweets[i].text);
			}
		}
		if (error) {
			console.log(error);
		}
	});
}

//Spotify function- This will show the artist name, song name, preview link & album name
function getSpotify(){	
	
	var params = {
		type: 'track',
		query: userInput,
		limit: 1
	}

// If no song is provided then your program will default to "The Sign" by Ace of Base
	if (userInput === undefined){
		params.query = "Ace of Base The Sign";
	}

	spotify.search(params, function(error, data) {
		if (error) {
	  		return console.log('Error occurred: ' + err);
		}
	 	var track = data.tracks.items[0]
		console.log("Artist name(s): " + track.artists[0].name); 
		console.log("Song name: " + track.name); 
		console.log("Preview link: " + track.preview_url); 
		console.log("Album name: " + track.album.name); 
	});
}

//OMDB function- This will output them movie title, year, IMDB rating, Rotten Tomatoes rating, country, language, plot & actors
function getOmdb(){

// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
	if (userInput === undefined){
		userInput = "Mr. Nobody"
	}
	var movieName = userInput;
	request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

		if (!error && response.statusCode === 200) {
			console.log("Title: " + JSON.parse(body).Title);
			console.log("Year: " + JSON.parse(body).Year);
			console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
			console.log("Rotten Tomatoes score: " +JSON.parse(body).Ratings[1].Value);
			console.log("Country: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Actors: " + JSON.parse(body).Actors);
		}
	});
}

//Do-What-It-Says function- Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands
if(command === "do-what-it-says") {
	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
			console.log(error);
		}
		var dataArr = data.split(",");

		command = dataArr[0];
		userInput = dataArr[1];

		if(command === "my-tweets") {	
			getTwitter();
		}
		if(command === "spotify-this-song") {
			getSpotify();
		}
		if(command === "movie-this") {
			getOmdb();
        }
        
	});
}
if(command === "my-tweets") {	
	getTwitter();
}
if(command === "spotify-this-song") {
	getSpotify();
}
if(command === "movie-this") {
    getOmdb();
    
}