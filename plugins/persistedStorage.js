import createPersistedState from 'vuex-persistedstate'

export default ({
  store
}) => {
  createPersistedState({
    key: 'vuex',
    reducer: (state, paths) => {
      return {
         playlist: {
          place: state.playlist.place,
          tracks: state.playlist.tracks,
          track: state.playlist.track,
          shuffle: state.playlist.shuffle,
          repeat: state.playlist.repeat,
          volume: state.playlist.volume,

        } 
      }
    },
  })(store)
}
