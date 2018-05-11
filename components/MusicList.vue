<template>
    <div>
         <ul class="list-unstyled tracklist">
           <li is="TrackItem" v-for="(track, index) in tracks" 
            v-on:handlePlayPause="handlePlayPause"
            :key="index"
            :track="track"
            :currentPosition="index"
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
    ...mapGetters(["isNewPlaylist", "repeat", "shuffle", "pause"])
  },
  methods: {
    handlePlayPause: function(index, isCurrent) {
      console.log("handlePlayPause", "index", index, "isCurrent", isCurrent);
      if (isCurrent) {
        if (this.pause) {
          this.SET_PAUSE(false);
        } else {
          this.SET_PAUSE(true);
        }
      } else {
        // ставим треки если новый плейлист
        if (this.isNewPlaylist(this.$props.place)) {
          const mapedTracks = tracksHelper.mapTracksPosition(
            this.$props.tracks
          );
          this.SET_TRACKS(mapedTracks);
        }
        this.SET_POSITION(index);
        this.SET_PLACE(this.$props.place);

        if (this.pause) {
          this.SET_PAUSE(false);
        }

        const track = this.$props.tracks[index];
        this.SET_TRACK(track);
      }
    },
    ...mapMutations([
      "SET_PAUSE",
      "SET_PLACE",
      "SET_POSITION",
      "SET_TRACK",
      "SET_TRACKS",
      "SET_PLAYER_ACTIVE"
    ])
  },
  data: function() {
    return {};
  },
  mounted: function() {
    //const directOrderTracks = tracksHelper.mapTracksPosition(this.$props.tracks);
  }
};
</script>