<template>
<div>
   <div id="player" class="player"  v-if="this.player">

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
                        <a href="#" @click.prevent="toggleRepeat()" v-text=" repeat ? 'Repeat Yes' : 'Repeat No' "></a>
                    </span>
                    <span class="pointer p-2 t-18">
                          <a href="#" @click.prevent="toggleShuffle()" v-text=" shuffle ? 'Shuffle Yes' : 'Shuffle No' "></a>
                    </span>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters, mapActions } = createNamespacedHelpers(
  "playlist"
);

export default {
  computed: {
    ...mapGetters(["isFirst", "isLast"]),
    ...mapState(["player", "volume", "track", "repeat", "shuffle", "pause"])
  },
  methods: {
    prevClick: function() {
        this.unsetPlayer()
        this.prev()
        this.createPlayer()
        
        if (this.pause) {
            this.player.pause()
        } else {
            this.player.play()
        }
    }, 
    nextClick: function() {
        this.unsetPlayer()
        this.next()
        this.createPlayer()
         if (this.pause) {
            this.player.pause()
        } else {
            this.player.play()
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
        this.$store.dispatch('playlist/setPause')
        this.player.pause()
    },
    unsetPause: function() {
        this.$store.dispatch('playlist/unsetPause')
        this.player.play()
    },
    volumeUpDown: function(type) {
      if (new_volume > 1) new_volume = 1;
      if (new_volume < 0) new_volume = 0;

      if (type == "down") {
        var new_volume = (Math.round(this.player.volume * 100) - 10) / 100;
      } else {
        var new_volume = (Math.round(this.player.volume * 100) + 10) / 100;
      }

      this.setVolume(new_volume)
    },
    ...mapActions([
      "prev",
      "next",
      "unsetPlayer",
      "createPlayer",
      "closePlayer",
      "toggleRepeat",
      "toggleShuffle",
      //"setPause",
      //"unsetPause",
      "setVolume"
    ])
  },
  mounted: function() {
    //console.log("player", this.player);
  }
};
</script>


<style>
.player {
  background-color: rgba(256, 256, 256, 0.95);
  box-shadow: 0 0 5px 0 #b7b7b7;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 100;
}
.player__toogle {
  position: absolute;
  right: -10px;
  top: -37px;
  padding: 0.15rem 0.25rem 0.05rem;
  line-height: 12px;
  border-radius: 3px 3px 0 0;
  background-color: #ee8803;
  color: #fff;
}
.player .icons {
  opacity: 0.75;
}
.player .icons:hover {
  opacity: 1;
}
ee8803 .player__close {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 20px;
}
.player__volume {
  height: 5px;
  width: 50px;
}
.player__progress .progress {
  height: 6px;
}

@media (min-width: 1600px) {
  .player {
    width: 980px;
    left: calc(50% - 490px);
  }
  .player__toogle {
    right: -20px;
    top: -23px;
    border-radius: 0 3px 3px 0;
  }
}
</style>
