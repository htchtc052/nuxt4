<template>
<div>
   <div id="player" class="player"  v-if="this.playerActiveComputed ? true : false ">
        <div @click="skipTo" class="player__progress position-relative">
            <div class="progress rounded-0 pointer">
                <div class="progress-bar bg-orange" role="progressbar" :style="'width: ' + this.progress  + '%'" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
         
            <div class="d-flex justify-content-between px-1">
         <!--        <span class="t-10">{{ this.seek }}</span>
                <span class="t-10">{{ this.duration }}</span> -->
            </div> 
         </div>
        <div class="wrap position-relative">
            <div class="player__toogle pointer">
                <span class="icon-arrow-down icons t-12" @click="closePlayer()"></span>
            </div>
            <div class="d-flex pb-3">
                <div class="border-right d-flex align-items-center px-3">
                    <span class="pointer p-2 t-18" v-if="!(isFirst && !repeat)">
                        <span @click="prevClick()" class="icon-control-rewind icons"></span>
                    </span>
                    <span class="pointer p-2 t-21 ml-1">
                          <span class="icons"
                           v-bind:class="{ 'icon-control-pause': !pause, 'icon-control-play': pause }"
                           @click="pause ? pauseClick(false) : pauseClick(true)"></span>
                    </span>
                    <span class="pointer p-2 t-18" v-if="!(isLast && !repeat)">
                        <span @click="nextClick()" class="icon-control-forward icons"></span>
                    </span>
                </div>
                <div class="border-right d-flex align-items-center px-2">
                    <span class="pointer p-2 t-16">
                        <span class="icon-volume-off icons" @click="volumeUpDown('down')"></span>
                    </span>
                    <div class="progress player__volume">
                        <div class="progress-bar bg-orange" role="progressbar" :style="'width: ' + volume * 100 + '%'" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <span class="pointer p-2 t-16">
                        <span class="icon-volume-2 icons" @click="volumeUpDown('up')"></span>
                    </span>
                </div>
                <div class="px-2 w-100 d-flex align-items-center border-right">
                    <a href="#" class="mx-2">
                        <img class="rounded" :src=track.bandimg alt="">
                    </a>
                    <div>
                        <a href="#" class="font-weight-bold">{{ track.title }}</a>
                        <div>
                            <a href="#" class="font-italic t-13 text-nolink">{{ track.page_title }}</a>
                        </div>
                       </div>
                </div>
                <div class="pl-2 pr-4 d-flex align-items-center">
                    <span class="pointer p-2 t-18">
                        <span class="icon-like icons"></span>
                    </span>
                    <span class="pointer p-2 t-18">
                        <span class="icon-arrow-down-circle icons"></span>
                    </span>
                    <span class="pointer p-2 t-18">
                        <span class="icon-share icons"></span>
                    </span>
                    <span class="pointer p-2 t-18">
                        <span class="icon-playlist icons"></span>
                    </span>
                    <span class="pointer p-2 t-18">
                        <a href="#" @click.prevent="TOGGLE_REPEAT()" v-text=" repeat ? 'Repeat Yes' : 'Repeat No' "></a>
                    </span>
                    <span class="pointer p-2 t-18">
                          <a href="#" @click.prevent="TOGGLE_SHUFFLE()" v-text=" shuffle ? 'Shuffle Yes' : 'Shuffle No' "></a>
                    </span>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import Vue from "vue";
import clamp from "math-clamp";
import {   Howl, Howler } from "howler";
import { createNamespacedHelpers } from "vuex";
const {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} = createNamespacedHelpers("playlist");

export default {
  data: () => {
    return {
      seek: 0,
      duration: 0,
      playerInstance: null,
      timerId: null,
      nowPlaying: false,
    };
  },
  watch: {
    nowPlaying: function(nowPlaying) {
      console.log("watch", nowPlaying, "timerId", this.timerId);

      if (nowPlaying) {
        // Start the seek poll
        this.timerId = setInterval(() => {
          this.seek = this.playerInstance.seek() || 0;
          console.log("in timer", this.seek, this.progress, this.duration);
        }, 250);
      } else {
        // Stop the seek poll
        clearInterval(this.timerId);
      }
    },
   /*  playerActiveComputed: function(playerActiveComputed) {
      console.log("playerActiveComputed", playerActiveComputed)
      if (playerActiveComputed) {
        this.startPlayer()
      }
     }, */
    track: function(newTrack, oldTrack) {
        console.log("newTrack", newTrack.id, newTrack.title, "oldTrakc", oldTrack.id, oldTrack.title)
      if (newTrack.id) {
        console.log("NEWTRACK")
        if (this.playerInstance) {
          console.log("need unload player")
          this.unloadPlayerInstance()
        }
        this.startPlayer()
      }
    },
    pauseComputed: function(pause) {
        console.log("watch pause", pause)
        if (pause) {
          this.playerInstance.pause()
        } else {
          this.playerInstance.play()
        }
    }

  },
  mounted() {},
  computed: {
    pauseComputed() {
      return this.$store.getters["playlist/pause"]
    },
    progress() {
      //console.log("progress()", this.seek, this.duration)      
      if (this.duration === 0) return 0

      return this.seek / this.duration * 100
    },
    //nowPlayingActive() {
     // return this.nowPlaying;
   // }
   //,
    ...mapGetters(["isFirst", "isLast", "volume"]),
    ...mapState(["repeat", "shuffle", "pause"]),
    playerActiveComputed() {
      return this.$store.getters["playlist/playerActive"]
    },
    track() {
      return this.$store.getters["playlist/track"]
    }
    /* playerActive() {
      return this.playerActive ? this.$player : null;
    } */
  },
  methods: {
    createPlayerInstance: function() {
    const track = this.$store.getters["playlist/track"].file

    const self = this

    const player = new Howl({
        src: [track],
        html5: true,
        autoplay: false,
        preload: false
    })


      const volume = this.volume || 1
     // console.log("volume111", this.volume, volume)
      player.volume(volume)
      
      console.log(player)
   
      player.on('end', function (selected) {
         this.nowPlaying = false
        console.log("on end")
        if (this.$store.getters['playlist/repeat'] || !this.$store.getters["playlist/isLast"]) {
          console.log("auto next")
          this.$store.dispatch('playlist/next')
          this.createPlayer()
          this.playerInstance.play()
        } else {
          this.playerInstance.seek(0)
          this.$store.commit('playlist/SET_PAUSE')
        } 
      })

   
      player.on('load', function (cb) {
        //this.duration = player.duration()
        //console.log("dur", cb, player.duration())
        self.duration = player.duration()
        console.log("on load", self.duration)
      })

      player.on('play', function () {
        self.nowPlaying = true
        console.log("on play")
      })

      player.on('pause', function () {
        // window.clearInterval(this.$playerTimer)
        self.nowPlaying = false
        console.log("on pause")
      })

      player.on('stop', function () {
        self.nowPlaying = false
        console.log("on stop")
      })

      if (self.playerInstance) {
        console.log("createPlayer self.playerInstance exists")
        self.unloadPlayerInstance()
      }

      self.playerInstance = player
      console.log("createPlayerInstance end ", self.playerInstance)
   },

    prevClick: function() {
      //this.unloadPlayerInstance()
      this.$store.dispatch("playlist/prev")
      //this.startPlayer()
    },
    nextClick: function() {
    //  this.unloadPlayerInstance()
      this.$store.dispatch("playlist/next")
      //this.startPlayer()
    }, 
    pauseClick: function(val) {
      if (val) 
        this.$store.commit('playlist/SET_PAUSE')
      else 
        this.$store.commit('playlist/UNSET_PAUSE')
    },
    skipTo: function(params) {
      const seekTo =
        params.offsetX /
        params.srcElement.parentElement.clientWidth *
        this.duration;
      console.log("seekTo", seekTo, "playerInstance", this.playerInstance, "duration", this.duration);
      const seek = clamp(seekTo, 0, this.duration)
      this.playerInstance.seek(seek);
      this.seek = seek
    },
    setPause: function() {
      this.$store.commit("playlist/SET_PAUSE");
      this.playerInstance.pause()
    },
    unsetPause: function() {
      this.$store.commit("playlist/UNSET_PAUSE");
      this.playerInstance.play()
    },
    unloadPlayerInstance: function() {
      console.log("player instance unload")
      this.nowPlaying = false
      this.seek = 0
      this.playerInstance.unload()
      this.playerInstance = null
    },
    closePlayer: function() {
      console.log("close player", "timerId", this.timerId, "player", this.playerInstance)
      clearInterval(this.timerId)
      this.unloadPlayerInstance()
      this.$store.commit("playlist/UNSET_PLAYER_ACTIVE");
      this.$store.commit("playlist/UNSET_PLAYLIST");
    },
    startPlayer: function() {
        this.createPlayerInstance()
        if (this.pause) 
          this.playerInstance.pause()
        else this.playerInstance.play()
    },
    volumeUpDown: function(type) {
      if (type == "down") {
        var new_volume = (Math.round(this.$player.volume() * 100) - 10) / 100;
      } else {
        var new_volume = (Math.round(this.$player.volume() * 100) + 10) / 100;
      }
      if (new_volume > 1) new_volume = 1;
      if (new_volume < 0) new_volume = 0;
      console.log("volemeUpDown", new_volume);
      this.playerInstance.volume(new_volume);
      this.$store.commit("playlist/SET_VOLUME", new_volume);
    },
    ...mapMutations(["TOGGLE_REPEAT", "TOGGLE_SHUFFLE"])
  },
  ready: function() {}
};
</script>


