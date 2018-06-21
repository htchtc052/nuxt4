<template>
    <div>
         <ul class="list-unstyled tracklist">
           <li class="d-flex border-bottom p-3" v-for="(track, index) in tracks" :key="index"> 
                <a href="#" class="track-play" @click.prevent="startFromList(index)">
                     <span :class="[ nowPlaying(index) ? 'fas fa-pause' : 'fas fa-play']"></span>
                     <img class="rounded" :src="'https://www.realmusic.ru/img.php?src=/media/bandimg/' + (track.page_id % 10) + '/' + track.page_id + '.jpg&w=60&h=60'" />
                </a>
                <!--  params: { id: track.page_id }} -->
                 <div class="pl-2 w-100">
                    <nuxt-link :to="{path: '/music'}" class="font-weight-bold">{{ track.title }}</nuxt-link>
                    <p class="font-italic pt-1 t-13">
                    <nuxt-link  :to="{path: '/music'}" class="text-nolink">{{ track.page_title }}</nuxt-link>
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
        </ul> 
    </div>
</template>
<script>
import Vue from "vue";
import tracksHelper from "~/plugins/tracksHelper";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers(
  "playlist"
);

export default {
  props: {
    tracks: {
      type: Array,
      default: function() {
        return {};
      }
    },
    place: {
      type: String
    }
  },
  computed: {},
  methods: {
    startFromList: function(index) {
      this.$store.dispatch("playlist/startFromList", {
        place: this.place,
        tracks: this.tracks,
        index: index
      });
    },
    nowPlaying: function(index) {
      return this.$store.getters["playlist/track"].position == index &&
        this.$store.getters["playlist/place"] == this.place &&
        !this.$store.getters["playlist/pause"]
        ? true
        : false;
    },
  },
  data: function() {
    return {};
  }
};
</script>