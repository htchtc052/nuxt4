import Vue from 'vue'
import VueHowler from 'vue-howler'
import store from '~/store'

const playerPlugin = (ctx, inject) => {

  this.$player = null

  if (process.browser) {
    const createPlayer = () => {
      if (Vue.prototype.$player) {
        console.log("player exists")
        Vue.prototype.$player.$destroy()
        Vue.prototype.$player = null
      }
     
      
      const playerCtor = Vue.extend({
        mixins: [
          VueHowler
        ],
      })

      const player = new playerCtor({
        propsData: {
          sources: [ctx.store.getters['playlist/track'].file],
          html5: true,
          autoplay: false,
          preload: false
        }
      })

      //var that = this
      player.$on('stop', function (selected) {
        //console.log("onstop", selected)
        if (!ctx.store.getters['playlist/repeat']) {
          console.log("not repeat on stop")
        }
        ctx.store.dispatch('playlist/next')
        createPlayer()
        this.$player.play()
      })

      if (Vue.prototype.$player) {
        Vue.prototype.$player.$destroy()
        Vue.prototype.$player = null
      }
      
      Vue.prototype.$player = player
      

    }

    if (!Vue.prototype.$player) {
      Object.defineProperties(Vue.prototype, {
        $player: {
          get: () => {
            return this.$player
          },
          set: (val) => {
              //console.log("555555", this.$player, val)
              this.$player = val 
          }
        }
      })

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

  }
}

export default playerPlugin
