angular.module('services.music', [])

    .factory('MusicService', function(){

        var genres = [
            { name: "Rock" }, { name: "Metal" }, { name: "Acoustic" },
            { name: "Electronic" }, { name: "Pop" }, { name: "Hip Hop" }
        ];

        var artists = [
            { name: "Pink Floyd", img: "pinkFloyd", genre: genres[0], albums: [
                { name: "Meddle", artist: "Pink Floyd", img: "meddle", songs: [
                    "One Of These Days", "A Pillow Of Winds",
                    "Fearless", "San Tropez", "Seamus", "Echoes"
                ]},
                { name: "Animals", artist: "Pink Floyd", img: "animals", songs: [
                    "Pigs On The Wing (Part 1)", "Dogs", "Pigs",
                    "Sheep", "Pigs On The Wing (Part 2)"
                ]}
            ]},
            { name: "A Perfect Circle", img: "aPerfectCircle", genre: genres[1], albums: [
                { name: "Thirteenth Step", artist: "A Perfect Circle", img: "thirteenthStep", songs: [
                    "The Package", "Weak And Powerless", "The Noose", "Blue", "Vanishing",
                    "A Stranger", "The Outsider", "Crimes", "the Nurse Who Loved Me",
                    "Pet", "Lullaby", "Gravity"
                ]},
                { name: "Mer De Noms", artist: "A Perfect Circle", img: "merDeNoms", songs: [
                    "The Hollow", "Magdalena", "Rose", "Judith", "Orestas", "3 Libras",
                    "Sleeping Beauty", "Thomas", "Renholder", "Thinking Of You",
                    "Brena", "Over"
                ]}
            ]},
            { name: "Bonobo", img: "bonobo", genre: genres[3], albums: [
                { name: "Eyesdown", artist: "Bonobo", img: "eyesdown", songs: [
                    "Eyesdown", "Eyesdown (Floating Ponits Remix)", "Eyesdown (Warrior 1 Remix)",
                    "Eyesdown (Appleblim Remix)", "Eyesdown (Instrumental)"
                ]},
                { name: "The North Borders", artist: "Bonobo", img: "theNorthBorders", songs: [
                    "First Fires", "Emkay", "Cirrus", "Heaven For The Sinner", "Sapphire",
                    "Jets", "Towers", "Don't Wait", "Know You", "Antenna", "Ten Tigers",
                    "Transits", "Pieces"
                ]}
            ]},
            { name: "Eminem", img: "eminem", genre: genres[5], albums: [
                { name: "The Eminem Show", artist: "Eminem", img: "theEminemShow", songs: [
                    "Curtains Up", "White America", "Business", "Cleanin' Out My Closet",
                    "Square Dance", "The Kiss", "Soldier", "Say Goodbye Hollywood"
                ]},
                { name: "Shady XV", artist: "Eminem", img: "shadyxv", songs: [
                    "SHADYXV", "Psychopath Killer", "Die Alone", "Vegas", "Y'all Ready Know",
                    "Guts Oevr Fear", "Down", "Bane", "Fine Line", "Twisted"
                ]}
            ]},
            { name: "Little Dragon", img: "littleDragon", genre: genres[4], albums: [
                { name: "Sunshine", artist: "Little Dragon", img: "sunshine", songs: [
                    "Sunshine"
                ]},
                { name: "Blinking Pigs", artist: "Little Dragon", img: "blinkingPigs", songs: [
                    "Blinking Pigs", "Runabout", "Never Never", "Fortune", "Feather"
                ]}
            ]},
            { name: "Mastodon", img: "mastodon", genre: genres[1], albums: [
                { name: "Once More 'Round The Sun", artist: "Mastodon", img: "onceMoreRoundTheSun", songs: [
                    "Tread Lightly", "Motherload", "High Road", "Once More 'Round the Sun",
                    "Chimes At Midnight", "Asleep In The Deep", "Feast Your Eyes"
                ]},
                { name: "Blood Mountain", artist: "Mastodon", img: "bloodMountain", songs: [
                    "The Wolf Is Loose", "Crystal Skull", "Sleeping Giant", "Capillarian Crest",
                    "Circle Of Cystquatch","Bladecatcher", "Colony Of Birchmen"
                ]}
            ]},
            { name: "System Of A Down", img: "systemOfADown", genre: genres[1], albums: [
                { name: "Hypnotize", artist: "System Of A Down", img: "hypnotize", songs: [
                    "Attack", "Dreaming", "Kill Rock 'n Roll", "Hypnotize", "Stealing Society",
                    "Tentative", "U-Fig", "Holy Mountains", "Vicinity Of Obscenity"
                ]},
                { name: "Mezmerize", artist: "System Of A Down", img: "mezmerize", songs: [
                    "Soldier Side", "B.Y.O.B", "Revenga", "Cigaro", "Radio", "Question!",
                    "Sad Statue", "Old School Hollywood"
                ]}
            ]},
            { name: "Tool", img: "tool", genre: genres[1], albums: [
                { name: "10,000 Days", artist: "Tool", img: "10000days", songs: [
                    "Vicarious", "Jambi", "Wings For Marie", "10,000 Days",
                    "The Pot", "Lipan Conjuring", "Lost Keys", "Rosetta Stoned"
                ]},
                { name: "Salival", artist: "Tool", img: "salival", songs: [
                    "Third Eye", "Part Of Me", "Pushit", "Message To Harry Manback II",
                    "You Lied", "Merkaba", "No Quater", "LAMC"
                ]}
            ]}
        ];

        var queue = [];

        var generateQueue = function(songs){
            for (var i = 0; i < songs.length; i++){
                queue.push(songs[i]);
            }
        };

        generateQueue(artists[0].albums[0].songs);
        generateQueue(artists[0].albums[1].songs);
        generateQueue(artists[0].albums[1].songs);
        generateQueue(artists[0].albums[1].songs);
        generateQueue(artists[0].albums[1].songs);

        var serviceFunctions = {

            getGenres: function(){
                return genres;
            },

            getArtists: function(){
                return artists;
            },

            getQueue: function(){
                return queue;
            },

            getAllAlbums: function(){
                var albums = [];
                for (var i = 0; i < artists.length; i++){
                    for (var j = 0; j < artists[i].albums.length; j++){
                        albums.push(artists[i].albums[j]);
                    }
                }
                return albums;
            }


        };

        return serviceFunctions;


    });