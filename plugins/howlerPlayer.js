import Vue from 'vue'
//import VueHowler from 'vue-howler'
import {
  Howl,
  Howler
} from 'howler'
import store from '~/store'

const playerPlugin = (ctx, inject) => {

  this.$player = null

  if (process.browser) {

    const closePlayer = () => {
      console.log("player exists and close")
      Vue.prototype.$player.unload()
      Vue.prototype.$player = null
      console.log("on close")
    }

    const createPlayer = () => {


      const player = new Howl({
        src: [ctx.store.getters['playlist/track'].file],
        html5: true,
        autoplay: false,
        preload: false
      })

      const volume = ctx.store.getters['playlist/volume'] || 0
      console.log("volume111", volume)
      player.volume(volume)

      player.on('end', function (selected) {

        ctx.store.commit('playlist/SET_PLAYING', false)
        //closePlayer()
        console.log("on end")

        if (ctx.store.getters['playlist/repeat'] || !ctx.store.getters["playlist/isLast"]) {
          console.log("auto next")
          ctx.store.dispatch('playlist/next')
          createPlayer()
          Vue.prototype.$player.play()
        } else {
          Vue.prototype.$player.seek(0)
          ctx.store.commit('playlist/SET_PAUSE')
        } 

      })

      player.on('load', function () {
        ctx.store.commit('playlist/SET_DURATION', player.duration())
      })

      player.on('play', function () {
        ctx.store.commit('playlist/SET_PLAYING', true)
        console.log("on play")
      })

      player.on('pause', function () {
        // window.clearInterval(this.$playerTimer)
        ctx.store.commit('playlist/SET_PLAYING', false)
        console.log("on pause")
      })

      player.on('stop', function () {
        ctx.store.commit('playlist/SET_PLAYING', false)
        console.log("on stop")
      })

      if (Vue.prototype.$player) {
        closePlayer()
      }

      Vue.prototype.$player = player


    }

    if (!Vue.prototype.$createPlayer) {
      Object.defineProperties(Vue.prototype, {
        $createPlayer: {
          get: () => {
            return createPlayer
          },

        }
      })
    }



    if (!Vue.prototype.$closePlayer) {
      Object.defineProperties(Vue.prototype, {
        $closePlayer: {
          get: () => {
            return closePlayer
          },
        }
      })

    }

    if (!Vue.prototype.$player) {
      Object.defineProperties(Vue.prototype, {
        $player: {
          get: () => {
            return this.$player
          },
          set: (val) => {
            this.$player = val
          }
        }
      })

    }

  }
}

export default playerPlugin
