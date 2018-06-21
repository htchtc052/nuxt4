import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const social = () =>
  import ('~/pages/social/_token.vue').then(m => m.default || m)

const index = () =>
  import ('~/pages/index.vue').then(m => m.default || m)
const music = () =>
  import ('~/pages/music.vue').then(m => m.default || m)
const lyrics = () =>
  import ('~/pages/lyrics.vue').then(m => m.default || m)


const login = () =>
  import ('~/pages/login.vue').then(m => m.default || m)
const register = () =>
  import ('~/pages/register.vue').then(m => m.default || m)
const passwordSend = () =>
  import ('~/pages/password/send.vue').then(m => m.default || m)
const passwordSet = () =>
  import ('~/pages/password/set/_token.vue').then(m => m.default || m)
const activateSend = () =>
  import ('~/pages/activate/send.vue').then(m => m.default || m)
const activateSet = () =>
  import ('~/pages/activate/set/_token.vue').then(m => m.default || m)


const profile = () =>
  import ('~/pages/profile/index.vue').then(m => m.default || m)
const profilePassword = () =>
  import ('~/pages/profile/password.vue').then(m => m.default || m)
// const profileEmail = () =>
//   import ('~/pages/_lang/profile/email.vue').then(m => m.default || m)
const profileInfo = () =>
  import ('~/pages/profile/info.vue').then(m => m.default || m)

const error404 = () =>
  import ('~/components/error404.vue').then(m => m.default || m)


const routes = [{
    path: "/social/:token",
    component: social,
    name: "social",
  }, {
    path: "/music",
    component: music,
    name: "music"
  }, {
    path: "/:lang/music",
    component: music,
    name: "lang-music"
  }, {
    path: "/lyrics",
    component: lyrics,
    name: "lyrics"
  }, {
    path: "/:lang/lyrics",
    component: music,
    name: "lang-lyrics"
  }, {
    path: "/login",
    component: login,
    name: "login"
  }, {
    path: "/:lang/login",
    component: login,
    name: "lang-login"
  }, {
    path: "/register",
    component: register,
    name: "register"
  }, {
    path: "/:lang/register",
    component: register,
    name: "lang-register"
  }, {
    path: "/password/send",
    component: passwordSend,
    name: "password-send"
  }, {
    path: "/:lang/password/send",
    component: passwordSend,
    name: "lang-password-send"
  }, {
    path: "/password/set/:token",
    component: passwordSet,
    name: "password-set"
  }, {
    path: "/:lang/password/set/:token",
    component: passwordSet,
    name: "lang-password-set"
  }, {
    path: "/activate/send",
    component: activateSend,
    name: "activate-send"
  }, {
    path: "/:lang/activate/send",
    component: activateSend,
    name: "lang-activate-send"
  }, {
    path: "/activate/set/:token",
    component: activateSet,
    name: "activate-set"
  }, {
    path: "/:lang/activate/set/:token",
    component: activateSet,
    name: "lang-activate-set"
  }, {
    path: "/profile",
    component: profile,
    name: "profile"
  }, {
    path: "/:lang/profile",
    component: profile,
    name: "lang-profile"
  }, {
    path: "/profile/info",
    component: profileInfo,
    name: "profile-info"
  }, {
    path: "/:lang/profile/info",
    component: profileInfo,
    name: "lang-profile-info"
  }, {
    path: "/profile/password",
    component: profilePassword,
    name: "profile-password"
  }, {
    path: "/:lang/profile/password",
    component: profilePassword,
    name: "lang-profile-password"
  }, {
    path: "/:lang",
    component: index,
    name: "lang-index"
  }, {
    path: "/",
    component: index,
    name: "index",
  },
  {
    path: "/:lang/*",
    component: error404,
    name: "lang-error404",
  },  
  {
    path: "*",
    component: error404,
    name: "error404",
  },   

]

export function createRouter() {
  return new Router({
    routes,
    mode: 'history'
  })
}
