<template>
<div>
     <a href="#"  class="py-3 pl-3 m-1">
        <img class="rounded"
        :src="'https://www.realmusic.ru/img.php?src=/media/bandimg/' + (track.page_id % 10) + '/' + track.page_id + '.jpg&w=136&h=136'">
    </a>

     <div class="py-3 m-1 w-100 pl-1 pr-3">
            <div class="d-flex align-items-start flex-column h-100">
            <div class="mb-auto w-100">
                <a href="#" class="float-right top-banner__get-pro">
                <span class="fas fa-question-circle"></span>
                </a>

                <nuxt-link :to="{ name: 'pages-id', params: { id: track.page_id }}" class="font-weight-bold">{{ track.page_title }}</nuxt-link>
     
                <div>
                <span v-if="track.page_country_id" :class="'flagcountry_' + track.page_country_id" ></span>
                </div>
            </div>
            <div class="font-italic mb-auto" v-text="track.page_descr"></div>
            <div>
                <div class="d-flex s-player align-items-center">
                <a href="#" @click.prevent="$emit('startFromList', currentIndex)" class="d-inline-block text-link-o p-2 s-player__btn text-center">
                    <span :class="{'fas fa-play' : !nowPlaying, 'fas fa-pause' : nowPlaying}"></span>
                </a>
                <div class="d-flex flex-column pl-2">
                        <nuxt-link :to="{ name: 'pages-id', params: { id: track.page_id }}" class="font-weight-bold">{{ track.title }}</nuxt-link>
     
                    <small class="text-muted t-11">{{ track.genrename}}</small>
                </div>
                </div>
            </div>
            </div>
     </div>
</div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("playlist");

export default {
  props: {
    track: {
      type: Object,
      required: true
    },
    currentPlace: {
      type: String,
      required: true
    },
    currentIndex: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapGetters(["place", "pause"]),
    playingTrack() {
        return this.$store.getters["playlist/track"] 
    },
    nowPlaying() {
      return this.playingTrack.position == this.currentIndex && this.place == this.currentPlace && !this.pause ? true : false;
    },
  },
};
</script>
