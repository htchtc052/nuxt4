export default {
  mapTracksPosition: (tracks) => {
    return _.toArray(_.mapValues(tracks, function (item, key) {
      item.position = _.parseInt(key)
      return item
    }))
  },
  getKeyByPositionForTrack: (tracks, position) => {
    return _.parseInt(_.findKey(tracks, function (obj) {
      return obj.position == position;
    }))
  },
  getTrackByKey: (tracks, position) => {
    return _.find(tracks, function (obj) {
      return obj.position == position;
    })
  },
  moveTrackByIndex: (tracks, fromIndex, toIndex) => {
    tracks.splice(toIndex, 0, tracks.splice(fromIndex, 1)[0]);
    console.log("trackMoveToIndex",  "tracks.length", tracks.length, "fromIndex", fromIndex, "toIndex", toIndex)
  },
  mapOnlyTracksTitles: (tracks) => {
    return _.toArray(_.mapValues(tracks, function (item, key) {
      return item.title
    }))
  },
  getFile: (track) => {
    return track ? 'http://files.realmusic.ru/lofi/' + track.id + '/' + track.id + '.mp3' : null
  },
  getBandImage: (track) => {
    return track ? "https://www.realmusic.ru/img.php?src=/media/bandimg/" +
      track.page_id % 10 +
      "/" +
      track.page_id +
      ".jpg&w=36&h=36" : null
  },
  formatTime: (secs) => {
    var minutes = Math.floor(secs / 60) || 0;
    var seconds = (secs - minutes * 60) || 0;

    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

}
