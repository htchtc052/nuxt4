import Vue from 'vue'
import Vuex from 'vuex'
import VueHowler from 'vue-howler';


export const SET_VOLUME = 'SET_VOLUME';
export const PREV = 'PREV';
export const NEXT = 'NEXT';
export const SET_TRACKS = 'SET_TRACKS';
export const SET_POSITION = 'SET_POSITION';
export const SET_PAUSE = 'SET_PAUSE';
export const UNSET_PAUSE = 'UNSET_PAUSE';
export const SET_PLAYER = 'SET_PLAYER';
export const UNSET_PLAYER = 'UNSET_PLAYER';
export const CLOSE_PLAYER = 'CLOSE_PLAYER';

function getFileByTrack(track) {
  if (!track) return null;
  return 'http://files.realmusic.ru/lofi/' + track.id + '/' + track.id + '.mp3';
}


const createStore = () => {
  return new Vuex.Store({
    state: {
      volume: 1,
      position: {},
      tracks: [],
      player: null,
    },
    getters: {
      volume: state => state.volume,
      track: state => {
        return [state.tracks[state.position.index]];
      },
      file: state => {
        return state.tracks[state.position.index] ? getFileByTrack(state.tracks[state.position.index]) : null
      },
      position: state => state.position,
      tracks: state => state.tracks,
      player: state => {
        return state.player
      },
      isPlayer: state => {
        return !!state.player
      }

    },
    mutations: {
      [SET_VOLUME](state, volume) {
        state.player.setVolume(volume);
        state.volume = volume
        window.localStorage.setItem('player.volume', JSON.stringify(volume));

      },
      [PREV](state) {
        state.position.index = Math.max(0, state.position.index - 1);
        window.localStorage.setItem('player.position', JSON.stringify({
          place: state.position.place,
          index: state.position.index
        }));
      },
      [NEXT](state) {
        state.position.index = Math.min(state.tracks.length - 1, state.position.index + 1);
        window.localStorage.setItem('player.position', JSON.stringify({
          place: state.position.place,
          index: state.position.index
        }));
      },
      [SET_PLAYER](state, player) {
        state.player = player
      },
      [SET_TRACKS](state, payload) {
        state.tracks = payload
        window.localStorage.setItem('player.tracks', JSON.stringify(payload));
      },
      [SET_POSITION](state, payload) {
        state.position = payload
        window.localStorage.setItem('player.position', JSON.stringify(payload));
      },
      [UNSET_PLAYER](state) {
        state.player.$destroy();
        state.player = null

      },
      [CLOSE_PLAYER](state) {
        state.player.$destroy()
        state.player = null
        state.position = {}
        state.tracks = []
      }
    },
    actions: {
      setVolume(context, volume) {
        context.commit(SET_VOLUME, volume)
      },
      prev(context) {
        context.dispatch('unsetPlayer')
        context.commit(PREV)
        context.dispatch('createPlayer')
        context.getters.player.play()
      },
      next(context) {
        context.dispatch('unsetPlayer')
        context.commit(NEXT)
        context.dispatch('createPlayer')
        context.getters.player.play()
      },
      createPlayer(context) {
        const playerCtor = Vue.extend({
          mixins: [
            VueHowler
          ],
        });

        const player = new playerCtor({
          propsData: {
            sources: [context.getters.file],
            html5: true,
            autoplay: false,
            preload: false
          }
        })

        player.setVolume(context.getters.volume)

        player.$on('stop', function (selected) {
          console.log("stop", selected)
          context.dispatch('next')
        });

        context.commit(SET_PLAYER, player);
      },
      setTracks(context, tracks) {
        console.log("tracks", tracks);
        context.commit(SET_TRACKS, tracks);
      },
      setPosition(context, payload) {
        console.log("payload", payload)
        context.commit(SET_POSITION, payload)
      },
      unsetPlayer(context) {
        context.commit(UNSET_PLAYER)
      },
      closePlayer(context) {
        context.commit(CLOSE_PLAYER)
        window.localStorage.removeItem('player');
      }
    }
  })
}

export default createStore
