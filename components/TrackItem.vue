<template>
<li class="d-flex border-bottom p-3">
    <a href="#" class="track-play" @click.prevent="$emit('handlePlayPause', currentPosition, nowActive)">
        <!-- <span v-bind:class="{ 'fas fa-pause': this.$store.player.playing, 'icon-control-play': !this.$store.player.playing }"></span>
        -->
            <span class="fas fa-play" v-if="!nowPlaying"></span>
            <span class="fas fa-pause" v-if="nowPlaying"></span>
        
            <img class="rounded" :src="'https://www.realmusic.ru/img.php?src=/media/bandimg/' + (track.page_id % 10) + '/' + track.page_id + '.jpg&w=60&h=60'" />
        </a>
    <div class="pl-2 w-100">
        <nuxt-link :to="{ name: 'pages-id', params: { id: track.page_id }}" class="font-weight-bold">{{ track.title }}</nuxt-link>
        <p class="font-italic pt-1 t-13">
        <nuxt-link :to="{ name: 'pages-id', params: { id: track.page_id }}" class="text-nolink">{{ track.page_title }}</nuxt-link>
        </p>
    </div>
    <span class="text-right pl-3 pt-1 text-nowrap">
        <a href="#" class="p-2 text-nolink t-20 text-muted">
        <span class="icon-arrow-down-circle icons"></span>
        </a>
        <a href="#" class="p-2 text-nolink t-18 text-muted">
        <span class="icon-share icons"></span>
        </a>
    </span>
</li>
</template>

<script>

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, mapActions } = createNamespacedHelpers('playlist')

export default {
  props: {
    track: {
      type: Object,
      required: true,
    },
    currentPlace: {
        type: String,
        required: true,
    }, 
    currentPosition: {
        type: Number,
        required: true,
    }
  },
  computed: {
     ...mapState([
       'player',
       'position',
       'place',
      
    ]),
    nowPlaying() {
        return (this.nowActive && this.player) ? true : false
    },
    nowActive() {
        return (this.position == this.currentPosition && this.place == this.currentPlace) ? true : false
    }
  },
  mounted: function() {
      //console.log("nowPlaying",  this.nowPlaying, "nowActive", this.nowActive)
  }
}
</script>


<style>
.track-play {position: relative}
.track-play .fas {position: absolute; color: #fff;background-color: #ee8803;border-radius: 100%;width: 28px;height: 28px;text-align: center;top:calc(50% - 14px);
left:calc(50% - 14px); line-height: 28px;font-size: 12px;visibility: hidden;}
.track-play:hover .fas {visibility: visible;}
</style>
