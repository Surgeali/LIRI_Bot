require('dotenv').config();
var axios = require("axios");
var { permissions } = require("./keys.js");

require("dotenv").config();

var Spotify = require('node-spotify-api');
var spotify = new Spotify(permissions);
// var Bands = require('node')
// var bands = new bands(permissions);
var fs = require("fs");

fs.readFile("random.txt", "utf8", function (error, data) {
    var dataArr = data.split(",");
    // console.log(dataArr);
});

var searchTerm = process.argv[3];
var command = process.argv[2];

function getMusicInfo() {

    var test = "https://api.spotify.com/v1/artists/albums?album_type=SINGLE&offset=20&limit=10"

    spotify.search({ type: 'track', query: searchTerm, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("++++++++++++++")
        console.log(data.tracks.items[0].album.name);
        console.log(data.tracks.items[0].album.external_urls.spotify);
        console.log("=============")
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].artists[0].name);
    });

}
function getConcertData(search) {
    const url = `https://rest.bandsintown.com/artists/${search}/events?app_id=codingbootcamp`;
    axios.get(url).then(function (response) {

        console.log('-=-=-=START=-=-=-')
        console.log(response.data[0].venue.name);
        console.log(response.data[0].venue.name);
        console.log(response.data[0].datetime);
        console.log('-=-=-=END=-=-=-=-')
    })

}

switch (command) {
    case 'concert-this':
        // run a fucntion that makes a request to the bands in town api
        getConcertData(searchTerm);
        break;
    case 'spotify-this-song':
        // run a fucntion that makes a request to the spotify api
        getMusicInfo(searchTerm);
        break;
    case 'movie-this':
        // run a fucntion that makes a request to the movie DB api
        getMovieInfo(searchTerm);
        break;
}
function getMovieInfo(search) {
    const url = `http://www.omdbapi.com/?t=${search}&apikey=trilogy`;
    axios.get(url).then(function (response) {
        
        console.log('-=-=-=START=-=-=-')
        console.log(response.data.Title);
        console.log(response.data.Year);
        console.log(response.data.Ratings);
        console.log(response.data.Country);
        console.log(response.data.Language);
        console.log(response.data.Plot);
        console.log(response.data.Actors);
        console.log('-=-=-=END=-=-=-=-')
    })
}