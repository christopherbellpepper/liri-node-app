require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);

var searchPrompt = process.argv[2];
var artistSearch = process.argv.slice(3).join("");
var movieSearch = process.argv.slice(3).join("+");
var songSearch = process.argv.slice(3).join("+");

// LINK AXIOS TO OMDB API
if (searchPrompt === "movie-this") {
    axios
        .get(`http://www.omdbapi.com/?apikey=b77b8907&t=${movieSearch}`)
        .then(function(movieResponse) {
            console.log("-------------------------------------");
            console.log(`Title: ${movieResponse.data.Title}`);
            console.log(`Year: ${movieResponse.data.Year}`);
            console.log(`IMDb Rating: ${movieResponse.data.Ratings[0].Value}`);
            console.log(`Rotten Tomatoes: ${movieResponse.data.Ratings[1].Value}`);
            console.log(`Country: ${movieResponse.data.Country}`);
            console.log(`Language: ${movieResponse.data.Language}`);
            console.log(`Plot: ${movieResponse.data.Plot}`);
            console.log(`Actors: ${movieResponse.data.Actors}`);
            console.log("-------------------------------------");

            //need code for "Mr. Nobody" returned as a default for not entering a movie name
        })
    };

// LINK AXIOS TO BANDSINTOWN API
if (searchPrompt === "concert-this") {
    axios
        .get(`https://rest.bandsintown.com/artists/${artistSearch}/events?app_id=codingbootcamp`)
        .then(function(bandsResponse) {
            var showResults = bandsResponse.data;
            for (var i = 0; i < showResults.length; i++) {
                var time =  showResults[i].datetime;
                var convertedTime = moment(time).format("L");
                console.log("-------------------------------------");
                console.log(artistSearch);
                console.log(`Venue: ${showResults[i].venue.name}`);
                console.log(`Location: ${showResults[i].venue.city}, ${showResults[i].venue.region}`);
                console.log(`Date: ${convertedTime}`);
                console.log("-------------------------------------");
            }
        })
    };

// LINK TO SPOTIFY API
if (searchPrompt === "spotify-this-song") {
    spotify
        .search({type: "track", query: songSearch})
        .then(function(songResponse) {
            var artistName = songResponse.tracks.items[0].album.artists[0].name;
            var songName = songResponse.tracks.items[0].name;
            var albumName = songResponse.tracks.items[0].album.name;
            var previewThis = songResponse.tracks.items[0].preview_url;
            console.log("------------------------------------");
            console.log(`Artist: ${artistName}`);
            console.log(`Song: ${songName}`);
            console.log(`Album: ${albumName}`);
            console.log(`Preview mp3: ${previewThis}`);
            console.log(` `);
            console.log("------------------------------------");
        })
    };

//      4. `node liri.js do-what-it-says`

//      * Using the `fs` Node package, LIRI will take the text inside of random.txt and then 
//      use it to call one of LIRI's commands.

//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in 
//      `random.txt`.

//      * Edit the text in random.txt to test out the feature for movie-this and concert-this.