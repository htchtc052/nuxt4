import Vue from 'vue'
import Vuex from 'vuex'
import tracksHelper from "~/plugins/tracksHelper"

const state = () => ({
  volume: 1,
  place: null,
  tracks: [],
  track: {},
  repeat: false,
  shuffle: false,
  pause: false,
})

const getters = {
  place: state => state.place,
  track: state => {
    if (!state.track.id) return {};
    const track = state.track
    track.file = tracksHelper.getFile(state.track)
    track.bandimg = tracksHelper.getBandImage(state.track)
    return track;
  },
  tracksTitlesList: state => (state.tracks.length) ? tracksHelper.mapOnlyTracksTitles(state.tracks) : [],
  trackCurrentTitle: state => (state.track) ? state.track.title : null,
  tracksSize: state => state.tracks ? state.tracks.length : 0,
  isFirst: state => {
    if (!state.shuffle) {
      if (state.track.position == 0) return true
    } else {
      if (tracksHelper.getKeyByPositionForTrack(state.tracks, state.track.position) == 0) return true
    }
    return false
  },
  isLast: state => {
    if (!state.shuffle) {
      if (state.track.position >= (state.tracks.length -1)) return true
    } else {
      if (tracksHelper.getKeyByPositionForTrack(state.tracks, state.track.position) >= (state.tracks.length -1)) return true
    }
    return false
  },
  // isNewPlaylist: state => (place) => {
  //   return !(place == state.place && state.tracks.length)
  // },
  pause: state => state.pause,
  volume: state => state.volume,
  repeat: state => state.repeat,
  shuffle: state => state.shuffle,
}
const mutations = {
  ['SET_PAUSE'](state, value) {
    state.pause = value
  },
  ['TOOGLE_PAUSE'](state) {
    state.pause = !state.pause
  },
  ['SET_VOLUME'](state, volume) {
    state.volume = volume
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
  ['SET_PLACE'](state, place) {
    state.place = place
  },
  ['TOGGLE_REPEAT'](state) {
    state.repeat = !state.repeat
  },
  ['TOGGLE_SHUFFLE'](state) {
    state.shuffle = !state.shuffle
    if (state.shuffle) {
      let tracks = state.tracks
      tracks = _.shuffle(tracks)

      if (!state.repeat) {
        // что бы текущий трек всегда оказался в начале перемешенного списка и было куда далее играть
        const newIndex = tracksHelper.getKeyByPositionForTrack(
          tracks,
          state.track.position
        );
        tracksHelper.moveTrackByIndex(tracks, newIndex, 0);
      }
      state.tracks = tracks
    }
  },
}
const actions = {
  prev({
    commit,
    state,
    getters
  }) {
    let track
    if (getters.isFirst) {
      if (!state.repeat) return;
      if (state.shuffle) {
        track = state.tracks[state.tracks.length - 1]
      } else {
        track = tracksHelper.getTrackByKey(state.tracks, state.tracks.length - 1)
      }
    } else {
      if (state.shuffle) {
        const newIndex = tracksHelper.getKeyByPositionForTrack(state.tracks, state.track.position) - 1
        track = state.tracks[newIndex]
      } else {
        track = tracksHelper.getTrackByKey(state.tracks, state.track.position - 1)
      }
    }
    commit('SET_TRACK', track)
  },
  next({
    commit,
    state,
    getters
  }) {
    let track
    if (getters.isLast) {
      if (!state.repeat) return;
      if (state.shuffle) {
        track = state.tracks[0]
        commit('SET_TRACK', track)
      } else {
        track = tracksHelper.getTrackByKey(state.tracks, 0)
      }
    } else {
      if (state.shuffle) {
        const newIndex = tracksHelper.getKeyByPositionForTrack(state.tracks, state.track.position) + 1
        track = state.tracks[newIndex]
      } else {
        track = tracksHelper.getTrackByKey(state.tracks, state.track.position + 1)
      }
    }
    commit('SET_TRACK', track)
  },
  startFromList({
    commit,
    state,
    getters
  }, {
    place,
    index,
    tracks
  }) {
    //console.log("startFromList", "place", place, "index", index, "tracks", tracks);

    if (state.track.position == index && state.place == place) {
      commit('TOOGLE_PAUSE')
    } else {
      let tracksList = tracksHelper.mapTracksPosition(tracks);

      let track = tracksList[index];

      //console.log("click", track.title, track.position, state.shuffle);

      tracks = _.shuffle(tracks);

      if (state.shuffle && !state.repeat) {
        // что бы текущий трек всегда оказался в начале перемешенного списка и было куда далее играть
        const newIndex = tracksHelper.getKeyByPositionForTrack(
          tracks,
          track.position
        );
        tracksHelper.moveTrackByIndex(tracks, newIndex, 0);
      }

      commit('SET_TRACKS', tracks);

      if (state.pause) {
        commit('SET_PAUSE', false);
      }

      commit('SET_PLACE', place);
      commit('SET_TRACK', track);
    }
  }

}

export default {
  namespaced: true,
  state: state,
  actions: actions,
  getters: getters,
  mutations: mutations,
}
