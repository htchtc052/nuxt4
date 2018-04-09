<template>
    <div>
         <ul class="list-unstyled tracklist">
           <li is="TrackItem" v-for="(track, index) in tracks" 
            v-on:handlePlayPause="handlePlayPause"
            :key="index"
            :index="index"
            :track="track"
            :place="place"
          ></li>
        </ul>
    </div>
</template>
<script>
import TrackItem from "~/components/TrackItem.vue";

export default {
  components: {
    TrackItem
  },
  props: {
    tracks: {
      type: Array,
      default: function() {
        return {}
      }
    },
    place: {
        type: String,
    }
  },
  methods: {
      handlePlayPause: function(index, nowActive) {
        
        if (nowActive) {
            if (!this.$store.getters.player.playing) {
                this.$store.getters.player.play()
            } else {
                this.$store.getters.player.pause()
            }
        } else {

            this.$store.dispatch('setTracks', this.$props.tracks)
            this.$store.dispatch('setPosition',  {place: this.$props.place, index: index})
            
            if (this.$store.getters.isPlayer) {
                this.$store.dispatch('unsetPlayer')
            }

            this.$store.dispatch('createPlayer')
            this.$store.getters.player.play()
        }
      },
  },
  data: function() {
    return {};
  },
  mounted: function() {
//    console.log("props", this.$props.tracks, this.$props.place);
  }
};
</script>