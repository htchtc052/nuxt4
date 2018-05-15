<template>
    <div>
         <ul class="list-unstyled tracklist">
           <li is="TrackItem" v-for="(track, index) in tracks" 
            v-on:startFromList="startFromList"
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
  computed: {},
  methods: {
    startFromList: function(index) {
      console.log("startFromList", index);
      this.storeStartFromList({
        place: this.place,
        tracks: this.tracks,
        index: index
      });
    },

    ...mapActions({ storeStartFromList: "startFromList" })
  },
  data: function() {
    return {};
  }
};
</script>