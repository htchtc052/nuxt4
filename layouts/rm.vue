<template>

  <div class="wrap">

    <header class="rm-head position-relative">
      <div class="d-flex p-3 justify-content-between align-items-center">
        <Logo></Logo>
        <UserMenu></UserMenu>
      </div>
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
import Logo from "~/components/Logo.vue";
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
    Logo,
    UserMenu,
    MainMenu,
    TopBanners
  },
  computed: {
  },
  mounted: function() {
   
  },
  methods: {
  }
};
</script>

<style lang="scss">
@import "~/node_modules/vuejs-noty/dist/vuejs-noty.css";
@import "~/assets/css/old_global.css";
@import "~/assets/css/simple-line-icons.css";
</style>
