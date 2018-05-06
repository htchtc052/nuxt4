<template>
<div>
   <div id="player" class="player"  v-if="this.player ? true : false">
        <div @click="skipTo" class="player__progress position-relative">
            <div class="progress rounded-0 pointer">
                <div class="progress-bar bg-orange" role="progressbar" :style="'width: ' + (this.player.progress * 100) + '%'" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="d-flex justify-content-between px-1">
                <span class="t-10">{{ this.player.seek }}</span>
                <span class="t-10">{{ this.player.duration }}</span>
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
                          <span class="icons" v-bind:class="{ 'icon-control-pause': !pause, 'icon-control-play': pause }" @click="pause ? unsetPause() : setPause()"></span>
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
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters, mapActions, mapMutations } = createNamespacedHelpers(
  "playlist"
);

export default {
  data: () => {
    return {};
  },
  computed: {
    ...mapGetters(["isFirst", "isLast", "volume"]),
    ...mapState([
      "playerActive",
      "track",
      "repeat",
      "shuffle",
      "pause"
    ]),
    player() {
      return this.playerActive ? this.$player : null;
    }
  },
  methods: {
    prevClick: function() {
      this.$store.dispatch("playlist/prev");
      this.$createPlayer();
      this.restorePlayPause();
    },
    nextClick: function() {
      this.$store.dispatch("playlist/next");
      this.$createPlayer();
      this.restorePlayPause();
    },
    restorePlayPause: function() {
      if (this.$store.getters["playlist/pause"]) {
        this.$player.pause();
      } else {
        this.$player.play();
      }
    },
    skipTo: function(params) {
      this.player.setSeek(
        params.offsetX /
          params.srcElement.parentElement.clientWidth *
          this.player.duration
      );
    },
    setPause: function() {
      this.$store.commit("playlist/SET_PAUSE");
      this.player.pause();
    },
    unsetPause: function() {
      this.$store.commit("playlist/UNSET_PAUSE");
      this.player.play();
    },
    closePlayer: function() {
      this.$player.$destroy();
      this.$player = null;
      this.$store.commit("playlist/CLOSE_PLAYER");
    },
    volumeUpDown: function(type) {
      if (new_volume > 1) new_volume = 1;
      if (new_volume < 0) new_volume = 0;

      if (type == "down") {
        var new_volume = (Math.round(this.$player.volume * 100) - 10) / 100;
      } else {
        var new_volume = (Math.round(this.$player.volume * 100) + 10) / 100;
      }

      this.$player.setVolume(new_volume);
      this.$store.commit("playlist/SET_VOLUME", new_volume);
    },
    ...mapMutations(["TOGGLE_REPEAT", "TOGGLE_SHUFFLE"])
  },
  mounted: function() {
    
  }
};
</script>


