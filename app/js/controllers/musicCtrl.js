angular.module('controllers.music', [])

    .controller('MusicCtrl', function($scope, MusicService, AccountService, $rootScope, $mdDialog){

        $scope.calculateCurrentTrackVal = function(){
            var secTotal = parseInt($scope.music.currentTrack.seconds * ($scope.music.currentTrack.perc / 100));
            var sec = secTotal % 60;
            var mins = (secTotal - sec) / 60;
            if (sec < 10){
                sec = "0" + sec;
            }

            $scope.music.currentTrack.val = mins + ":" + sec;
        };

        var genreBoxColors = [
            "#EF5350", "#5C6BC0", "#26A69A", "#9CCC65", "#FFA726", "#66BB6A", "#7E57C2"
        ];

        $scope.generateRandomGenreBoxColors = function(){
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

        $scope.orderTracksBy = function(field, tracks){
            if (field === "name"){
                $scope.music.allTracksOrderedBy = "name";
                tracks.sort(function(a, b){
                    if(a.name < b.name) return -1;
                    if(a.name > b.name) return 1;
                    if(a.album.artist.name < b.album.artist.name) return -1;
                    if(a.album.artist.name > b.album.artist.name) return 1;
                    return 0;
                });
            }
            else if (field === "length"){
                $scope.music.allTracksOrderedBy = "length";
                tracks.sort(function(a, b){
                    if(a.duration < b.duration) return -1;
                    if(a.duration > b.duration) return 1;
                    if(a.album.artist.name < b.album.artist.name) return -1;
                    if(a.album.artist.name > b.album.artist.name) return 1;
                    return 0;
                });
            }
            else if (field === "album"){
                $scope.music.allTracksOrderedBy = "album";
                tracks.sort(function(a, b){
                    if(a.album.name < b.album.name) return -1;
                    if(a.album.name > b.album.name) return 1;
                    if(a.album.artist.name < b.album.artist.name) return -1;
                    if(a.album.artist.name > b.album.artist.name) return 1;
                    if(a.trackNo < b.trackNo) return -1;
                    if(a.trackNo > b.trackNo) return 1;
                    return 0;
                });
            }
            else if (field === "artist"){
                $scope.music.allTracksOrderedBy = "artist";
                tracks.sort(function(a, b){
                    if(a.album.artist.name < b.album.artist.name) return -1;
                    if(a.album.artist.name > b.album.artist.name) return 1;
                    if(a.album.name < b.album.name) return -1;
                    if(a.album.name > b.album.name) return 1;
                    if(a.trackNo < b.trackNo) return -1;
                    if(a.trackNo > b.trackNo) return 1;
                    return 0;
                });
            }
        };



        $scope.displayArtist = function(artist){
            $scope.artistToDisplay = artist;
        };

        $scope.displayAlbum = function(album){
            $scope.albumToDisplay = album;
        };

        $scope.displayGenre = function(genre){
            $scope.genreToDisplay = genre;
            $scope.albumsFromGenre = [];
            for (var i = 0; i < genre.artists.length; i++){
                for (var j = 0; j < genre.artists[i].albums.length; j++){
                    $scope.albumsFromGenre.push(genre.artists[i].albums[j]);
                }
            }
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
            allTracksOrderedBy: "artist",
            queue: [],
            organisedBy: "artists",
            currentTrack: {
                perc: 70,
                val: "0:00",
                seconds: 0
            }
        };

        $scope.$on("MusicDataLoaded", function(){
            $scope.music.artists = MusicService.getAllArtists();
            $scope.music.albums = MusicService.getAllAlbums();
            $scope.music.genres = MusicService.getAllGenres();
            $scope.music.songs = MusicService.getAllTracks();
            $scope.generateRandomGenreBoxColors();

            $scope.addTracksToQueue($scope.music.albums[20].tracks);
            $scope.addTracksToQueue($scope.music.albums[21].tracks);
        });

        $scope.addTracksToQueue = function(tracks){
            for (var i = 0; i < tracks.length; i++){
                $scope.music.queue.push(tracks[i]);
            }
        };















        $scope.playPauseIcon = "play";
        $scope.shuffleIcon = "assets/icons/shuffle.png";
        $scope.repeatIcon = "assets/icons/repeat.png";

        $scope.fabButton = {
            isOpen: false,
            direction: "up"
        };

        //$scope.topDirections = ['left', 'up'];
        //$scope.bottomDirections = ['down', 'right'];
        //$scope.isOpen = false;
        //$scope.availableModes = ['md-fling', 'md-scale'];
        //$scope.selectedMode = 'md-fling';
        //$scope.availableDirections = ['up', 'down', 'left', 'right'];
        //$scope.selectedDirection = 'up';

        $scope.account = AccountService.getAccountDetails();

        $scope.$on("updateAccountDetails", function(){
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

        //$scope.generateRandomGenreBoxColors();
        //$scope.orderTracksBy("artist", $scope.music.allSongs);
        //$scope.getCurrentSongLengthSeconds();
        $scope.calculateCurrentTrackVal();



    });