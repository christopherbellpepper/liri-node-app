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
            console.log(movieResponse.data.Title);
            console.log(movieResponse.data.Year);
            console.log(movieResponse.data.Ratings[0].Value);
            console.log(movieResponse.data.Ratings[1].Value);
            console.log(movieResponse.data.Country);
            console.log(movieResponse.data.Language);
            console.log(movieResponse.data.Plot);
            console.log(movieResponse.data.Actors);
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