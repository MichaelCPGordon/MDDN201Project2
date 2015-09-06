angular.module('controllers.music', [])

    .controller('MusicCtrl', function($scope, MusicService){

        var genreBoxColors = [
            "#EF5350", "#5C6BC0", "#26A69A", "#9CCC65", "#FFA726", "#66BB6A", "#7E57C2"
        ];

        $scope.organiseMusicBy = function(type){
            $scope.music.organisedBy = type;
        };

        $scope.generateRandomGenreBoxColor = function(){
            var randCol = "";
            var prevCol = "";
            for (var i = 0; i < $scope.music.genres.length; i++){
                while (randCol === prevCol){
                    randCol = genreBoxColors[Math.floor(Math.random() * genreBoxColors.length)];
                }
                prevCol = randCol;
                $scope.music.genres[i].color = { 'background-color' : randCol };
            }
        };

        $scope.orderAllSongsBy = function(field){
            if (field === "title"){
                $scope.music.allSongsOrderedBy = "title";
                $scope.music.allSongs.sort(function(a, b){
                    if(a.title < b.title) return -1;
                    if(a.title > b.title) return 1;
                    return 0;
                });
            }
            else if (field === "album"){
                $scope.music.allSongsOrderedBy = "album";
                $scope.music.allSongs.sort(function(a, b){
                    if(a.album < b.album) return -1;
                    if(a.album > b.album) return 1;
                    if(a.artist < b.artist) return -1;
                    if(a.artist > b.artist) return 1;
                    if(a.index < b.index) return -1;
                    if(a.index > b.index) return 1;
                    return 0;
                });
            }
            else if (field === "artist"){
                $scope.music.allSongsOrderedBy = "artist";
                $scope.music.allSongs.sort(function(a, b){
                    if(a.artist < b.artist) return -1;
                    if(a.artist > b.artist) return 1;
                    if(a.album < b.album) return -1;
                    if(a.album > b.album) return 1;
                    if(a.index < b.index) return -1;
                    if(a.index > b.index) return 1;
                    return 0;
                });
            }
        };

        $scope.setupAllSongs = function(){
            var artists = MusicService.getArtists();
            var allSongs = [];
            var generateSongLength = function(){
                var full = (Math.floor(Math.random() * 720) + 60);
                var seconds = full % 60;
                var mins = (full - seconds) / 60;

                if (seconds < 10){
                    seconds = "0" + seconds;
                }
                return mins + ":" + seconds;
            };

            for (var i = 0; i < artists.length; i++){
                for (var j = 0; j < artists[i].albums.length; j++){
                    for (var k = 0; k < artists[i].albums[j].songs.length; k++){
                        allSongs.push({
                            title: artists[i].albums[j].songs[k],
                            artist: artists[i].name,
                            album: artists[i].albums[j].name,
                            img: artists[i].albums[j].img,
                            length: generateSongLength(),
                            index: k
                        })
                    }
                }
            }

            allSongs.sort(function(a, b){
                if(a.title < b.title) return -1;
                if(a.title > b.title) return 1;
                return 0;
            });
            return allSongs;
        };

        $scope.music = {
            genres: MusicService.getGenres(),
            artists: MusicService.getArtists(),
            allAlbums: MusicService.getAllAlbums(),
            allSongs: $scope.setupAllSongs(),
            allSongsOrderedBy: "title",
            queue: MusicService.getQueue(),
            search: "",
            organisedBy: "albums"
        };
        $scope.generateRandomGenreBoxColor();







        $scope.test = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

        $scope.alphabet = ['A', 'B', 'C', 'D', 'E', 'F',
            'G', 'H', 'I', 'J', 'K', 'L',
            'M', 'N', 'O', 'P', 'Q', 'R',
            'S', 'T', 'U', 'V', 'W', 'X',
            'Y', 'Z'
        ];

        $scope.search = function(){
            console.log("searching for: " + $scope.music.search);
        };


    });