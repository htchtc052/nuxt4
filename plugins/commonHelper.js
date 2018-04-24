export default {
  setLocalStorageItem: (key, item) => {
    window.localStorage.setItem(key, JSON.stringify(item));
  },
  getLocalStorageItem: (key) => {
    let item = null
    if (localStorage.getItem(key)) {
        item = JSON.parse(
          window.localStorage.getItem(key)
        )
    }
    return item
  },
  removeLocalStorageItem: (key) => {
    if (localStorage.getItem(key)) {
       window.localStorage.removeItem(key);
    }
  }
}
