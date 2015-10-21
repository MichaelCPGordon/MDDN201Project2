angular.module('services.music', [])

    .factory('MusicService', function(Spotify, $q, $rootScope){

        String.prototype.capitalize = function() {
            return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
        };

        //var genres = [
        //    { name: "Rock" }, { name: "Metal" }, { name: "Acoustic" },
        //    { name: "Electronic" }, { name: "Pop" }, { name: "Hip Hop" }
        //];

        //var artistsOld = [
        //    { name: "Pink Floyd", img: "pinkFloyd", genre: genres[0], albums: [
        //        { name: "Meddle", artist: "Pink Floyd", img: "meddle", songs: [
        //            "One Of These Days", "A Pillow Of Winds",
        //            "Fearless", "San Tropez", "Seamus", "Echoes"
        //        ]},
        //        { name: "Animals", artist: "Pink Floyd", img: "animals", songs: [
        //            "Pigs On The Wing (Part 1)", "Dogs", "Pigs",
        //            "Sheep", "Pigs On The Wing (Part 2)"
        //        ]}
        //    ]},
        //    { name: "A Perfect Circle", img: "aPerfectCircle", genre: genres[1], albums: [
        //        { name: "Thirteenth Step", artist: "A Perfect Circle", img: "thirteenthStep", songs: [
        //            "The Package", "Weak And Powerless", "The Noose", "Blue", "Vanishing",
        //            "A Stranger", "The Outsider", "Crimes", "The Nurse Who Loved Me",
        //            "Pet", "Lullaby", "Gravity"
        //        ]},
        //        { name: "Mer De Noms", artist: "A Perfect Circle", img: "merDeNoms", songs: [
        //            "The Hollow", "Magdalena", "Rose", "Judith", "Orestas", "3 Libras",
        //            "Sleeping Beauty", "Thomas", "Renholder", "Thinking Of You",
        //            "Brena", "Over"
        //        ]}
        //    ]},
        //    { name: "Bonobo", img: "bonobo", genre: genres[3], albums: [
        //        { name: "Eyesdown", artist: "Bonobo", img: "eyesdown", songs: [
        //            "Eyesdown", "Eyesdown (Floating Ponits Remix)", "Eyesdown (Warrior 1 Remix)",
        //            "Eyesdown (Appleblim Remix)", "Eyesdown (Instrumental)"
        //        ]},
        //        { name: "The North Borders", artist: "Bonobo", img: "theNorthBorders", songs: [
        //            "First Fires", "Emkay", "Cirrus", "Heaven For The Sinner", "Sapphire",
        //            "Jets", "Towers", "Don't Wait", "Know You", "Antenna", "Ten Tigers",
        //            "Transits", "Pieces"
        //        ]}
        //    ]},
        //    { name: "Eminem", img: "eminem", genre: genres[5], albums: [
        //        { name: "The Eminem Show", artist: "Eminem", img: "theEminemShow", songs: [
        //            "Curtains Up", "White America", "Business", "Cleanin' Out My Closet",
        //            "Square Dance", "The Kiss", "Soldier", "Say Goodbye Hollywood"
        //        ]},
        //        { name: "Shady XV", artist: "Eminem", img: "shadyxv", songs: [
        //            "SHADYXV", "Psychopath Killer", "Die Alone", "Vegas", "Y'all Ready Know",
        //            "Guts Oevr Fear", "Down", "Bane", "Fine Line", "Twisted"
        //        ]}
        //    ]},
        //    { name: "Little Dragon", img: "littleDragon", genre: genres[4], albums: [
        //        { name: "Sunshine", artist: "Little Dragon", img: "sunshine", songs: [
        //            "Sunshine"
        //        ]},
        //        { name: "Blinking Pigs", artist: "Little Dragon", img: "blinkingPigs", songs: [
        //            "Blinking Pigs", "Runabout", "Never Never", "Fortune", "Feather"
        //        ]}
        //    ]},
        //    { name: "Mastodon", img: "mastodon", genre: genres[1], albums: [
        //        { name: "Once More 'Round The Sun", artist: "Mastodon", img: "onceMoreRoundTheSun", songs: [
        //            "Tread Lightly", "Motherload", "High Road", "Once More 'Round the Sun",
        //            "Chimes At Midnight", "Asleep In The Deep", "Feast Your Eyes"
        //        ]},
        //        { name: "Blood Mountain", artist: "Mastodon", img: "bloodMountain", songs: [
        //            "The Wolf Is Loose", "Crystal Skull", "Sleeping Giant", "Capillarian Crest",
        //            "Circle Of Cystquatch","Bladecatcher", "Colony Of Birchmen"
        //        ]}
        //    ]},
        //    { name: "System Of A Down", img: "systemOfADown", genre: genres[1], albums: [
        //        { name: "Hypnotize", artist: "System Of A Down", img: "hypnotize", songs: [
        //            "Attack", "Dreaming", "Kill Rock 'n Roll", "Hypnotize", "Stealing Society",
        //            "Tentative", "U-Fig", "Holy Mountains", "Vicinity Of Obscenity"
        //        ]},
        //        { name: "Mezmerize", artist: "System Of A Down", img: "mezmerize", songs: [
        //            "Soldier Side", "B.Y.O.B", "Revenga", "Cigaro", "Radio", "Question!",
        //            "Sad Statue", "Old School Hollywood"
        //        ]}
        //    ]},
        //    { name: "Tool", img: "tool", genre: genres[1], albums: [
        //        { name: "10,000 Days", artist: "Tool", img: "10000days", songs: [
        //            "Vicarious", "Jambi", "Wings For Marie", "10,000 Days",
        //            "The Pot", "Lipan Conjuring", "Lost Keys", "Rosetta Stoned"
        //        ]},
        //        { name: "Salival", artist: "Tool", img: "salival", songs: [
        //            "Third Eye", "Part Of Me", "Pushit", "Message To Harry Manback II",
        //            "You Lied", "Merkaba", "No Quater", "LAMC"
        //        ]}
        //    ]}
        //];







        //var artistIds = [
        //    "0cmWgDlu9CwTgxPhf403hb",
        //    "4DFhHyjvGYa9wxdHUjtDkc",
        //    "0k17h0D3J5VfsdmQ1iZtE9",
        //    "53XhwfbYqKCa1cC15pYq2q",
        //    "3GBPw9NK25X1Wt2OUvOwY3",
        //    "0hEurMDQu99nJRq8pTxO14",
        //    "7cNHQN4eCc7nud8htPxHBy",
        //    "7Ln80lUS6He07XvHI8qqHH",
        //    "57ylwQTnFnIhJh4nu4rxCs",
        //    "1Dvfqq39HxvCJ3GvfeIFuT",
        //    "7dGJo4pcD2V6oG8kP0tJRR",
        //    "3PhoLpVuITZKcymswpck5b",
        //    "2aaLAng2L2aWD2FClzwiep",
        //    "0fDF0jjmdouCIeWhNnblwV",
        //    "63MQldklfxkjYDoUE4Tppz",
        //    "6Tyzp9KzpiZ04DABQoedps",
        //    "6rX8AFY10dsJkJsv23Z9Um"
        //];

        var artistIds = [];

        var albumIds = [
            '5UXaJ1GCotZyz6b8ucOJD1', '0y3ai6LH83qeeeCbmpaIvf', '6B6cN1gyobgdGESQ1RSjix', '5DxzzkiFrE2jBEzunU586c', '3DYh52KdBhnAa4CZoj4gqN',
            '0AddFW17f8gMJw7odPN3xI', '05ghFLMEOZqBJdS76hws7F', '4GmQxktbk1GJxpRqSUe26q', '2UAin9VEGxiZRfe9Q7SKg4', '3QnYf7kUzcDU5KHDyWtrzT',
            '0yU7VItpGPmPcvKmwLg0JT', '3tF21h9x3rP8G8C3S7hv3S', '0h9q3anebuWlFwVmdF5ovV', '37d7HPWhUBzGdl634IHP1d',
            '5a7xlzy9LsS4EwKeOIojMX', '2XjPrtaAqvviEgSHCpzHmM', '1vAEF8F0HoRFGiYOEeJXHW', '3da6Ihr5l6xjOCDs5sTXIu',
            '3XshNzZ4orKbbcWy6zZkw3', '2hhNhFoNM6hUuleHFo8J3r', '4jvurVXLanQyP1rPZjbSln', '712VoD72K500yLhhgqCyVe',
            '6S0BIiWtnqU0PtumXMpin0', '0qOxct18eieG99TAQpXave', '4Dgxy95K9BWkDUvQPTaYBb',
            '2kyV77AOyn3XE6LTunaBB3', '6645HGh7ZOZSUTpqW9iYLR', '6DNFWg1L5WxZpyaswP6RUr', '2xLIKeb9lWqwm2HJyMytph', '5LJ2C18clb6lEfjb5spx54',
            '5pecT5tdDfOXelpWIOurLP', '56aOAKw8w6xDzANjNhWasX', '6TfHQ3oiADUtrfC7QKGvXK', '7oUEl0OeVxhB6DLotP0DOp', '69t7oSLMhs96r34dvKJ87o',
            '7FN84qbcwrTOAP746LEDGb', '3pVCnqg7COWlaodlNiJIZL', '7mEkBi9a2p2f1WQbnH8Qk5', '7AVYZBCf9w7L49zSnM9b3b', '1PadLnQYelMqqSlPbSEWZ1',
            '7lObP1GanG65wToWzufQtq', '22bdIdviOSWmmYEhQxZ7jw', '3PogVmhNucYNfyywZvTd7F', '04r9yvH25PwePggAYZQYq8',
            '4uT9DV66lXaM1CMX4HHaSe', '0GTXG38aWGk3x23jKJjFnI', '4ZJNYovzuTG6cQufw6Oh4i',
            '1lqdOJ9M0EnXx9cf5moz1B', '3IvnUvO0UmpAEW0hXtmtq1', '614UaPeReIQiqIVZhtYID5', '2yzeTza4DXX5XpzJYY7CXO', '6nTSYgih82tTwdWvmbtPHW',
            '7khFXQNBzcfSfgGjPKerdE', '2f50Cyc4BQZe9sW5BF2neK', '2wQC6x9xxiToCcRTDY14hl', '0iOpSeMepKetd0lAx87YNM', '7a78cANYHuY8pOesrvUyvY',
            '7qSjHZKOhnMYdqMQMvvlmG', '0e0iTUkry67YVZYQTdKE6c', '5OD4H7aBoUxY83FeYXFrnX', '5HQs8vyZHMHPuwswAbqpbQ',
            '5F3y6k0aX133aBzgKnG5uq', '1lhoN3qbSRxfSEm6I2t8cK', '2jQAsfSLQUDO0JEljDOppO', '1223HNo18fRbvEKxMgiSa7',
            '1BQVdofe7ROnSoaiC9418p', '1crPKeUC7ea8UN75kkMDWv', '7988TZgR0U8ATWjiBluZ7Z', '4XeudemanAeaNBBWIukwhK'
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






        //var queue = [];

        //var generateQueue = function(songs){
        //    queue.push(songs);
        //};

        var playlists = [];

        //var createPlaylist = function(playlistName, albums){
        //    var newPlaylist = {
        //        albums: [],
        //        coverArt: [],
        //        name: playlistName
        //    };
        //    for (var i = 0; i < albums.length; i++){
        //        if (i < 4){
        //            newPlaylist.coverArt.push(albums[i].img);
        //        }
        //        newPlaylist.albums.push(albums[i]);
        //    }
        //    playlists.push(newPlaylist);
        //};

        //var generateSongLengths = function(){
        //    var generate = function(){
        //        var full = (Math.floor(Math.random() * 720) + 60);
        //        var seconds = full % 60;
        //        var mins = (full - seconds) / 60;
        //
        //        if (seconds < 10){
        //            seconds = "0" + seconds;
        //        }
        //        return mins + ":" + seconds;
        //    }
        //
        //    for (var i = 0; i < artistsOld.length; i++){
        //        for (var j = 0; j < artistsOld[i].albums.length; j++){
        //            for (var k = 0; k < artistsOld[i].albums[j].songs.length; k++){
        //                artistsOld[i].albums[j].songs[k] = {
        //                    title: artistsOld[i].albums[j].songs[k],
        //                    length: generate()
        //                }
        //            }
        //        }
        //    }
        //};

        //generateSongLengths();
        //


        //createPlaylist("My Favourites", [
        //    artistsOld[0].albums[0], artistsOld[0].albums[1], artistsOld[6].albums[0], artistsOld[4].albums[1]
        //]);
        //createPlaylist("Metal Tracks", [
        //    artistsOld[7].albums[0], artistsOld[7].albums[1], artistsOld[5].albums[0], artistsOld[5].albums[1]
        //]);

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
            },

            getArtistIds: function(){
                return artistIds;
            },

            getArtistIdsAsCommaSeparatedString: function(){
                var idString = "";
                for (var i = 0; i < artistIds.length; i++){
                    if (i < artistIds.length - 1){
                        idString += artistIds[i] + ",";
                    }
                    else {
                        idString += artistIds[i];
                    }
                }
                return idString;
            },

            getGenres: function(){
                return allGenres;
            },

            getArtists: function(){
                return artistsOld;
            },

            getQueue: function(){
                return queue;
            },

            //getAllAlbums: function(){
            //    var albums = [];
            //    for (var i = 0; i < artistsOld.length; i++){
            //        for (var j = 0; j < artistsOld[i].albums.length; j++){
            //            albums.push(artistsOld[i].albums[j]);
            //        }
            //    }
            //    return albums;
            //},

            getPlaylists: function(){
                return playlists
            },

            getAlbumsByGenre: function(g){
                var albums = [];
                var album;
                var genre;
                var i, j;
                for (i = 0; i < allGenres.length; i++){
                    if (allGenres[i].name === g){
                        genre = allGenres[i];
                    }
                }
                for (i = 0; i < artistsOld.length; i++){
                    if (artistsOld[i].genre === genre){
                        for (j = 0; j < artistsOld[i].albums.length; j++){
                            album = artistsOld[i].albums[j];
                            album.artistName = artistsOld[i].name;
                            albums.push(album);
                        }
                    }
                }
                return albums;
            },

            getArtistForAlbum: function(albumName){
                for (var i = 0; i < artistsOld.length; i++){
                    for (var j = 0; j < artistsOld[i].albums.length; j++){
                        if (artistsOld[i].albums[j].name === albumName){
                            return artistsOld[i];
                        }
                    }
                }
            }


        };

        return serviceFunctions;


    });