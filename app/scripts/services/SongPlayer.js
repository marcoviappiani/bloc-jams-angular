 (function() {
     function SongPlayer() {
         
         /**
        * @desc Song Player object
        * @type {Object}
        */
         var SongPlayer = {};
         
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
                 currentBuzzObject.stop();
                 SongPlayer.currentSong.playing = null;
             }
             currentBuzzObject = new buzz.sound(song.audioUrl, {
                 formats: ['mp3'],
                 preload: true
             });
             SongPlayer.currentSong = song;
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

         return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();