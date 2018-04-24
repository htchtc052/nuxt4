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
          <h1 class="test1">111</h1>
        </ul>
    </div>
</template>
<script>
import TrackItem from "~/components/TrackItem.vue";
import tracksHelper from "~/plugins/tracksHelper";
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
    ...mapState(["player", "repeat", "shuffle"]),
    ...mapGetters(["isNewPlaylist"])
  },
  methods: {
    handlePlayPause: function(index, nowActive) {
      console.log("handlePlayPause", "shuffle", this.shuffle);
      if (nowActive) {
        if (!this.player.playing) {
          this.player.play();
        } else {
          this.player.pause();
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
        if (this.player) {
          this.unsetPlayer();
        }
        this.createPlayer();
        this.player.play();
      }
    },
    ...mapActions([
      "setTracks",
      "setTrack",
      "setPosition",
      "setPlace",
      "unsetPlayer",
      "createPlayer"
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