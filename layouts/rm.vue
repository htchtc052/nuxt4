<template>

  <div class="wrap">

    <header class="rm-head position-relative">
      <UserMenu></UserMenu>
      <MainMenu></MainMenu>
    </header>

    <TopBanners></TopBanners>
    <nuxt/>

    <no-ssr>
      <Player></Player>
    </no-ssr>
    <Footer></Footer>

  </div>

</template>

<script>
import Vue from "vue";
import UserMenu from "~/components/UserMenu.vue";
import MainMenu from "~/components/MainMenu.vue";
import TopBanners from "~/components/TopBanners.vue";
import Footer from "~/components/Footer.vue";
import Player from "~/components/Player.vue";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers(
  "playlist"
);

export default {
  data: function() {
    return {};
  },
  components: {
    Footer,
    Player,
    UserMenu,
    MainMenu,
    TopBanners
  },
  computed: {},
  mounted: function() {},
  methods: {}
};
</script>

<style lang="scss">
@import "~/assets/css/helper.scss";
@import "~/assets/css/old_global.css";
@import "~/assets/css/simple-line-icons.css";
@import "~/node_modules/font-awesome/css/font-awesome.css";
</style>
