angular.module('controllers.music', [])

    .controller('MusicCtrl', function($scope, MusicService, AccountService, $rootScope, $mdDialog){

        $scope.calculateCurrentTrackVal = function(){
            if ($scope.music.nowPlaying){
                var secTotal = parseInt($scope.music.nowPlaying.duration * ($scope.music.currentTrack.perc * 0.01));
                var sec = secTotal % 60;
                var mins = (secTotal - sec) / 60;
                if (sec < 10){
                    sec = "0" + sec;
                }
                $scope.music.currentTrack.val = mins + ":" + sec;
            }
            else {
                $scope.music.currentTrack.val = "00:00";
            }

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

        $scope.orderArtistsAlbumsGenres = function(){
            $scope.music.artists.sort(function(a, b){
                if(a.name < b.name) return -1;
                if(a.name > b.name) return 1;
                return 0;
            });
            $scope.music.albums.sort(function(a, b){
                if(a.name < b.name) return -1;
                if(a.name > b.name) return 1;
                return 0;
            });
            $scope.music.genres.sort(function(a, b){
                if(a.name < b.name) return -1;
                if(a.name > b.name) return 1;
                return 0;
            });
        };



        $scope.displayArtist = function(artist){
            $scope.artistToDisplay = artist;
        };

        $scope.displayAlbum = function(album){
            $scope.albumToDisplay = album;
        };

        $scope.displayPlaylist = function(playlist){
            $scope.playlistToDisplay = playlist;
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

        $scope.organiseMusicBy = function(type){
            $scope.showSearchResults = false;
            $scope.music.searchString = "";

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
        $scope.showSearchResults = false;

        $scope.music = {
            allTracksOrderedBy: "artist",
            queue: [],
            nowPlaying: null,
            organisedBy: "artists",
            currentTrack: {
                perc: 30,
                val: "0:00"
            },
            searchString: "",
            tracksFromSearch: []
        };

        $scope.$on("MusicDataLoaded", function(){
            $scope.music.artists = MusicService.getAllArtists();
            $scope.music.albums = MusicService.getAllAlbums();
            $scope.music.genres = MusicService.getAllGenres();
            $scope.music.songs = MusicService.getAllTracks();
            $scope.music.playlists = [];
            $scope.orderArtistsAlbumsGenres();
            $scope.generateRandomGenreBoxColors();
            $scope.setupPlaylistsAndQueue();
            $scope.calculateCurrentTrackVal();
        });

        $scope.addTracksToQueue = function(tracks){
            for (var i = 0; i < tracks.length; i++){
                if ($scope.music.queue.indexOf(tracks[i]) === -1){
                    $scope.music.queue.unshift(tracks[i]);
                }
            }
            if ($scope.music.queue.length > 0){
                $scope.music.nowPlaying = $scope.music.queue[0];
            }
            $scope.music.currentTrack.perc = 0;
            $scope.calculateCurrentTrackVal();
        };

        var addTrackCoversToPlaylistCovers = function(playlist, tracks){
            for (var i = 0; i < tracks.length; i++){
                if (playlist.covers.indexOf(tracks[i].album.img) === -1 && playlist.covers.length < 5){
                    playlist.covers.push(tracks[i].album.img);
                }
            }
        };

        $scope.createNewPlaylist = function(name, tracks){
            var playlist = { name: name, tracks: tracks, covers: [] };
            addTrackCoversToPlaylistCovers(playlist, tracks);
            $scope.music.playlists.push(playlist);
        };

        $scope.addTracksToPlaylist = function(name, tracks){
            for (var i = 0; i < $scope.music.playlists.length; i++){
                if ($scope.music.playlists[i].name === name){
                    for (var j = 0; j < tracks.length; j++){
                        $scope.music.playlists[i].tracks.push(tracks[j]);
                    }
                    addTrackCoversToPlaylistCovers($scope.music.playlists[i], tracks);
                    return;
                }
            }
            console.log("Playlist: " + name + ", not found.");
        };

        $scope.getAlbumByName = function(name){
            for (var i = 0; i < $scope.music.albums.length; i++){
                if ($scope.music.albums[i].name === name){
                    return $scope.music.albums[i];
                }
            }
            console.log("Album: " + name + ", not found.");
            return null;
        };

        $scope.searchForTracks = function(){
            if ($scope.music.searchString){
                $scope.music.tracksFromSearch = [];
                for (var i = 0; i < $scope.music.songs.length; i++){
                    if ($scope.music.songs[i].name.toUpperCase().indexOf($scope.music.searchString.toUpperCase()) > -1 ||
                        $scope.music.songs[i].album.name.toUpperCase().indexOf($scope.music.searchString.toUpperCase()) > -1 ||
                        $scope.music.songs[i].album.artist.name.toUpperCase().indexOf($scope.music.searchString.toUpperCase()) > -1 ){
                        $scope.music.tracksFromSearch.push($scope.music.songs[i]);
                    }
                }
                $scope.showSearchResults = true;
            }
        };

        $scope.clearQueue = function(){
            $scope.music.queue = [];
            $scope.music.nowPlaying = null;
        };

        $scope.playTrack = function(track){
            for (var i = 0; i < $scope.music.queue.length; i++){
                if ($scope.music.queue[i] === track){
                    $scope.music.nowPlaying = $scope.music.queue[i];
                    $scope.music.currentTrack.perc = 0;
                    $scope.calculateCurrentTrackVal();
                    return;
                }
            }
            $scope.music.queue.unshift(track);
            $scope.music.nowPlaying = $scope.music.queue[0];
            $scope.music.currentTrack.perc = 0;
            $scope.calculateCurrentTrackVal();
        };

        $scope.setupPlaylistsAndQueue = function(){
            $scope.addTracksToQueue($scope.music.albums[20].tracks);
            $scope.addTracksToQueue($scope.music.albums[21].tracks);
            $scope.music.nowPlaying = $scope.music.queue[0];

            $scope.createNewPlaylist("Favourites", $scope.getAlbumByName("A Dramatic Turn Of Events").tracks);
            $scope.addTracksToPlaylist("Favourites", $scope.getAlbumByName("Hurry Up, We're Dreaming").tracks);
            $scope.addTracksToPlaylist("Favourites", $scope.getAlbumByName("Recovery (Explicit Version)").tracks);
            $scope.addTracksToPlaylist("Favourites", $scope.getAlbumByName("The North Borders").tracks);
            $scope.addTracksToPlaylist("Favourites", $scope.getAlbumByName("The Endless River").tracks);

            $scope.createNewPlaylist("Metal", $scope.getAlbumByName("Siren Charms").tracks);
            $scope.addTracksToPlaylist("Metal", $scope.getAlbumByName("The Hunter").tracks);
            $scope.addTracksToPlaylist("Metal", $scope.getAlbumByName("eMOTIVe").tracks);
            $scope.addTracksToPlaylist("Metal", $scope.getAlbumByName("Once More 'Round The Sun").tracks);

            $scope.createNewPlaylist("Indie", $scope.getAlbumByName("Favourite Worst Nightmare").tracks);
            $scope.addTracksToPlaylist("Indie", $scope.getAlbumByName("Humbug").tracks);
            $scope.addTracksToPlaylist("Indie", $scope.getAlbumByName("Ritual Union").tracks);
            $scope.addTracksToPlaylist("Indie", $scope.getAlbumByName("Machine Dreams").tracks);

            $scope.createNewPlaylist("Chill", $scope.getAlbumByName("The North Borders").tracks);
            $scope.addTracksToPlaylist("Chill", $scope.getAlbumByName("Late Night Tales - Bonobo").tracks);
            $scope.addTracksToPlaylist("Chill", $scope.getAlbumByName("Paradise Valley").tracks);
            $scope.addTracksToPlaylist("Chill", $scope.getAlbumByName("Black Sands").tracks);

            $scope.createNewPlaylist("Acoustic", $scope.getAlbumByName("Battle Studies").tracks);
            $scope.addTracksToPlaylist("Acoustic", $scope.getAlbumByName("Born and Raised").tracks);
            $scope.addTracksToPlaylist("Acoustic", $scope.getAlbumByName("From Here To Now To You").tracks);
            $scope.addTracksToPlaylist("Acoustic", $scope.getAlbumByName("To The Sea").tracks);

            $scope.createNewPlaylist("Live", $scope.getAlbumByName("Mer De Noms - Live").tracks);
            $scope.addTracksToPlaylist("Live", $scope.getAlbumByName("Live at Brixton").tracks);
            $scope.addTracksToPlaylist("Live", $scope.getAlbumByName("Where The Light Is: John Mayer Live In Los Angeles").tracks);
            $scope.addTracksToPlaylist("Live", $scope.getAlbumByName("Elton 60 - Live At Madison Square Garden").tracks);
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