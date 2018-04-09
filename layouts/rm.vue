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
 
    <Player v-on:stop="handleStop"></Player>
    
    <Footer></Footer>

  </div>

</template>

<script>
import Logo from "~/components/Logo.vue";
import UserMenu from "~/components/UserMenu.vue";
import MainMenu from "~/components/MainMenu.vue";
import TopBanners from "~/components/TopBanners.vue";
import Footer from "~/components/Footer.vue";
import Player from "~/components/Player.vue";

export default {
  components: {
    Footer,
    Player,
    Logo,
    UserMenu,
    MainMenu,
    TopBanners
  },
  methods: {
    handleStop: function(callback) {
      console.log(1111, callback);
    }
  },
  mounted: function() {
    let restored_position, restored_tracks, restored_volume;

    if (localStorage.getItem("player.position")) {
      restored_position = JSON.parse(window.localStorage.getItem("player.position"));
      window.localStorage.removeItem("player.position");
    }

    if (localStorage.getItem("player.tracks")) {
      restored_tracks = JSON.parse(window.localStorage.getItem("player.tracks"));
      window.localStorage.removeItem("player.tracks");
    }

     if (localStorage.getItem("player.volume")) {
        restored_volume = JSON.parse( window.localStorage.getItem("player.volume"));
        window.localStorage.removeItem("player.volume");
     }

    if (restored_position && restored_tracks) {
      this.$store.dispatch("setTracks", restored_tracks);
      this.$store.dispatch("setPosition", restored_position);
      this.$store.dispatch("createPlayer");

      if (restored_volume) {
            this.$store.dispatch("setVolume", restored_volume);
      }
      this.$store.getters.player.pause();
    }

    console.log(
      "restored_player",
      restored_position,
      restored_tracks,
    );
  },
  data: function() {
    return {
      restored_player: null
    };
  }
};
</script>

<style>
/* здесь глобальные стили */

* {
  margin: 0;
  padding: 0;
}

.wrap {
  width: 980px;
  margin: 0 auto;
}
body {
  font: 14px/16px "Open Sans", Tahoma, Arial, Geneva, sans-serif;
  color: #4a4a4a;
  background: url("~assets/i/bg-blue-small.png") repeat-x 0 0 #b3dcf8 fixed;
}

a {
  color: #0054a6;
  outline: none !important;
  text-decoration: underline;
}
a:hover {
  text-decoration: none;
}

.font-weight-bold {
  font-weight: 600 !important;
}

.btn,
.nav-link.active {
  text-decoration: none;
}
.rm-head {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  background: url("~assets/i/blue1.png") repeat-x 8px 0 #fff;
}

.nav-pills .nav-link {
  padding: 0.15rem 0.35rem;
  border: 1px solid transparent;
  font-size: 13px;
  margin: 0 0.25rem;
}
.nav-pills .nav-link.active {
  background: transparent;
  color: #0054a6;
  text-decoration: none;
  border-color: #0054a6;
}

.nav-tabs .nav-link.active {
  color: #ee8803;
}
.nav-tabs .nav-link {
  border: 1px solid #dee2e6;
  background-color: #f1f1f1;
  color: #949494;
  text-decoration: none;
  padding: 0.5rem 0.75rem;
}
.nav-tabs .nav-item + .nav-item {
  margin-left: 3px;
}

strong {
  font-weight: 600;
}
.t-36 {
  font-size: 36px !important;
}
.t-24 {
  font-size: 24px !important;
}
.t-21 {
  font-size: 21px !important;
}
.t-20 {
  font-size: 20px !important;
}
.t-18 {
  font-size: 18px !important;
}
.t-16 {
  font-size: 16px !important;
}
.t-14 {
  font-size: 14px !important;
}
.t-13 {
  font-size: 13px !important;
}
.t-12 {
  font-size: 12px !important;
}
.t-11 {
  font-size: 11px !important;
}
.t-10 {
  font-size: 10px !important;
}

.pointer {
  cursor: pointer;
}

.text-nolink {
  text-decoration: none !important;
}
.text-link-o {
  color: #ee8803 !important;
}
.text-muted {
  color: #949494 !important;
}
a.text-muted:hover {
  color: #ee8803 !important;
}
a.text-muted:hover + .fas {
  color: #ee8803 !important;
}

.s-player {
  font-size: 14px;
}
.s-player__btn {
  border: 2px solid #ee8803;
  border-radius: 5px;
  text-align: center;
  width: 36px;
}

.bg-orange {
  background-color: #ee8803 !important;
}

.radio {
  font-size: 14px;
}
.radio__item {
  border: 2px solid #d6d6d6;
  display: inline-block;
  width: 80px;
  height: 80px;
}
.radio__item:hover {
  border-color: #ee8803;
}
.radio__item > img {
  width: 88px;
  filter: grayscale(100%);
  opacity: 0.5;
  margin: -7px;
}
.radio__item:hover > img {
  opacity: 1;
}

.tracklist > .border-bottom {
  border-bottom-style: dashed !important;
}

.text-format {
  white-space: pre-line;
  white-space: -moz-pre-line !important;
  white-space: -pre-line;
  word-wrap: break-word;
  word-break: break-word;
}
.text-break {
  -ms-word-break: break-all;
  word-break: break-word;
  word-wrap: break-word;
}

.btn-outline-primary:not(:disabled):not(.disabled):active,
.btn-outline-primary:not(:disabled):not(.disabled).active,
.show > .btn-outline-primary.dropdown-toggle {
  color: #fff;
  background-color: #0054a6;
  border-color: #0054a6;
}
.btn-outline-primary:hover {
  color: #fff;
  background-color: #0054a6;
  border-color: #0054a6;
}
.btn-outline-primary {
  color: #0054a6;
  background-color: transparent;
  background-image: none;
  border-color: #0054a6;
}

ul.genres {
  list-style: none;
  margin: 0;
  padding: 0;
}
ul.genres li {
  display: inline;
}
ul.genres li:after {
  content: ", ";
}
ul.genres li:last-child:after {
  content: "";
}
</style>
