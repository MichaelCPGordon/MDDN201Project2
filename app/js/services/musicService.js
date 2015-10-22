angular.module('services.music', [])

    .factory('MusicService', function(Spotify, $q, $rootScope){

        String.prototype.capitalize = function() {
            return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
        };

        var artistIds = [];

        var albumIds = [
            '5UXaJ1GCotZyz6b8ucOJD1', '0y3ai6LH83qeeeCbmpaIvf', '6B6cN1gyobgdGESQ1RSjix', '5DxzzkiFrE2jBEzunU586c',
            '0AddFW17f8gMJw7odPN3xI', '05ghFLMEOZqBJdS76hws7F', '4GmQxktbk1GJxpRqSUe26q', '2UAin9VEGxiZRfe9Q7SKg4',
            '0yU7VItpGPmPcvKmwLg0JT', '3tF21h9x3rP8G8C3S7hv3S', '0h9q3anebuWlFwVmdF5ovV', '37d7HPWhUBzGdl634IHP1d',
            '5a7xlzy9LsS4EwKeOIojMX', '1vAEF8F0HoRFGiYOEeJXHW', '3da6Ihr5l6xjOCDs5sTXIu', '3DYh52KdBhnAa4CZoj4gqN',
            '3XshNzZ4orKbbcWy6zZkw3', '2hhNhFoNM6hUuleHFo8J3r', '4jvurVXLanQyP1rPZjbSln', '712VoD72K500yLhhgqCyVe',
            '6S0BIiWtnqU0PtumXMpin0', '0qOxct18eieG99TAQpXave', '4Dgxy95K9BWkDUvQPTaYBb', '3QnYf7kUzcDU5KHDyWtrzT',
            '2kyV77AOyn3XE6LTunaBB3', '6645HGh7ZOZSUTpqW9iYLR', '6DNFWg1L5WxZpyaswP6RUr', '2xLIKeb9lWqwm2HJyMytph',
            '5pecT5tdDfOXelpWIOurLP', '56aOAKw8w6xDzANjNhWasX', '6TfHQ3oiADUtrfC7QKGvXK', '7oUEl0OeVxhB6DLotP0DOp',
            '7FN84qbcwrTOAP746LEDGb', '3pVCnqg7COWlaodlNiJIZL', '7mEkBi9a2p2f1WQbnH8Qk5', '7AVYZBCf9w7L49zSnM9b3b',
            '7lObP1GanG65wToWzufQtq', '22bdIdviOSWmmYEhQxZ7jw', '3PogVmhNucYNfyywZvTd7F', '04r9yvH25PwePggAYZQYq8',
            '4uT9DV66lXaM1CMX4HHaSe', '0GTXG38aWGk3x23jKJjFnI', '4ZJNYovzuTG6cQufw6Oh4i', '5LJ2C18clb6lEfjb5spx54',
            '1lqdOJ9M0EnXx9cf5moz1B', '614UaPeReIQiqIVZhtYID5', '2yzeTza4DXX5XpzJYY7CXO', '6nTSYgih82tTwdWvmbtPHW',
            '0e0iTUkry67YVZYQTdKE6c', '5OD4H7aBoUxY83FeYXFrnX', '5HQs8vyZHMHPuwswAbqpbQ', '69t7oSLMhs96r34dvKJ87o',
            '5F3y6k0aX133aBzgKnG5uq', '1lhoN3qbSRxfSEm6I2t8cK', '1223HNo18fRbvEKxMgiSa7', '1PadLnQYelMqqSlPbSEWZ1',
            '1BQVdofe7ROnSoaiC9418p', '1crPKeUC7ea8UN75kkMDWv', '7988TZgR0U8ATWjiBluZ7Z', '4XeudemanAeaNBBWIukwhK',
            '7khFXQNBzcfSfgGjPKerdE'
        ];

        //// { name: "", id: "", albums: [], genres: [], imgSmall: { url: "", height: "", width: "" }, imgLarge: { url: "", height: "", width: "" } }
        var allArtists = [];

        // { name: "", id: "", tracks: [], artist: "", releaseDate: "", img: { url: "", height: "", width: "" } }
        var allAlbums = [];

        // { name: "", id: "", album: "", duration: "" }
        var allTracks = [];

        // { name: "", artists: [] }
        var allGenres = [];


        var generateAlbumsFromIds = function(){
            var separatedAlbumIds = [];
            var currentString = "";
            for (var i = 0; i < albumIds.length; i++){
                if ((i % 10 === 0 && i != 0) || i === albumIds.length - 1){
                    currentString += albumIds[i];
                    separatedAlbumIds.push(angular.copy(currentString));
                    currentString = "";
                }
                else {
                    currentString += albumIds[i] + ",";
                }
            }

            var promises = [];
            for (var i = 0; i < separatedAlbumIds.length; i++){
                promises.push(
                    Spotify.getAlbums(separatedAlbumIds[i]).then(function(data){
                        for (var i = 0; i < data.albums.length; i++){
                            allAlbums.push({
                                name: data.albums[i].name,
                                id: data.albums[i].id,
                                genres: [],
                                releaseDate: new Date(data.albums[i].release_date),
                                img: {
                                    url: data.albums[i].images[1].url,
                                    height: data.albums[i].images[1].height,
                                    width: data.albums[i].images[1].width
                                },
                                imgSmall: {
                                    url: data.albums[i].images[2].url,
                                    height: data.albums[i].images[2].height,
                                    width: data.albums[i].images[2].width
                                },
                                artistId: data.albums[i].artists[0].id,
                                tracks: []
                            });
                            generateTracksForAlbum(allAlbums[allAlbums.length - 1]);
                            if (idNotAddedToArtistIds(data.albums[i].artists[0].id)){
                                artistIds.push(data.albums[i].artists[0].id);
                            }
                        }
                    })
                );
            }
            $q.all(promises).then(function(){
                generateArtists();
            });
        };

        var generateTracksForAlbum = function(album){
            Spotify.getAlbumTracks(album.id).then(function (data) {
                for (var i = 0; i < data.items.length; i++){
                    allTracks.push({
                        id: data.items[i].id,
                        name: data.items[i].name,
                        album: album,
                        duration: parseInt((data.items[i].duration_ms / 1000).toFixed(0)),
                        durationString: convertMsToHrsMinsString(data.items[i].duration_ms),
                        trackNo: i
                    });
                    album.tracks.push(allTracks[allTracks.length-1]);
                }
            });
        };

        var generateArtists = function(){
            Spotify.getArtists(artistIds).then(function (data) {
                for (var i = 0; i < data.artists.length; i++){
                    allArtists.push({
                        name: data.artists[i].name,
                        id: data.artists[i].id,
                        img: {
                            url: data.artists[i].images[1].url,
                            height: data.artists[i].images[1].height,
                            width: data.artists[i].images[1].width
                        },
                        imgLarge: {
                            url: data.artists[i].images[0].url,
                            height: data.artists[i].images[0].height,
                            width: data.artists[i].images[0].width
                        },
                        albums: [],
                        genres: []
                    });
                    if (data.artists[i].genres.length > 0){
                        setupGenresForArtist(allArtists[i], data.artists[i].genres);
                    }
                }
                for (var i = 0; i < allArtists.length; i++){
                    setupReferencesForArtistAlbums(allArtists[i]);
                }
                $rootScope.$broadcast("MusicDataLoaded");
            });
        };

        var idNotAddedToArtistIds = function(artistId){
            for (var i = 0; i < artistIds.length; i++){
                if (artistIds[i] === artistId){
                    return false;
                }
            }
            return true;
        };

        var setupGenresForArtist = function(artist, genres){
            for (var i = 0; i < genres.length; i++){
                genres[i] = genres[i].capitalize();
                if (allGenres.indexOf(genres[i]) === -1){
                    allGenres.push({
                        name: genres[i], artists: []
                    });
                }
                allGenres[allGenres.length - 1].artists.push(artist);
                artist.genres.push(genres[i]);
            }
        };

        var setupReferencesForArtistAlbums = function(artist){
            for (var i = 0; i < allAlbums.length; i++){
                if (allAlbums[i].artistId === artist.id){
                    artist.albums.push(allAlbums[i]);
                    allAlbums[i].artist = artist;
                }
            }
        };

        var convertMsToHrsMinsString = function(ms){
            var totalSec = parseInt((ms / 1000).toFixed(0));
            var hours = parseInt(totalSec / 60);
            var sec = totalSec - (hours * 60);
            if (hours < 10){ hours = "0" + hours; }
            if (sec < 10){ sec = "0" + sec; }
            return hours + ":" + sec;
        };

        generateAlbumsFromIds();

        var serviceFunctions = {

            getAllArtists: function(){
                return allArtists;
            },

            getAllAlbums: function(){
                return allAlbums;
            },

            getAllTracks: function(){
                return allTracks;
            },

            getAllGenres: function(){
                return allGenres;
            }

        };

        return serviceFunctions;


    });