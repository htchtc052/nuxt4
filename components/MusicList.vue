<template>
    <div>
         <ul class="list-unstyled tracklist">
           <li is="TrackItem" v-for="(track, index) in tracks" 
            v-on:handlePlayPause="handlePlayPause"
            :key="index"
            :track="track"
            :currentIndex="index"
            :currentPlace="place"
          ></li>
        </ul>
    </div>
</template>
<script>
import Vue from "vue";
import TrackItem from "~/components/TrackItem.vue";
import tracksHelper from "~/plugins/tracksHelper";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers(
  "playlist"
);

export default {
  components: {
    TrackItem
  },
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
  computed: {
    ...mapGetters([
      // "tracksTitlesList"
    ])
  },
  methods: {
    handlePlayPause: function(index, isCurrent) {
      console.log(index, isCurrent)
      this.startFromList({place:this.place, index:index, tracks: this.tracks});
    },

    ...mapActions(["startFromList"])
  },
  data: function() {
    return {};
  },
  mounted: function() {
    // this.tracksList = tracksHelper.mapTracksPosition(this.$props.tracks);
  }
};
</script>