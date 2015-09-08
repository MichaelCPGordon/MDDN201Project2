angular.module('controllers.music', [])

    .controller('MusicCtrl', function($scope, MusicService, AccountService, $rootScope, $mdDialog){

        $scope.account = AccountService.getAccountDetails();

        $rootScope.$on("updateAccountDetails", function(){
            $scope.account = AccountService.getAccountDetails();
        });

        $scope.showSettings = function(ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'templates/settingsDialog.html',
                focusOnOpen: true,
                targetEvent: ev,
                clickOutsideToClose:true
            });
        };

        function DialogController($scope, $mdDialog, AccountService, $rootScope) {

            $scope.account = angular.copy(AccountService.getAccountDetails());

            $scope.hide = function() {
                AccountService.updateAccountDetails($scope.account);
                $rootScope.$broadcast("updateAccountDetails");
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $rootScope.$broadcast("updateAccountDetails");
                $mdDialog.cancel();
            };
        }

        var genreBoxColors = [
            "#EF5350", "#5C6BC0", "#26A69A", "#9CCC65", "#FFA726", "#66BB6A", "#7E57C2"
        ];

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

        $scope.orderSongsBy = function(field, songs){
            if (field === "title"){
                $scope.music.allSongsOrderedBy = "title";
                songs.sort(function(a, b){
                    if(a.title < b.title) return -1;
                    if(a.title > b.title) return 1;
                    return 0;
                });
            }
            else if (field === "album"){
                $scope.music.allSongsOrderedBy = "album";
                songs.sort(function(a, b){
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
                songs.sort(function(a, b){
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

            for (var i = 0; i < artists.length; i++){
                for (var j = 0; j < artists[i].albums.length; j++){
                    for (var k = 0; k < artists[i].albums[j].songs.length; k++){
                        allSongs.push({
                            title: artists[i].albums[j].songs[k].title,
                            artist: artists[i].name,
                            album: artists[i].albums[j].name,
                            img: artists[i].albums[j].img,
                            length: artists[i].albums[j].songs[k].length,
                            index: k
                        })
                    }
                }
            }
            return allSongs;
        };

        $scope.getCurrentSongLengthSeconds = function(){
            var trackLen;
            var mins, sec;
            for (var i = 0; i < $scope.music.allSongs.length; i++){
                if ($scope.music.allSongs[i].title === "First Fires"){
                    trackLen = $scope.music.allSongs[i].length;
                }
            }
            mins = parseInt(trackLen.substr(0, trackLen.indexOf(':')));
            sec = parseInt(trackLen.substr(trackLen.indexOf(':') + 1, trackLen.length));
            $scope.music.currentTrack.seconds = mins * 60 + sec;
        };

        $scope.calculateCurrentTrackVal = function(){
            var secTotal = parseInt($scope.music.currentTrack.seconds * ($scope.music.currentTrack.perc / 100));
            var sec = secTotal % 60;
            var mins = (secTotal - sec) / 60;
            if (sec < 10){
                sec = "0" + sec;
            }

            $scope.music.currentTrack.val = mins + ":" + sec;
        };

        $scope.displayArtist = function(artistName){
            for (var i = 0; i < $scope.music.artists.length; i++){
                if ($scope.music.artists[i].name === artistName){
                    $scope.artistToDisplay = $scope.music.artists[i];
                }
            }
        };

        $scope.displayAlbum = function(albumName){
            for (var i = 0; i < $scope.music.allAlbums.length; i++){
                if ($scope.music.allAlbums[i].name === albumName){
                    $scope.albumToDisplay = $scope.music.allAlbums[i];
                }
            }
            for (i = 0; i < $scope.music.artists.length; i++){
                for (var j = 0; j < $scope.music.artists[i].albums.length; j++){
                    if ($scope.music.artists[i].albums[j].name === albumName){
                        $scope.albumToDisplay.artistName = $scope.music.artists[i].name;
                    }
                }
            }
        };

        $scope.displayGenre = function(genreName){
            for (var i = 0; i < $scope.music.genres.length; i++){
                if ($scope.music.genres[i].name === genreName){
                    $scope.genreToDisplay = $scope.music.genres[i];
                }
            }
            $scope.albumsFromGenre = MusicService.getAlbumsByGenre($scope.genreToDisplay.name);
        };


        $scope.setupPlaylistToDisplay = function(playlist){
            $scope.playlistToDisplay = {
                name: playlist.name,
                songs: []
            };
            for (var i = 0; i < playlist.albums.length; i++){
                for (var j = 0; j < playlist.albums[i].songs.length; j++){
                    $scope.playlistToDisplay.songs.push({
                        title: playlist.albums[i].songs[j].title,
                        length: playlist.albums[i].songs[j].length,
                        artist: playlist.albums[i].artist,
                        album: playlist.albums[i].name,
                        img: playlist.albums[i].img,
                        index: j
                    });
                }
            }
        };

        $scope.organiseMusicBy = function(type){
            $scope.music.organisedBy = type;
            $scope.artistToDisplay = null;
            $scope.albumToDisplay = null;
            $scope.genreToDisplay = null;
            $scope.albumsFromGenre = null;
            $scope.playlistToDisplay = null;
        };

        $scope.togglePlayPause = function(){
            if ($scope.playPauseIcon === "play"){
                $scope.playPauseIcon = "pause";
            }
            else {
                $scope.playPauseIcon = "play";
            }
        };

        $scope.artistToDisplay = null;
        $scope.albumToDisplay = null;
        $scope.genreToDisplay = null;
        $scope.albumsFromGenre = null;
        $scope.playlistToDisplay = null;

        $scope.music = {
            genres: MusicService.getGenres(),
            artists: MusicService.getArtists(),
            playlists: MusicService.getPlaylists(),
            allAlbums: MusicService.getAllAlbums(),
            allSongs: $scope.setupAllSongs(),
            allSongsOrderedBy: "artist",
            queue: MusicService.getQueue(),
            organisedBy: "artists",
            currentTrack: {
                perc: 70,
                val: "0:00",
                seconds: 0
            }
        };

        $scope.playPauseIcon = "play";
        $scope.shuffleIcon = "assets/icons/shuffle.png";
        $scope.repeatIcon = "assets/icons/repeat.png";


        $scope.generateRandomGenreBoxColor();
        $scope.orderSongsBy("artist", $scope.music.allSongs);
        $scope.getCurrentSongLengthSeconds();
        $scope.calculateCurrentTrackVal();



    });