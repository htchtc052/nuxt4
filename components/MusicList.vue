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
//import playerHelper from "~/plugins/playerHelper";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters, mapActions } = createNamespacedHelpers(
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
    ...mapState(["repeat", "shuffle", "pause"]),
    ...mapGetters(["isNewPlaylist"])
  },
  methods: {
    handlePlayPause: function(index, nowActive) {
      console.log("handlePlayPause", "index", index, "nowActive", nowActive);
      
      if (nowActive) {
        
        if (this.pause) {
          this.$player.play();
          this.$store.commit("playlist/UNSET_PAUSE");
        } else {
          this.$player.pause();
          this.$store.commit("playlist/SET_PAUSE");
        }
      } else {
        const track = this.$props.tracks[index];

        this.setTrack(track);
        // ставим треки если новый плейлист
        if (this.isNewPlaylist(this.$props.place)) {
          const mapedTracks = tracksHelper.mapTracksPosition(
            this.$props.tracks
          );
          this.setTracks(mapedTracks);
        }
        this.setPosition(index);
        this.setPlace(this.$props.place);

        //console.log(222, this.$player)
        this.$createPlayer()
        //console.log(222, this.$player)
        this.$player.play()
        if (this.$store.getters["playlist/pause"]) {
          this.$store.commit("playlist/UNSET_PAUSE")
        }
        this.$store.commit("playlist/SET_PLAYER_ACTIVE")
      }
    },
    ...mapActions(["setTracks", "setTrack", "setPosition", "setPlace"])
  },
  data: function() {
    return {};
  },
  mounted: function() {
    //const directOrderTracks = tracksHelper.mapTracksPosition(this.$props.tracks);
  }
};
</script>