 (function() {
     function SongPlayer(Fixtures) {
         
         /**
        * @desc Song Player object
        * @type {Object}
        */
         var SongPlayer = {};
         
         /**
        * @desc current Album object
        * @type {Object}
        */
         var currentAlbum = Fixtures.getAlbum();
         
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
         var currentBuzzObject = null;
        
         /**
        * @function playSong
        * @desc Plays a song
        * @param {Object} song
        */
         var playSong = function(song) {
             currentBuzzObject.play();
             song.playing = true;
         };
         
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
         var setSong = function(song) {
             if (currentBuzzObject) {
                 stopSong(song);
             }
             currentBuzzObject = new buzz.sound(song.audioUrl, {
                 formats: ['mp3'],
                 preload: true
             });
             SongPlayer.currentSong = song;
         };
         
         /**
        * @function stopSong
        * @desc Stops playing a song
        * @param {Object} song
        */
         var stopSong = function(song) {
             currentBuzzObject.stop();
             SongPlayer.currentSong.playing = null;
             if(song) {
                 song.playing = null;
             }
         };
         
         /**
        * @function getSongIndex
        * @desc 
        * @param {Object} song
        * @return {Number} index
        */
         var getSongIndex = function(song) {
             return currentAlbum.songs.indexOf(song);
         };        
         
         /**
        * @desc current Song selected
        * @type {Object}
        */
         SongPlayer.currentSong = null;
         
         /**
        * @function play
        * @desc Sets a current song and plays that song
        * @param {Object} song
        */
         SongPlayer.play = function(song) {
             song = song || SongPlayer.currentSong;             
             if (SongPlayer.currentSong !== song) {
                 
                 setSong(song);
                 
                 playSong(song);
                 
             } else if (SongPlayer.currentSong === song) {
                 
                 if (currentBuzzObject.isPaused()) {
                     playSong(song);
                 }
             }
         };
        
         /**
        * @function pause
        * @desc Pauses a song
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;            
            currentBuzzObject.pause();
            song.playing = false;
        };
         
        /**
        * @function next
        * @desc Goes to next song
        */
         SongPlayer.next = function() {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex++;
             
             if (currentSongIndex > currentAlbum.songs.length -1) {
                 stopSong(song);
             } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }
         };
         
         
          /**
        * @function previous
        * @desc Goes to previous song
        */
         SongPlayer.previous = function() {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex--;
             
             if (currentSongIndex < 0) {
                 stopSong(song);
             } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }
         };
         

         return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer',['Fixtures', SongPlayer]);
 })();