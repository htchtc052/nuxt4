<template>
  <div class="top-banner bg-light">
    <div class="d-flex">
           <div
            v-for="(track, index) in tracks" 
            :key="index"
            :track="track"
            class="w-50 d-flex">
           
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

                        <nuxt-link  :to="{path: '/music'}" class="font-weight-bold">{{ track.page_title }}</nuxt-link>
            
                        <div>
                        <span v-if="track.page_country_id" :class="'flagcountry_' + track.page_country_id" ></span>
                        </div>
                    </div>
                    <div class="font-italic mb-auto" v-text="track.page_descr"></div>
                    <div>
                        <div class="d-flex s-player align-items-center">
                        <a href="#" @click.prevent="startFromList(index)" class="d-inline-block text-link-o p-2 s-player__btn text-center">
                           <span :class="[ nowPlaying(index) ? 'fas fa-pause' : 'fas fa-play']"></span>
                          </a>
                        <div class="d-flex flex-column pl-2">
                                <nuxt-link  :to="{path: '/music'}" class="font-weight-bold">{{ track.title }}</nuxt-link>
            
                            <small class="text-muted t-11">{{ track.genrename}}</small>
                        </div>
                        </div>
                    </div>
                    </div>
            </div>
            </div>
      </div>    
  </div>
</template>

<script>
import Vue from "vue";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("playlist");

export default {
  props: {},
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
          page_title: "AVERRUNK",
          page_id: 182593,
          page_descr:
            "Текст и музыка К. Николаев. Аранжировки К. Николаев, К. Кремнев. Барабаны Д. Афанасьев...",
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
