# liri-node-app

LIRI is a command line node app that takes in parameters and gives you back data.

Commands:

node liri.js my-tweets: this will show your last 20 tweets and when they were created at in your terminal/bash window.

node liri.js spotify-this-song '<song name here>': This will show the following information about the song in your terminal/bash window: artist(s), the song's name, a preview link of the song from Spotify, the album that the song is from.
  
node liri.js movie-this '<movie name here>' : this will output the following information to your terminal/bash window: title, year, IMDB rating, Rotten Tomatoes Rating, country where the movie was produced, language of the movie, plot of the movie & actors in the movie
  
node liri.js do-what-it-says : using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

