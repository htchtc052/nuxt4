import Vue from 'vue'
import Vuex from 'vuex'
import VueHowler from 'vue-howler'
import tracksHelper from "~/plugins/tracksHelper"

const state = () => ({
  volume: 1,
  position: 0,
  place: null,
  tracks: [],
  track: {},
  player: null,
  repeat: false,
  shuffle: false,
  pause: false,
})

const getters = {
  position: state => state.position,
  place: state => state.place,
  track: state => {
    if (!state.track.id) return {};
    let track = {}
    track.file = tracksHelper.getFile(state.track)
    track.bandimg = tracksHelper.getBandImage(state.track)
    return track;
  },
  tracksTitlesList: state => (state.tracks.length) ? tracksHelper.mapOnlyTracksTitles(state.tracks) : [],
  tracksSize: state => state.tracks ? state.tracks.length : 0, 
  isFirst: state => (state.position === 0) ? true : false,
  isLast: state => (state.position >= state.tracks.length - 1) ? true : false,
  isNewPlaylist:  state => (place) => {
    return !(place == state.place && state.tracks.length)
  },
  //pause: state => state.pause,
  player: state => state.player,
}
const mutations =  {
  ['SET_VOLUME'](state, volume) {
    state.player.setVolume(volume)
    state.volume = volume
  },
  ['SET_PLAYER'](state, player) {
    state.player = player
  },
  ['SET_TRACKS'](state, tracks) {
    state.tracks = tracks
  },
  ['SET_TRACK'](state, track) {
    state.track = track
  },
  ['SET_POSITION'](state, position) {
    state.position = position
  },
  ['SET_PLACE'](state, place) {
    state.place = place
  },
  ['UNSET_PLAYER'](state) {
    state.player.$destroy();
    state.player = null
  },
  ['TOGGLE_REPEAT'](state) {
      state.repeat = !state.repeat
  },
  ['TOGGLE_SHUFFLE'](state) {
    state.shuffle = !state.shuffle
    if (state.shuffle) {
      let tracks = state.tracks
      tracks = _.shuffle(tracks)
      state.tracks = tracks
      const currentTrackIndex = tracksHelper.getKeyByPositionForTrack(tracks, state.position)
      // console.log("currentTrackIndex after shuffle", currentTrackIndex)
      tracksHelper.moveTrackByIndex(tracks, currentTrackIndex, 0)
      state.position = 0

    } else {
      state.position = state.track.position
    }

  },
  ['SET_PAUSE'](state) {
    state.pause = true
     // this.state.player.pause()
  },
  ['UNSET_PAUSE'](state) {
    state.pause = false
    //this.state.player.play()
  },
  ['CLOSE_PLAYER'](state) {
    state.player.$destroy()
    state.player = null
    state.position = 0
    state.place = null
    state.tracks = []
    state.track = {}

  }
}
const actions = {
  setVolume({commit}, volume) {
    commit('SET_VOLUME', volume)
  },
  prev({commit, state, getters}) {
    if (getters.isFirst) {
      if (!state.repeat) return;
        if (state.shuffle) {
          let tracks = state.tracks
          tracksHelper.moveTrackByIndex(tracks, tracks.size - 1, 0)
          commit('SET_TRACKS', tracks)
          const track = state.tracks[state.position]
          commit('SET_TRACK', track)
            //console.log("@@@@ prev isFirst shuffle && repeat tracks", state.tracks, "track", state.track.title, "position", state.position)
        } else {    
          const  position = state.tracks.length - 1
          const track = tracksHelper.getTrackByKey(state.tracks, position)
          commit('SET_POSITION', position)
          commit('SET_TRACK', track)
          //console.log("@@@@ prev isFirst repeat tracks", tracks, "track", track.title, "position", position)
        }
      } else {
      const position = state.position - 1
      let track
      if (state.shuffle) {
        track = state.tracks[position]
        commit('SET_POSITION', position)
        commit('SET_TRACK', track)
        //console.log("@@@@ prev shuffle tracks", state.tracks, "track", state.track.title, "position", state.position)
      } else {
        track = tracksHelper.getTrackByKey(state.tracks, position)
        commit('SET_POSITION', position)
        commit('SET_TRACK', track)
        //console.log("@@@@ prev  tracks", state.tracks, "track", state.track.title, "position", state.position)
      }
    }
    
  },
  next({commit, state, getters }) {
    if (getters.isLast) {
      if (!state.repeat) return;
        if (state.shuffle) {
          let tracks = state.tracks
          tracksHelper.moveTrackByIndex(tracks, 0, tracks.size - 1)
          commit('SET_TRACKS', tracks)
          const track = state.tracks[state.position]
          commit('SET_TRACK', track)
            //console.log("@@@@ next isLast shuffle && repeat tracks", state.tracks, "track", state.track.title, "position", state.position)
        } else {    
          const  position = 0
          const track = tracksHelper.getTrackByKey(state.tracks, position)
          commit('SET_POSITION', position)
          commit('SET_TRACK', track)
          //console.log("@@@@ next isLast repeat tracks", tracks, "track", track.title, "position", position)
        }
      } else {
      const position = state.position + 1
      let track
      if (state.shuffle) {
        track = state.tracks[position]
        commit('SET_POSITION', position)
        commit('SET_TRACK', track)
        //console.log("@@@@ next shuffle tracks", state.tracks, "track", state.track.title, "position", state.position)
      } else {
        track = tracksHelper.getTrackByKey(state.tracks, position)
        commit('SET_POSITION', position)
        commit('SET_TRACK', track)
        //console.log("@@@@ next  tracks", state.tracks, "track", state.track.title, "position", state.position)
      }
    }
  },
  createPlayer({commit, state, dispatch, getters}) {
    const playerCtor = Vue.extend({
      mixins: [
        VueHowler
      ],
    });
    const player = new playerCtor({
      propsData: {
        sources: [getters.track.file],
        html5: true,
        autoplay: false,
        preload: false
      }
    })
    player.setVolume(state.volume)
    player.$on('stop', function (selected) {
      if (!state.repeat) return;
      dispatch('unsetPlayer')
      dispatch('next')
      dispatch('createPlayer')
      state.player.play()
    });
    
    commit('SET_PLAYER', player)
  },
  setTracks({ commit }, tracks) {
    commit('SET_TRACKS', tracks)
  },
  setTrack({ commit }, track) {
    commit('SET_TRACK', track)
  },
  setPosition({ commit }, position) {
    commit('SET_POSITION', position)
  },
  setPlace({ commit }, place) {
    commit('SET_PLACE', place)
  },
  unsetPlayer({commit}) {
    commit('UNSET_PLAYER')
  },
  closePlayer({commit}) {
    commit('CLOSE_PLAYER')
  },
  toggleRepeat({commit}) {
    commit('TOGGLE_REPEAT')
  },
  toggleShuffle({commit}) {
    commit('TOGGLE_SHUFFLE')
  }, setPause({commit}) {
    commit('SET_PAUSE')
  }, unsetPause({commit}) {
    commit('UNSET_PAUSE')
  }
}

export default
{
  namespaced: true,
  state:  state,
  actions: actions,
  getters: getters,
  mutations: mutations,
} 