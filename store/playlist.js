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
  repeat: false,
  shuffle: false,
  pause: false,
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
  volume: state => state.volume,
  repeat: state => state.repeat,
  shuffle: state => state.shuffle,
  duration: state => state.duration,
  seek: state => state.seek,
}
const mutations =  {
  ['SET_PAUSE'](state, value) {
    state.pause = value
  },
  ['TOOGLE_PAUSE'](state) {
    state.pause = !state.pause
  },
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
  ['TOGGLE_REPEAT'](state) {
      state.repeat = !state.repeat
  },
  ['TOGGLE_SHUFFLE'](state) {
    state.shuffle = !state.shuffle
    if (state.shuffle) {
      console.log("begin toogle shuffle")
      state.position = 0
      let tracks = state.tracks
      tracks = _.shuffle(tracks)
  

      //tracks = _.shuffle(tracks);
      const newIndex = tracksHelper.getKeyByPositionForTrack(
        tracks,
        state.track.position
      );
      tracksHelper.moveTrackByIndex(tracks, newIndex, 0);
      state.tracks = tracks
      
      console.log("setted tracks", state.tracks, "track", state.track.title);

    } else {
      state.position = state.track.position
    }
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
  startFromList({commit, state, getters }, { place, index, tracks}) {
    console.log("startFromList", "place", place, "index", index, "tracks", tracks);
    
    if (state.track.position == index && state.place == place) {
      commit('TOOGLE_PAUSE')
    } else {
      
      let position;

      let tracksList = tracksHelper.mapTracksPosition(tracks);

      let track = tracksList[index];

      console.log("click", track.title, track.position, state.shuffle);

      if (state.shuffle) {
        console.log("click and shuffle")
        position = 0;
        tracks = _.shuffle(tracks);
        const newIndex = tracksHelper.getKeyByPositionForTrack(
          tracks,
          track.position
        );
        tracksHelper.moveTrackByIndex(tracks, newIndex, 0);
      } else {
        position = index;
      }

      commit('SET_TRACKS', tracks);
      commit('SET_POSITION', position);

      if (state.pause) {
        commit('SET_PAUSE', false);
      }
      
      commit('SET_PLACE', place); 
      commit('SET_TRACK', track); 

      console.log("setted tracks", getters.tracksTitlesList, "track", track);
    }
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