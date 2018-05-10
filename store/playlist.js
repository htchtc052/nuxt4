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
  playerActive: false,
  repeat: false,
  shuffle: false,
  pause: false,
 // play: false,
  duration: 0,
  seek: 0,
})

const getters = {
  position: state => state.position,
  place: state => state.place,
  track: state => {
    if (!state.track.id) return {};
    const track = state.track
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
  pause: state => state.pause,
  playerActive: state => state.playerActive,
  volume: state => state.volume,
  repeat: state => state.repeat,
  shuffle: state => state.shuffle,
  duration: state => state.duration,
  seek: state => state.seek,
  //play: state => state.play,
}
const mutations =  {
  ['SET_VOLUME'](state, volume) {
    state.volume = volume
  },
  ['SET_PLAYER_ACTIVE'](state) {
    state.playerActive = true
  },
  ['UNSET_PLAYER_ACTIVE'](state) {
    state.playerActive = false
  },
 ['UNSET_PLAYLIST'](state) {
    state.position = 0
    state.place = null
    state.tracks = []
    state.track = {}
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
  ['TOGGLE_SHUFFLE'](state, getters) {
    state.shuffle = !state.shuffle
    if (state.shuffle) {
      let tracks = state.tracks
      tracks = _.shuffle(tracks)
      state.tracks = tracks
      //move current track to first position after shuffle
      const index = tracksHelper.getKeyByPositionForTrack(tracks, state.position)
      console.log("before moveTrackByIndex", "tracks.length", tracks.length, "position", state.position, "index", index)
      console.log("track before move", tracks[index].title);
      tracksHelper.moveTrackByIndex(tracks, index, 0)
      console.log("track before move", tracks[0].title);
      state.position = 0
    } else {
      state.position = state.track.position
    }
  },
  ['SET_PAUSE'](state) {
    state.pause = true
  },
  ['UNSET_PAUSE'](state) {
    state.pause = false
  },/* 
  ['SET_PLAY'] (state, play) {
    state.play = play 
  }, */
  ['SET_DURATION'](state, duration) {
    state.duration = duration
  },
  ['SET_SEEK'](state, seek) {
    state.seek = seek
  },
  ['SET_PLAYING'](state, playing) {
    state.playing = playing
  },
}
const actions = {
  prev({commit, state, getters}) {
    console.log("action prev")
    if (getters.isFirst) {
      if (!state.repeat) return;
        if (state.shuffle) {
          let tracks = state.tracks
          tracksHelper.moveTrackByIndex(tracks, tracks.length - 1, 0)
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
    console.log("action next")
    if (getters.isLast) {
      if (!state.repeat) return;
        if (state.shuffle) {
          let tracks = state.tracks
          tracksHelper.moveTrackByIndex(tracks, 0, tracks.length - 1)
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

}

export default
{
  namespaced: true,
  state:  state,
  actions: actions,
  getters: getters,
  mutations: mutations,
} 