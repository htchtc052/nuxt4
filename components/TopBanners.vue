<template>
  <div class="top-banner bg-light">
    <div class="d-flex">
           <div is="TopBannerItem" 
            v-for="(track, index) in tracks" 
            v-on:startFromList="startFromList"
            :key="index"
            :track="track"
            :currentIndex="index"
            :currentPlace="place"
            class="w-50 d-flex"
          ></div>
  


       
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import TopBannerItem from "~/components/TopBannerItem.vue";
//import tracksHelper from "~/plugins/tracksHelper";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("playlist");

export default {
  components: {
    TopBannerItem
  },
  props: {},
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
    return {
      place: "top_banner",
      tracks: [
        {
          id: 1431537,
          title: "Я тебя утоплю",
          genrename: "Эстрадная музыка",
          page_title: "Сергей Сухомлин",
          page_id: 178742,
          page_descr: "produсer / composer /arranger/singer/",
          page_country_id: "BY"
        },
        {
          id: 1412560,
          title: "Театр",
          genrename: "Бард-рок",
          page_title: 'AVERRUNK',
          page_id: 182593,
          page_descr: "Текст и музыка К. Николаев. Аранжировки К. Николаев, К. Кремнев. Барабаны Д. Афанасьев...",
          page_country_id: "RU"
        }
      ]
    };
  }
};
</script>

<style>
.top-banner {
  border-bottom: 1px solid #d6d6d6;
}
.top-banner .w-50 + .w-50 {
  border-left: 1px solid #eaeaea;
}
.top-banner__get-pro {
  color: #e6e3e3;
}
.top-banner__get-pro:hover {
  color: #ee8803;
}
</style>
