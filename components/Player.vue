<template>
<div>
   <div id="player" class="player"  v-if="this.track.file ? true : false ">
        <div @click="skipTo" class="player__progress position-relative">
            <div class="progress rounded-0 pointer">
                <div class="progress-bar bg-orange" role="progressbar" :style="'width: ' + this.progress  + '%'" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
         
            <div class="d-flex justify-content-between px-1">
                <span class="t-10">{{ this.timerSeek }}</span>
                <span class="t-10">{{ this.timerDuration }}</span> 
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
import { Howl, Howler } from "howler";
import { createNamespacedHelpers } from "vuex";
import tracksHelper from "~/plugins/tracksHelper";
const {
  //mapState,
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
      nowPlaying: false
    };
  },
  watch: {
    nowPlaying: function(nowPlaying) {
      // console.log("watch nowPlaying", nowPlaying, "timerId", this.timerId);

      if (nowPlaying) {
        this.timerId = setInterval(() => {
          this.seek = this.playerInstance.seek() || 0;
          // console.log("in timer", this.seek, this.progress, this.duration);
        }, 250);
      } else {
        clearInterval(this.timerId);
      }
    },
    track: {
      immediate: true,
      handler(newTrack, oldTrack) {
        console.log(
          "Watch track",
          "new " + newTrack.title + " old " + oldTrack
        );
        //if (newTrack.id) {
          //console.log("found new track");
          if (this.playerInstance) {
            this.unloadPlayerInstance();
          }
          this.startPlayer();
        //}
      }
    },
    pause: function(pause) {
      console.log("watch pause", pause);
      if (pause) {
        this.playerInstance.pause();
      } else {
        this.playerInstance.play();
      }
    }
  },
  mounted() {
    console.log("mounted", this.track.id ? true: false)
    this.track.id ? this.SET_PAUSE(true) : {}
  },
  computed: {
    progress() {
      //console.log("progress()", this.seek, this.duration)
      if (this.duration === 0) return 0;
      return this.seek / this.duration * 100;
    },
    timerSeek() {
      return tracksHelper.formatTime(Math.round(this.seek));
    },
    timerDuration() {
      return tracksHelper.formatTime(Math.round(this.duration));
    },
    ...mapGetters([
      "track",
      "isFirst",
      "isLast",
      "volume",
      "pause",
      "playerActive",
      "repeat",
      "shuffle"
    ])
  },
  methods: {
    createPlayerInstance: function() {
      const file = this.track.file;
      const self = this;

      const player = new Howl({
        src: [file],
        html5: true,
        autoplay: false,
        preload: true
      });

      const volume = this.volume || 1;
      // console.log("volume111", this.volume, volume)
      player.volume(volume);

      //console.log(player)

      player.on("end", function(selected) {
        self.nowPlaying = false;
        console.log("on end", "repeat", self.repeat, "isLast", self.isLast);
        if (self.repeat || !self.isLast) {
          console.log("auto next");
          self.$store.dispatch("playlist/next");
          self.startPlayer();
        } else {
          self.seek = 0;
          self.playerInstance.seek(0);
          self.SET_PAUSE(true);
        }
      });

      player.on("load", function(cb) {
        self.duration = player.duration();
        console.log("on load", self.duration);
      });

      player.on("play", function() {
        self.nowPlaying = true;
        console.log("on play");
      });

      player.on("pause", function() {
        self.nowPlaying = false;
        console.log("on pause");
      });

      player.on("stop", function() {
        self.nowPlaying = false;
        console.log("on stop");
      });

      if (self.playerInstance) {
        console.log("createPlayer self.playerInstance exists");
        self.unloadPlayerInstance();
      }

      self.playerInstance = player;
    },
    prevClick: function() {
      this.$store.dispatch("playlist/prev");
    },
    nextClick: function() {
      this.$store.dispatch("playlist/next");
    },
    pauseClick: function(val) {
      if (val) this.SET_PAUSE(true);
      else this.SET_PAUSE(false);
    },
    skipTo: function(params) {
      const seekTo =
        params.offsetX /
        params.srcElement.parentElement.clientWidth *
        this.duration;
      console.log(
        "seekTo",
        seekTo,
        "playerInstance",
        this.playerInstance,
        "duration",
        this.duration
      );
      const seek = clamp(seekTo, 0, this.duration);
      this.playerInstance.seek(seek);
      this.seek = seek;
    },
    setPause: function() {
      this.SET_PAUSE(true);
      this.playerInstance.pause();
    },
    unsetPause: function() {
      this.SET_PAUSE(false);
      this.playerInstance.play();
    },
    unloadPlayerInstance: function() {
      console.log("player instance unload");
      this.nowPlaying = false;
      this.seek = 0;
      this.playerInstance.unload();
      this.playerInstance = null;
    },
    closePlayer: function() {
      // console.log( "close player","timerId",this.timerId,"player",this.playerInstance);
      clearInterval(this.timerId);
      this.unloadPlayerInstance();
      this.UNSET_PLAYER_ACTIVE();
      this.UNSET_PLAYLIST();
    },
    startPlayer: function() {
      this.createPlayerInstance();
      if (this.pause) {
        this.playerInstance.pause();
      } else {
        this.playerInstance.play();
      }
    },
    volumeUpDown: function(type) {
      if (type == "down") {
        var new_volume =
          (Math.round(this.playerInstance.volume() * 100) - 10) / 100;
      } else {
        var new_volume =
          (Math.round(this.playerInstance.volume() * 100) + 10) / 100;
      }
      if (new_volume > 1) new_volume = 1;
      if (new_volume < 0) new_volume = 0;
      console.log("volemeUpDown", new_volume);
      this.playerInstance.volume(new_volume);
      this.SET_VOLUME(new_volume);
    },
    ...mapMutations([
      "TOGGLE_REPEAT",
      "TOGGLE_SHUFFLE",
      "SET_VOLUME",
      "UNSET_PLAYLIST",
      "UNSET_PLAYER_ACTIVE",
      "SET_PAUSE"
    ])
  }
};
</script>


